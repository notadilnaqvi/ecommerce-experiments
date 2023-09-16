import { type AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";

import "~/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <main>
      <header>
        <nav className="flex flex-wrap gap-x-8 gap-y-4">
          <Link href="/">Homepage</Link>
          <Link href="/404">404</Link>
          <Link href="/500">500</Link>
          <button type="button" onClick={() => router.back()}>
            Go back
          </button>
        </nav>
        <hr />
      </header>
      <Component {...pageProps} />
    </main>
  );
}
