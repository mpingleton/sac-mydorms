const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const path = require('path');
const xss = require('xss-clean');

const { authLimiter } = require('@/middlewares/rateLimiter');
const { errorConverter, errorHandler } = require('@/middlewares/error');
const { jwtStrategy } = require('@/config/passport');
const config = require('@/config/config');
const morgan = require('@/config/morgan');
const routes = require('@/routes/v1');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        // eslint-disable-next-line quotes
        "script-src": ["'self'", "'unsafe-inline'"],
      },
    },
  }),
);

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/api/auth', authLimiter);
}

// Backend (i.e. API)
app.use('/api/', routes);

// Frontend (i.e. React)
app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'build')));
app.get('(/*)?', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'frontend', 'build', 'index.html'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
