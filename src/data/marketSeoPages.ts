export const marketSeoPages = {
  usa: {
    title: "Custom Packaging USA",
    metaTitle: "Custom Packaging USA | Custom Printed Boxes",
    description:
      "Custom packaging boxes, rigid boxes, mailer boxes, food packaging and luxury printed packaging support for USA brands.",
    heading: "Custom packaging solutions for USA brands.",
    intro:
      "Printy Packaging supports USA businesses with custom printed boxes, mailer boxes, rigid boxes, food packaging, labels, paper bags and luxury packaging solutions.",
    points: [
      "Custom printed boxes for ecommerce and retail brands",
      "Rigid boxes and folding cartons for premium products",
      "Food packaging, butter paper and paper bags",
      "Quote support for size, stock, printing and finishing",
    ],
  },
  uk: {
    title: "Custom Packaging UK",
    metaTitle: "Custom Packaging UK | Printed Boxes & Packaging",
    description:
      "Custom printed boxes, retail packaging, food packaging and luxury packaging support for UK brands.",
    heading: "Custom packaging support for UK brands.",
    intro:
      "Printy Packaging helps UK buyers plan custom packaging with clear guidance on materials, printing, finishing and production details.",
    points: [
      "Custom boxes for retail, ecommerce and food brands",
      "Premium finishing including foil, UV and lamination",
      "Packaging guidance for custom sizes and quantities",
      "Fast quote support through form, WhatsApp and live chat",
    ],
  },
  canada: {
    title: "Custom Packaging Canada",
    metaTitle: "Custom Packaging Canada | Custom Boxes Supplier",
    description:
      "Custom boxes, mailer boxes, rigid boxes, food packaging and printed packaging support for Canadian brands.",
    heading: "Custom printed packaging for Canadian businesses.",
    intro:
      "Printy Packaging supports Canadian brands with box style guidance, material selection, printing options and custom quote support.",
    points: [
      "Mailer boxes and shipping boxes for online brands",
      "Rigid boxes and folding cartons for retail products",
      "Food-safe packaging and wrapping paper options",
      "Clear quote support for multiple quantities",
    ],
  },
  europe: {
    title: "Custom Packaging Europe",
    metaTitle: "Custom Packaging Europe | Printed Boxes & Packaging",
    description:
      "Custom packaging, printed boxes, luxury boxes and food packaging support for European brands.",
    heading: "Custom packaging guidance for European brands.",
    intro:
      "Printy Packaging helps European buyers with custom packaging planning, material guidance, finishing options and quote support.",
    points: [
      "Custom printed boxes for product brands",
      "Luxury finishes for premium packaging",
      "Food packaging and retail packaging options",
      "Packaging support for global buyer needs",
    ],
  },
    uae: {
    title: "Custom Packaging UAE",
    metaTitle: "Custom Packaging UAE | Luxury Printed Boxes & Packaging",
    description:
      "Custom packaging, rigid boxes, perfume boxes, luxury packaging, paper bags, labels and printed packaging support for UAE brands.",
    heading: "Custom packaging support for UAE luxury and retail brands.",
    intro:
      "Printy Packaging supports UAE businesses with premium custom boxes, rigid boxes, perfume packaging, jewelry boxes, paper bags, labels, stickers and luxury finishing guidance.",
    points: [
      "Luxury rigid boxes for perfume, jewelry and premium products",
      "Custom printed boxes for retail and ecommerce brands",
      "Paper bags, labels, stickers and food packaging options",
      "Quote support for size, material, printing, finishing and delivery",
    ],
  },
  australia: {
    title: "Custom Packaging Australia",
    metaTitle: "Custom Packaging Australia | Custom Printed Boxes",
    description:
      "Custom printed boxes, mailer boxes, food packaging and luxury packaging support for Australian brands.",
    heading: "Custom packaging support for Australian brands.",
    intro:
      "Printy Packaging supports Australian businesses with custom box styles, printed packaging, food packaging and luxury finishing guidance.",
    points: [
      "Custom mailer boxes and ecommerce packaging",
      "Printed folding cartons and rigid boxes",
      "Paper bags, labels and food packaging options",
      "Fast quote support for packaging buyers",
    ],
  },
} as const;

export type MarketSeoSlug = keyof typeof marketSeoPages;
