import { useRouter } from "next/router";

export default function InternalServerError() {
  const router = useRouter();
  return (
    <div>
      <h1>Internal Server Error</h1>
      <p>Failed to generate <code>{router.asPath}</code></p>
    </div>
  );
}
