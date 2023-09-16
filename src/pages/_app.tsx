import { type AppProps } from "next/app";
import Link from "next/link";

import "~/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <header>
        <nav>
          <ul className="flex flex-row gap-x-8">
            <li>
              <Link href="/">Homepage</Link>
            </li>
            <li>
              <Link href="/404">404</Link>
            </li>
            <li>
              <Link href="/500">500</Link>
            </li>
          </ul>
        </nav>
        <hr />
      </header>
      <Component {...pageProps} />
    </main>
  );
}
