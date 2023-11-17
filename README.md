This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run

```bash
yarn install
```

to install all dependencies.

Then initialise prisma and start the server:
- Generate types for prisma client 
    ```
    npx prisma generate
    ```
- Config ORM with MongoDB
    ```
    npx prisma db push
    ```

After that, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

If you want see the detials of database:

```
npx prisma studio
```

## Admin Account
Site Admin:
- Email: unsw@siteAdmin.com
- Password: unsw@siteAdmin.com

Tutor Admin:
- Email: unsw@tutorAdmin.com
- Password: unsw@tutorAdmin.com

## Reset password feature

The current version of reset password feature is only available to `benjaminli060@gmail.com` since 
according to [resend](https://resend.com/), the feature for sending email to external email address will only be available 
after a domain was added.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Eslint

Please run

```bash
yarn lint
```

before commiting your code.

## Front-end Framework

- [Tailwind CSS](https://tailwindcss.com/docs) - a utility-first CSS framework for rapidly building custom designs.
- [Shadcn/ui](https://ui.shadcn.com/docs) - a React component library built with Tailwind CSS.
- [daisyUI](https://daisyui.com/) - a component library for Tailwind CSS.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
