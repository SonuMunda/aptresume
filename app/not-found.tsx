// pages/404.tsx
import { Button } from "@mui/material";
import Link from "next/link";
import Head from "next/head";

export default function NotFound() {
  <Head>
    <title>404 - Page Not Found</title>
    <meta name="robots" content="noindex" />
  </Head>;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-6 max-w-md">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link href="/" passHref>
        <Button variant="contained" color="primary">
          Go Home
        </Button>
      </Link>
    </div>
  );
}
