---
order: 7
title: Get help from any AI
---
Aap **kisi bhi AI** se madad le sakte hain: ChatGPT (chatgpt.com), Google Gemini (gemini.google.com), Claude (claude.ai) ya Microsoft Copilot. Koi ek zaroori nahi. Neeche diye prompts copy karein, `[ ]` wali jagah bharein, aur AI mein paste karein.

**Hifazat:** AI ko kabhi password, secret key, API key, ya `.env` file ka text na dein.

---

## Prompt 1 – Website ka taaruf (har nayi baat-cheet ke shuru mein)

```
You are helping me manage my business website. Details:
- Website: printypackaging.com (custom packaging company: boxes, butter paper, labels)
- Built with Next.js 16 (App Router, TypeScript, Tailwind), hosted on Vercel
- Code on GitHub: jahangirjan397-lang/printypackaging (main branch = live site)
- Content is edited in Decap CMS at /admin. Content files are in the /content folder:
  blogs in content/blogs/*.json, product galleries in content/product-images.json,
  business info in content/settings/*.json
- Quote form sends leads to email (Hostinger SMTP) and to a Google Sheet (Apps Script)
- Domain and business email are on Hostinger
I am not a programmer. Explain step by step in simple English (Roman Urdu is fine).
Never ask me for passwords or secret keys.
```

## Prompt 2 – Blog likhwana (insaan jaisa)

```
Write a blog post for my packaging company website about: [TOPIC]
Target buyers: [e.g. small candle brands in the USA]
My real experience to include: [2-3 real facts, numbers or customer stories]
Rules:
- Sound like a real packaging expert talking, not like AI. Short and long sentences mixed.
- Do NOT use: elevate, seamless, unlock, game-changer, delve, "in today's world", "in conclusion".
- Give: a title (50-65 chars), a URL slug, a 150-character summary, 6-8 SEO keywords,
  5-7 sections (heading + text), one table if useful (rows with | between cells),
  and 4 FAQs with answers.
- About 900-1200 words. End with a friendly line inviting them to request a quote.
```
Phir jawab ke hisse admin ke **+ Blog** mein khanon mein paste karein, aur apne alfaaz mein 10-20% badlein.

## Prompt 3 – Vercel build error

```
My Vercel deployment failed. Here are the red error lines from the build log:
[PASTE ERROR LINES]
The last change I made in the Decap CMS admin was: [what you changed]
Tell me in simple steps what is wrong and how to fix it from the admin panel
(or exactly which file on GitHub to edit and what to change).
```

## Prompt 4 – Koi masla samajhna

```
On my website [PAGE LINK] I see this problem: [describe, add a screenshot if the AI allows]
What could cause it and how can I fix it myself, step by step?
```

## Prompt 5 – Backlink ke liye email

```
Write a short, friendly email to [WEBSITE / BLOG NAME] asking if they accept a guest
article about [TOPIC] for their readers. I run Printy Packaging (printypackaging.com),
a custom packaging company. Keep it under 120 words, not salesy, and suggest 2 article ideas.
```

## Prompt 6 – Product description ya page ka text

```
Improve this text for my [PRODUCT] page so it is clear for US/UK buyers and good for SEO.
Keep facts the same, do not invent prices or claims: [PASTE TEXT]
```

## Prompt 7 – Code ki tabdeeli (developer jaisa kaam)

```
[Paste Prompt 1 first]
I want to change: [describe the change]
Tell me exactly which file on GitHub to edit, show the exact old text and the exact new text,
and tell me how to check it worked. Keep the change as small as possible.
```
Code GitHub website par hi edit ho sakta hai: file kholein, pencil (✏️) dabayein, tabdeeli karein, phir **Commit changes**. Vercel khud website update kar dega. Bari tabdeeli se pehle kisi developer se check karwayein.

---

**Yaad rakhein:** AI kabhi kabhi ghalat bhi batata hai. Koi bhi tabdeeli karne se pehle soch lein, aur ghalti ho jaye to **Troubleshooting** guide ke #2 se wapas le sakte hain.
