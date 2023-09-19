import { type GetStaticProps, type InferGetStaticPropsType } from "next";

import { ProductCard } from "~/components";
import { getProducts } from "~/lib/commercetools";
import type { NormalisedProduct } from "~/lib/commercetools/types";

type ProductPageProps = {
  products: NormalisedProduct[];
};

export const getStaticProps = (async () => {
  const products = await getProducts({ limit: 32 });

  return {
    props: {
      products,
    },
  };
}) satisfies GetStaticProps<ProductPageProps>;

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { products } = props;
  return (
    <div>
      <h1>Homepage</h1>
      <section>
        <h2>All products</h2>
        <ol className="m-0 grid list-none grid-cols-5 gap-2 p-0 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
