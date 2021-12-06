const bcrypt = require('bcrypt');

/**
 * Hash a users password with the salt from the env.
 * Wrapped in a Promise in order to use async functionality (await).
 * @param {ObjectId} email
 * @returns {Promise}
 */
const hashPassword = async (password) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hashedPassword;
};

module.exports = hashPassword;
