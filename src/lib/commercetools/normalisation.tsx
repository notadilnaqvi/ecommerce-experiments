import type {
  CartFragmentFragment,
  CustomerFragmentFragment,
  MoneyFragmentFragment,
  NormalisedCart,
  NormalisedCustomer,
  NormalisedProduct,
  ProductProjectionFragmentFragment,
} from "~/lib/commercetools/types";
import { LOCALE } from "~/lib/utils/constants";

export function normaliseProduct(
  product?: Maybe<ProductProjectionFragmentFragment>,
): Maybe<NormalisedProduct> {
  if (!product) return null;

  const name = product.name;
  const sku = product.masterVariant.sku;
  const centAmount = product.masterVariant?.scopedPrice?.value.centAmount;
  const currencyCode = product.masterVariant?.scopedPrice?.value.currencyCode;
  const fractionDigits =
    product.masterVariant?.scopedPrice?.value.fractionDigits;

  if (!sku) {
    console.warn(
      "[normaliseProduct]: Product with ID " + product.id + " has no SKU.",
    );
    return null;
  }

  if (!name) {
    console.warn(
      "[normaliseProduct]: Product with ID " + product.id + " has no name.",
    );
    return null;
  }

  if (!centAmount || !currencyCode || !fractionDigits) {
    console.warn(
      "[normaliseProduct]: Product with ID " +
        product.id +
        " has an invalid price.",
    );
    return null;
  }

  if (!product.slug) {
    console.warn(
      "[normaliseProduct]: Product with ID " + product.id + " has no slug.",
    );
    return null;
  }

  const fallbackLabel = name;

  const images = normaliseProductImages(
    product.masterVariant.images,
    fallbackLabel,
  );

  return {
    id: product.id,
    sku: sku,
    path: "/product/" + product.slug,
    images: images,
    description: product.description,
    name: name,
    slug: product.slug,
    price: normalisePrice({
      centAmount,
      currencyCode,
      fractionDigits,
    }),
  };
}

function normaliseProductImages(
  images: ProductProjectionFragmentFragment["masterVariant"]["images"],
  fallbackLabel: string,
) {
  const normalisedImages: NormalisedProduct["images"] = images.map((image) => {
    return {
      src: image.url,
      label: image.label || fallbackLabel,
    };
  });

  if (normalisedImages.length > 1) {
    normalisedImages.shift();
  }

  return normalisedImages;
}

export function normaliseCart(
  cart?: Maybe<CartFragmentFragment>,
): Maybe<NormalisedCart> {
  if (!cart) return null;

  return {
    id: cart.id,
    version: cart.version,
    currency: cart.totalPrice.currencyCode,
    totalPrice: normalisePrice(cart.totalPrice),
    totalLineItemQuantity: cart.totalLineItemQuantity,
    lineItems: cart?.lineItems
      .map((lineItem) => {
        if (
          !lineItem?.name ||
          !lineItem?.variant?.sku ||
          !lineItem?.productSlug ||
          !lineItem?.totalPrice
        ) {
          return null;
        }
        return {
          productSlug: lineItem.productSlug,
          id: lineItem.id,
          name: lineItem.name,
          variantSku: lineItem.variant?.sku,
          quantity: lineItem.quantity,
          productPath: "/product/" + lineItem.productSlug,
          price: normalisePrice(lineItem.totalPrice),
          image: {
            src: lineItem.variant?.images?.[0]?.url,
            label: lineItem.variant?.images?.[0]?.label || "",
          },
        };
      })
      .filter(
        (lineItem): lineItem is NormalisedCart["lineItems"][number] =>
          !!lineItem,
      ),
  };
}

export function normaliseCustomer(
  customer?: Maybe<CustomerFragmentFragment>,
): Maybe<NormalisedCustomer> {
  if (!customer) return null;

  return {
    id: customer.id,
    version: customer.version,
    firstName: customer?.firstName ?? "MISSING_FIRST_NAME",
    lastName: customer?.lastName ?? "MISSING_LAST_NAME",
    email: customer.email,
    isEmailVerified: customer.isEmailVerified,
  };
}

export function normalisePrice(price: MoneyFragmentFragment) {
  const formatter = new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: price.currencyCode,
    maximumFractionDigits: price.fractionDigits,
  });

  // Refer to https://docs.commercetools.com/api/types#usage
  const amount = price.centAmount / 10 ** price.fractionDigits;

  return {
    amount,
    centAmount: price.centAmount,
    currencyCode: price.currencyCode,
    formattedAmount: formatter.format(amount),
  };
}
