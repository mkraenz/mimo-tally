# Mimo Tally Frontend

Mimo Tally is an app so you and your loved ones can easily keep a list of who owes what amount of money to whom. Once you've paid outside the app (cash or banking), you mark your tally as settled.

This is a **very quick and dirty prototype** for Mimo Tally. I am not using nextjs the way it should be used. Normally, most of the api requests would be part of api routes but due to suddenly switching to an external python backend for training purposes, I am now doing a weird and clunky SPA within Next - without ejecting. Certainly needs a rework in time.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Links

- [GCP Project for OAuth2 Setup](https://console.cloud.google.com/auth/audience?inv=1&invt=AbsfpA&project=mimo-tally-2025)
- [Clerk Identity Provider Dev Tenant](https://dashboard.clerk.com/apps/app_2uWXcEdgCyX4nfdefVuA0DFl1zg/instances/ins_2uWXcGxpgnfRYTaLdD6vkNXJm60/user-authentication/sso-connections)
- [MiMos Tally](https://tally.kraenz.eu)
- <https://tally.kraenz.eu/terms-of-service> TODO
- <https://tally.kraenz.eu/privacy> TODO
