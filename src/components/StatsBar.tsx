import { businessPromises } from "@/data/businessInfo";

const iconProps = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-5 w-5",
};

const features = [
  {
    title: "Premium packaging",
    text: "Made to your specification",
    icon: (
      <svg {...iconProps}>
        <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
        <path d="m3 8 9 5 9-5M12 13v8" />
      </svg>
    ),
  },
  {
    title: "Worldwide delivery",
    text: "Tracked to USA, UK, EU & UAE",
    icon: (
      <svg {...iconProps}>
        <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
        <circle cx="7" cy="17.5" r="1.8" />
        <circle cx="17.5" cy="17.5" r="1.8" />
      </svg>
    ),
  },
  {
    title: "Competitive prices",
    text: "Tiered bulk pricing",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3v18M16.5 7.5c0-1.9-2-3-4.5-3s-4.5 1.2-4.5 3.2c0 4.8 9 2.6 9 7.4 0 2-2 3.4-4.5 3.4s-4.5-1.2-4.5-3.2" />
      </svg>
    ),
  },
  {
    title: "Expert support",
    text: `Replies ${businessPromises.quoteResponse.replace(" (business hours)", "")}`,
    icon: (
      <svg {...iconProps}>
        <path d="M4 14v-3a8 8 0 0 1 16 0v3" />
        <path d="M4 14a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2v-2ZM20 14a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2Z" />
      </svg>
    ),
  },
  {
    title: "Eco-friendly options",
    text: "Kraft & recyclable stocks",
    icon: (
      <svg {...iconProps}>
        <path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z" />
        <path d="M5 19c3-4 6-6.5 9-8" />
      </svg>
    ),
  },
];

export default function StatsBar() {
  return (
    <section
      aria-label="Why buy from Printy Packaging"
      className="border-b border-slate-200 bg-white px-5 md:px-8"
    >
      <ul className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:max-w-[1520px]">
        {features.map((item, index) => (
          <li
            key={item.title}
            className={`flex items-center gap-3 py-5 lg:justify-center lg:border-l lg:border-slate-200 lg:px-4 ${
              index === 0 ? "lg:border-l-0" : ""
            } ${index === features.length - 1 ? "col-span-2 md:col-span-1" : ""}`}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF6A00]/10 text-[#FF6A00]">
              {item.icon}
            </span>
            <span>
              <span className="block text-sm font-black text-[#07111F]">
                {item.title}
              </span>
              <span className="block text-xs text-slate-500">{item.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
