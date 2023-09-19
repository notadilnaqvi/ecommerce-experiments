import Link from "next/link";
import { useRouter } from "next/router";
import { useCart, useCustomer } from "~/lib/commercetools/hooks";

export function Header() {
  const router = useRouter();
  const { data: cart } = useCart();
  const { data: customer } = useCustomer();

  return (
    <header>
      <nav className="flex flex-wrap gap-x-8 gap-y-4">
        <Link href="/">Homepage</Link>
        <Link href="/cart">
          Cart ({cart?.totalLineItemQuantity || 0})
          <span className="sr-only">items in cart</span>
        </Link>
        <Link href={customer ? "/account" : "/login"}>
          {customer ? "Account" : "Login"}
        </Link>
        <button type="button" onClick={() => router.back()}>
          Go back
        </button>
      </nav>
      <hr />
    </header>
  );
}
