import { CartLineItem } from "~/components";
import { useCart } from "~/lib/commercetools/hooks";

export default function CartPage() {
  const { data: cart, loading: cartLoading } = useCart();

  const isCartEmpty = !cart?.lineItems?.length;

  return (
    <div>
      <h1>Cart</h1>
      {cartLoading ? (
        <p>Loading...</p>
      ) : isCartEmpty ? (
        <p>Your cart is empty</p>
      ) : (
        <section>
          <ol className="m-0 flex flex-col gap-y-2 p-0">
            {cart.lineItems.map((lineItem) => (
              <li key={lineItem.id}>
                <CartLineItem lineItem={lineItem} />
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
