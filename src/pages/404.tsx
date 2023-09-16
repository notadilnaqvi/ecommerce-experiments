import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();
  return (
    <div>
      <h1>Not Found</h1>
      <p><code>{router.asPath}</code> does not exist</p>
    </div>
  );
}
