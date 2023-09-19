import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useAddToCart } from "~/lib/commercetools/hooks";
import { NormalisedProduct } from "~/lib/commercetools/types";

type ProductCardProps = {
  product: NormalisedProduct;
};

export function ProductCard(props: ProductCardProps) {
  const { product } = props;
  const [addToCart] = useAddToCart();
  const [addToCartLoading, setAddToCartLoading] = useState(false);

  const productImage = product.images[0];

  async function handleAddToCart() {
    setAddToCartLoading(true);
    await addToCart({ sku: product.sku });
    setAddToCartLoading(false);
    alert(`"${product.name}" was added to cart`);
  }

  return (
    <div className="flex h-28 flex-row justify-between gap-x-2 border border-solid">
      <div className="flex flex-col justify-between p-2">
        <Link href={product.path} className="w-fit">
          {product.name}
        </Link>
        <div className="flex flex-row gap-x-2">
          <button disabled={addToCartLoading} onClick={handleAddToCart}>
            {addToCartLoading ? "Adding..." : "Add to cart"}
          </button>
          <button>Add to wishlist</button>
        </div>
      </div>
      {productImage ? (
        <div className="w-20 shrink-0">
          <Image
            src={productImage.src}
            alt={productImage.label}
            width={80}
            height={112}
          />
        </div>
      ) : null}
    </div>
  );
}
