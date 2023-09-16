import {
  type GetStaticPaths,
  type GetStaticProps,
  type InferGetStaticPropsType,
} from "next";
import { useRouter } from "next/router";

import { getProductBySlug, getProductSlugs } from "~/lib/commercetools";
import type { NormalisedProduct } from "~/lib/commercetools/types";

type ProductPageProps = {
  product: NormalisedProduct;
};

export const getStaticPaths = (async () => {
  const slugs = await getProductSlugs({ limit: 16 });

  const paths = slugs.map((slug) => {
    return {
      params: {
        slug,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const slug = Array.isArray(context.params?.["slug"])
    ? context.params?.["slug"][0]
    : context.params?.["slug"];

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
}) satisfies GetStaticProps<ProductPageProps>;

export default function ProductPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  const { product } = props;

  return (
    <div>
      <h1>{product.name}</h1>
      <section className="max-w-5xl overflow-x-scroll">
        <pre>
          <code>{JSON.stringify(product, null, 2)}</code>
        </pre>
      </section>
    </div>
  );
}
