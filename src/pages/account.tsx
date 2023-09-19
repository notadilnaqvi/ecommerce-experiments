import { useRouter } from "next/router";
import { useState } from "react";
import { useCustomer, useLogout } from "~/lib/commercetools/hooks";

export default function AccountPage() {
  const router = useRouter();
  const [logout] = useLogout();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { data: customer, loading: customerLoading } = useCustomer();

  async function handleLogout() {
    try {
      setLogoutLoading(true);
      await logout();
      router.push("/");
    } catch (err) {
      console.error("[handleLogout]", err);
      alert("Failed to log out");
    }
  }

  return (
    <div>
      <h1>Account</h1>
      {customerLoading ? (
        <p>Loading...</p>
      ) : customer ? (
        <div>
          <section className="max-w-5xl overflow-x-scroll">
            <pre>
              <code>{JSON.stringify(customer, null, 2)}</code>
            </pre>
          </section>
          <button disabled={logoutLoading} onClick={handleLogout}>
            {logoutLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      ) : (
        <p>Login to view account details</p>
      )}
    </div>
  );
}
