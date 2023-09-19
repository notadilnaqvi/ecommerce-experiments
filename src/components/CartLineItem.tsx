import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  useRemoveFromCart,
  useUpdateLineItemQuantity,
} from "~/lib/commercetools/hooks";
import { NormalisedCart } from "~/lib/commercetools/types";

export function CartLineItem(props: {
  lineItem: NormalisedCart["lineItems"][number];
}) {
  const { lineItem } = props;
  const [removeFromCart] = useRemoveFromCart();
  const [updateLineItemQuantity] = useUpdateLineItemQuantity();
  const [removeFromCartLoading, setRemoveFromCartLoading] = useState(false);
  const [updateLineItemQuantityLoading, setUpdateLineItemQuantityLoading] =
    useState(false);

  async function handleRemoveFromCart() {
    setRemoveFromCartLoading(true);
    await removeFromCart({ lineItemId: lineItem.id });
    setRemoveFromCartLoading(false);
  }

  async function handleIncreaseQuantity() {
    setUpdateLineItemQuantityLoading(true);
    const newQuantity = lineItem.quantity + 1;
    await updateLineItemQuantity({
      lineItemId: lineItem.id,
      quantity: newQuantity,
    });
    setUpdateLineItemQuantityLoading(false);
  }

  async function handleDecreaseQuantity() {
    setUpdateLineItemQuantityLoading(true);
    const newQuantity = lineItem.quantity - 1;
    await updateLineItemQuantity({
      lineItemId: lineItem.id,
      quantity: newQuantity,
    });
    setUpdateLineItemQuantityLoading(false);
  }

  return (
    <div className="flex h-28 max-w-sm flex-row justify-between gap-x-2 border border-solid">
      <div className="flex flex-col justify-between p-2">
        <Link href={lineItem.productPath}>{lineItem.name}</Link>
        <div className="flex flex-row items-center gap-x-2">
          <button
            disabled={updateLineItemQuantityLoading}
            onClick={handleDecreaseQuantity}
          >
            <span aria-hidden>-</span>
            <span className="sr-only">Decrease quantity by 1</span>
          </button>
          <p className="m-0">
            {lineItem.quantity}
            <span className="sr-only">items in cart</span>
          </p>
          <button
            disabled={updateLineItemQuantityLoading}
            onClick={handleIncreaseQuantity}
          >
            <span aria-hidden>+</span>
            <span className="sr-only">Increase quantity by 1</span>
          </button>
          <button
            disabled={removeFromCartLoading}
            onClick={handleRemoveFromCart}
          >
            {removeFromCartLoading ? "Removing..." : "Remove from cart"}
          </button>
        </div>
      </div>
      {lineItem.image ? (
        <div className="w-20 shrink-0">
          <Image
            src={lineItem.image.src}
            alt={lineItem.image.label}
            width={80}
            height={112}
          />
        </div>
      ) : null}
    </div>
  );
}
