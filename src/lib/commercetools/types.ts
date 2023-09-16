import { z } from 'zod';

import { authTokenSchema } from "~/lib/commercetools/validation";

// Generated types

export * from '~/lib/commercetools/graphql/__generated__/graphql';

// Validated data types

export type AuthToken = z.infer<typeof authTokenSchema>

// Normalised product

export type ProductImage = {
	src: string;
	label: string;
};

export type ProductPrice = {
	centAmount: number;
	currencyCode: string;
	fractionDigits: number;
};

export type NormalisedProduct = {
	id: string;
	sku: string;
	slug: string;
	name: string;
	/** Relative path of the product. For example, `/product/some-slug` */
	path: string;
	price: ProductPrice;
	images: ProductImage[];
	description?: Maybe<string>;
};

// Normalised cart

export type LineItem = {
	id: string;
	sku: string;
	name: string;
	quantity: number;
	productSlug: string;
	image: ProductImage;
	price: ProductPrice;
};

export type NormalisedCart = {
	id: string;
	version: number;
	currency: string;
	lineItems: LineItem[];
	totalPrice: ProductPrice;
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
