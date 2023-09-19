import { z } from "zod";

import { authTokenSchema } from "~/lib/commercetools/validation";

// Generated types

export * from "~/lib/commercetools/graphql/__generated__/graphql";

// Validated data types

export type AuthToken = z.infer<typeof authTokenSchema>;

// Normalised product

export type NormalisedImage = {
  src: string;
  label: string;
};

export type NormalisedPrice = {
  amount: number;
  centAmount: number;
  currencyCode: string;
  formattedAmount: string;
};

export type NormalisedProduct = {
  id: string;
  sku: string;
  slug: string;
  name: string;
  /** Relative path of the product. For example, `/product/some-slug` */
  path: string;
  price: NormalisedPrice;
  images: NormalisedImage[];
  description?: Maybe<string>;
};

// Normalised cart

export type LineItem = {
  id: string;
  variantSku: string;
  name: string;
  quantity: number;
  productSlug: string;
  productPath: string;
  image: NormalisedImage;
  price: NormalisedPrice;
};

export type NormalisedCart = {
  id: string;
  version: number;
  currency: string;
  lineItems: LineItem[];
  totalPrice: NormalisedPrice;
  totalLineItemQuantity: number;
};

// Normalised customer

export type NormalisedCustomer = {
  id: string;
  email: string;
  version: number;
  lastName: string;
  firstName: string;
  isEmailVerified: boolean;
};
