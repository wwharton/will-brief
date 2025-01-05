# Will-Brief
This is project is a demo I created while preparing for a job interview and is deployed via Vercel and available at https://will-brief.vercel.app/

It is inspired by the concept of a "Single Source of Truth Planning Tool." 

It is developed loosely following the opinions of "The Tao of React," but was developed with an emphasis on agility / MVP.

In this app, the "Card" entity is our single source of truth where all data and relationships are derived. The card is responsible for defining what Categories, SubCategories, and SwimLanes exist. This is a knowing tradeoff, as I wanted a dead-simple data model to focus on crafting a clientside experience.

The app does feature:
- Framer Motion enriched home-page
- CRUD operations on the Card model, including drag and drop (via Atlassian Pragmatic DnD) and re-ranking of cards within lanes.
- Multiple "Views" of the card data, including a Slideshow view (Presentation), Document view, and Diagram view (via Mermaid markdown).
- Light and Dark Mode

This app does not feature:
- Backend Persistence ~ cards are stored clientside and lost on refresh (This is more of a demo app, not quite yet intended for real users)
  - But ~ there is Import and Export of card data via JSON to provide some sort of persistence method

# Next.JS Boilerplate
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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
