# Jobreel

> By Fernando Muñoz

### Tech Stack

- Next.js
- TailwindCSS
- Typescript
- Shadcn UI
- Drizzle ORM
- NeonDB (Serverless Postgres)
- Clerk
- Uploadthing (File Storage)
- pnpm

### Development

- Install dependencies
  ```
  $ pnpm install
  ```
- Create <code>.env</code> at the project's root and copy the template variables from <code>.env.template</code>

- Create Clerk app at <a href='https://clerk.com'>Clerk</a> select require "name" and "username" fields and and enable the following sign-up options:

  - Email Address
  - Google
  - Apple
  - LinkedIn
  - Facebook

- Create a webhook endpoint in Clerk that listens for all "user" events. You will also need an ngrok url to tunnel the webhook requests from clerk to your local development server.

- Copy your Clerk credentials and add them to <code>.env</code> file.

- Configure database schema
  ```
  $ pnpm db:push
  ```
- Start the development server
  ```
  $ pnpm dev
  ```
- Open Ngrok tunnel
  ```
  ngrok http --domain=YOUR_NGROK_DOMAIN 3000
  ```
