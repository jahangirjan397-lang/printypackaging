import { SocialIcon } from "@/components/SocialIcons";

// Share links need no account: each opens the platform's own share dialog
// with the article URL filled in. utm_source tags the visits these shares
// bring back, so quote leads can be traced to the platform.
function withSource(url: string, source: string) {
  const tagged = new URL(url);
  tagged.searchParams.set("utm_source", source);
  tagged.searchParams.set("utm_medium", "social_share");
  return tagged.toString();
}

export default function ShareButtons({
  url,
  title,
  image,
}: {
  url: string;
  title: string;
  image?: string;
}) {
  const shares = [
    {
      key: "linkedin" as const,
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(withSource(url, "linkedin"))}`,
    },
    {
      key: "facebook" as const,
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(withSource(url, "facebook"))}`,
    },
    {
      key: "x" as const,
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(withSource(url, "x"))}&text=${encodeURIComponent(title)}`,
    },
    {
      key: "pinterest" as const,
      label: "Pinterest",
      href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(withSource(url, "pinterest"))}&description=${encodeURIComponent(title)}${image ? `&media=${encodeURIComponent(image)}` : ""}`,
    },
  ];

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${title} ${withSource(url, "whatsapp")}`)}`;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-black text-[#07111F]">Share this guide:</span>
      {shares.map((share) => (
        <a
          key={share.key}
          href={share.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${share.label}`}
          title={`Share on ${share.label}`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#07111F] transition hover:border-[#FF6A00] hover:bg-[#FF6A00] hover:text-white"
        >
          <SocialIcon platform={share.key} className="h-[18px] w-[18px]" />
        </a>
      ))}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        title="Share on WhatsApp"
        className="flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-black text-[#07111F] transition hover:border-[#19C463] hover:bg-[#19C463] hover:text-white"
      >
        WhatsApp
      </a>
    </div>
  );
}
