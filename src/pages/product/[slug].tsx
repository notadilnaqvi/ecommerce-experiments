import {
  type GetStaticProps,
  type GetStaticPaths,
  type InferGetStaticPropsType,
} from "next";
import { useRouter } from "next/router";
import { sleep } from "~/lib/utils";

type ProductPageProps = {
  slug: string;
};

export const getStaticPaths = (async () => {
  const slugs = ["1", "2", "3"];

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

  if (!slug || slug.includes("invalid")) {
    return {
      notFound: true,
    };
  }

  await sleep(2000);

  return {
    props: {
      slug,
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

  const { slug } = props;

  return (
    <div>
      <h1>Product {slug}</h1>
    </div>
  );
}
