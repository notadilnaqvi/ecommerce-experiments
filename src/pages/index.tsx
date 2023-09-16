import Link from "next/link";

const productSlugs = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "invalid-1",
  "invalid-2",
  "invalid-3",
];

export default function Home() {
  return (
    <div>
      <h1>Homepage</h1>
      <section>
        <h2>All products</h2>
        <ul>
          {productSlugs.map((slug) => (
            <li key={slug}>
              <Link href={"/product/" + slug}>Product {slug}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
