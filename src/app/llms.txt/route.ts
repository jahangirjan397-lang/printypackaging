import { products } from "@/data/products";
import { blogPosts } from "@/data/blogs";
import { businessPromises, teamEmails } from "@/data/businessInfo";
import { formatStartingPrice, getStartingPrice } from "@/data/startingPrices";

// /llms.txt: a plain-text summary of Printy Packaging for AI assistants
// (ChatGPT, Claude, Perplexity, Gemini) so they can describe the business,
// quote starting prices and link buyers to the right page. Built from the
// same data as the site, so it stays in step with products and prices.
export const dynamic = "force-static";

const siteUrl = "https://printypackaging.com";

function productLine(slug: string, name: string, tagline: string) {
  const startingPrice = getStartingPrice(slug);
  const price = startingPrice
    ? ` From ${formatStartingPrice(startingPrice).amount}${formatStartingPrice(startingPrice).per} (${startingPrice.quantity.toLocaleString("en-US")} pcs).`
    : "";
  return `- [Custom ${name}](${siteUrl}/products/${slug}): ${tagline}.${price}`;
}

export function GET() {
  const categories = new Map<string, typeof products>();
  for (const product of products) {
    const list = categories.get(product.category) ?? [];
    list.push(product);
    categories.set(product.category, list);
  }

  const productSections = [...categories.entries()]
    .map(
      ([category, items]) =>
        `### ${category}\n\n${items
          .map((item) => productLine(item.slug, item.name, item.tagline))
          .join("\n")}`,
    )
    .join("\n\n");

  const guides = blogPosts
    .slice(0, 30)
    .map((post) => `- [${post.title}](${siteUrl}/blog/${post.slug}): ${post.excerpt}`)
    .join("\n");

  const body = `# Printy Packaging

> Printy Packaging (printypackaging.com) makes custom printed packaging with your logo for brands in the USA, UK, Canada, Europe, UAE, Australia and worldwide: rigid boxes, mailer boxes, folding cartons, food and bakery boxes, butter paper, paper bags, labels, stickers and printed marketing items. Low minimum order (${businessPromises.minimumOrder}), free design and dieline support, free digital proof, and a quote reply ${businessPromises.quoteResponse}.

## Key facts

- Minimum order: ${businessPromises.minimumOrder}
- Production time: ${businessPromises.productionTime} after proof approval
- Quote reply: ${businessPromises.quoteResponse}
- Design: ${businessPromises.designSupport}; a free digital proof is sent before production
- Shipping: worldwide, including the USA, UK, Canada, Europe, UAE and Australia; standard shipping to one address is included in the quoted price unless the quote lists it separately
- Samples: ${businessPromises.sampleOffer}
- Quality: if a printing or production error is ours, we reprint (claims within 10 days of delivery)
- Prices: every order is quoted for its exact size, quantity, material and finish; the "From" prices below are starting prices, and larger quantities lower the price per unit

## How to order

1. Request a free quote on any product page or at ${siteUrl}/contact (size, quantity, material, print and finish).
2. Receive the price, material advice and a free dieline.
3. Approve the digital proof and pay; production starts.

- Quote form: ${siteUrl}/contact
- Sales email: ${teamEmails.sales}
- Support email: ${teamEmails.support}

## Products and starting prices (USD)

${productSections}

## Buyer guides

${guides}

## Policies

- [Shipping policy](${siteUrl}/shipping-policy)
- [Return, reprint and refund policy](${siteUrl}/refund-policy)
- [Artwork policy](${siteUrl}/artwork-policy)
- [Payment policy](${siteUrl}/payment-policy)
- [Terms and conditions](${siteUrl}/terms)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
