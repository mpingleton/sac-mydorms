import * as faker from 'faker';

export const userGenerator = (overrides) => ({
  id: faker.datatype.uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: 'ADMIN',
  createdAt: Date.now(),
  ...overrides,
});

export default userGenerator;
