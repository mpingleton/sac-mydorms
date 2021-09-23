import { rest } from 'msw';
import { nanoid } from 'nanoid';

import { API_URL } from '@/config';

import { db, persistDb } from '../db';
import {
  authenticate, delayedResponse, hash, requireAuth,
} from '../utils';

const existingUser = db.user.findFirst({
  where: {
    email: {
      equals: 'nick@rubyshore.com',
    },
  },
});

if (!existingUser) {
  db.user.create({
    id: nanoid(),
    createdAt: Date.now(),
    role: 'ADMIN',
    firstName: 'Nicholas',
    lastName: 'Phillips',
    email: 'nick@rubyshore.com',
    password: hash('test1234'),
  });
  persistDb('user');
}

export const authHandlers = [
  rest.post(`${API_URL}/auth/login`, (req, res, ctx) => {
    try {
      const credentials = req.body;
      const result = authenticate(credentials);
      return delayedResponse(ctx.json(result));
    } catch (error) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' }),
      );
    }
  }),

  rest.get(`${API_URL}/auth/me`, (req, res, ctx) => {
    try {
      const user = requireAuth(req);

      return delayedResponse(ctx.json(user));
    } catch (error) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' }),
      );
    }
  }),
];

export default authHandlers;
