# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Deploying to Vercel

To deploy this project to Vercel, you must set the environment variables found in the `.env` file in your Vercel project settings.

Go to your Vercel project -> Settings -> Environment Variables and add the following:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

You can find these values in your Firebase project console. Go to **Project settings** (the gear icon) > **General** > **Your apps** > **Firebase SDK snippet** > **Config**.
