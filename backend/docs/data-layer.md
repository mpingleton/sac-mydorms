# 💽 Data Layer

### Prisma (ORM)

- Prisma Concepts:
  - https://www.prisma.io/docs/concepts
- Prisma Schema (schema.prisma):
  - https://www.prisma.io/docs/concepts/components/prisma-schema
- Prisma Database Migrations:
  - https://www.prisma.io/docs/concepts/components/prisma-migrate#production-and-testing-environments
- Is Prisma an ORM?
  - https://www.prisma.io/docs/concepts/overview/prisma-in-your-stack/is-prisma-an-orm
- Prisma REST Implementation:
  - https://www.prisma.io/docs/concepts/overview/prisma-in-your-stack/rest/
- Prisma/Express.js Example Project:
  - https://github.com/prisma/prisma-examples/tree/latest/javascript/rest-express


### Seeding

Purpose:
    This will fill in the database with users who have regular plaintext passwords of 123 for testing.
    In your code, use bcrypt for hashing all passwords stored in the database.

1. Go to the 'backend' dir
    cd backend
2. Create your database using a Prism schema migration (if you haven't done it yet):
    npx prisma migrate dev --name init
3. Populate the database with fake data
    npx prisma db seed
