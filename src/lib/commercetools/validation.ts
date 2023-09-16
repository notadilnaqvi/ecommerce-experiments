import { z } from "zod";

export const authTokenSchema = z.object({
	scope: z.string(),
	expires_in: z.number(),
	expires_at: z.number().optional(),
	access_token: z.string(),
	token_type: z.literal('Bearer'),
	refresh_token: z.string(),
	/**
	 * This is a custom field that we add to the auth token to indicate whether
	 * the user is logged in or not since Commercetools doesn't provide an easy
	 * way to check the login status of a user.
   * 
   * WARNING: Do not rely on this field to do sensitive operations as it can be
   * easily spoofed by the user. The only deterministic way to check if a user
   * is logged in or not is to query the Commercetools API for customer data.
   * If the user is logged in, the API will return the customer data, otherwise
   * it will return an error.
	 */
	is_logged_in: z.boolean().optional(),
});