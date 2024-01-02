This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Packages Used in this Project

## Authetincation: Clerk
Security and authentications handled by a third party company. For more info, check  the [documentation](https://clerk.com/docs).

## Components Library: ShadCN/UI
For reusable NextJS components. For more info, check [documentation](https://ui.shadcn.com/docs)

## State Management: Zustand
Library for React applications that provides a simple and flexible way to manage global state. For more info, check [documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
 
## Database Management: Prisma & Prisma Client
Simplify database access and management. For more info, check [documentation](https://www.prisma.io/docs)
To install: `npm i -D prisma @prisma/client` \
To initialize: `npx prisma init` \
To generate DB: `npx prisma generate` \
To add/update schema in DB: `npx prisma db push` \
To reset DB: `npx prisma migrate reset` \
To check DB: `npx prisma studio`

## MySQL-based database: PlanetScale
MySQL-compatible serverless database that brings scale, performance, and reliability. For more info, check [documentation](https://planetscale.com/docs)

## HTTPS Requests Management: Axios
A simple, promise-based HTTP client for making requests to a RESTful API. For more info, check [documentation](https://axios-http.com/docs/intro)

## Error Handler: react-hot-toast
A simple React hook based toast notification library. For more info, check [documentation](https://react-hot-toast.com/)

## Images Upload: Cloudinary
Handles uploading images to the cloud. For more info, check [documentation](https://cloudinary.com/documentation)
To config:
1. Add Cloud Name to .env file
1. Add images configuration in your next.config.js file
```js
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
        },
      ],
    },
}
```
To upload: Use the <CldUploadWidget> and for the property `uploadPreset` go to your Cloudinary account and follow the instructions: `Settings -> Upload -> Upload Presets --> Add Upload Preset -> Signing Mode: Unsigned` to get your Upload presets name and use it as a string.

## Images Manager for NextJS: next-cloudinary
High-performance image and video delivery and uploading at scale in Next.js powered by Cloudinary. For more info, check [documentation](https://next.cloudinary.dev/)
To install: `npm install next-cloudinary`

## Format Dates: date-fns
Provides the most comprehensive, yet simple and consistent toolset for manipulating JavaScript dates in a browser & Node.js. For more info, check [documentation](https://date-fns.org/docs/Getting-Started)

## Payment Method: Stripe
Create an account in their [website](https://stripe.com/en-th). And add the following package. For more info, check [documentation](https://www.npmjs.com/package/stripe).

## Show Charts: recharts
For charts in React Apps</s>. For more info, check [documentation](https://www.npmjs.com/package/recharts).
