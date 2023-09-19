import { useRouter } from "next/router";

import { useCustomer, useLogin } from "~/lib/commercetools/hooks";

export default function LoginPage() {
  const router = useRouter();
  const [login, { loading: loginLoading }] = useLogin();
  const { data: customer, loading: customerLoading } = useCustomer();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const emailInput = event.currentTarget["email"] as HTMLInputElement;
    const passwordInput = event.currentTarget["password"] as HTMLInputElement;
    try {
      const email = emailInput.value;
      const password = passwordInput.value;

      await login({ email, password });
      router.push("/account");
    } catch (err) {
      console.error("[handleLogin]", err);
      alert("Failed to log in");
    }
  }

  const isAlreadyLoggedIn = !!customer;

  return (
    <div>
      <h1>Login</h1>
      {customerLoading ? (
        <p>Loading...</p>
      ) : isAlreadyLoggedIn ? (
        <p>You are already logged in as {customer.firstName}</p>
      ) : (
        <form onSubmit={handleLogin} className="flex max-w-sm flex-col gap-y-2">
          <div className="flex w-full flex-row justify-between">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />
          </div>
          <div className="flex w-full flex-row justify-between">
            <label htmlFor="email">Password</label>
            <input type="password" name="password" id="password" required />
          </div>
          <button
            type="submit"
            disabled={loginLoading}
            className="ml-auto w-min"
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
}
