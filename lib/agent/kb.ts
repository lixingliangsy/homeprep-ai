import type { KbEntry } from "../support-kit/types";
export type { KbEntry };

export const KB: KbEntry[] = [
  {
    id: "what",
    title: "What HomePrep AI does",
    keywords: ["HomePrep AI", "homeprep-ai", "what", "product", "about", "Staging and prep tips that get homes photos-ready."],
    body: "Staging and prep tips that get homes photos-ready.. HomePrep AI turns your home type and timeline into a prioritized prep checklist — what to fix, declutter, and stage before photos and showings — so the listing photographs well.",
    source: "HomePrep AI product definition",
    tags: [],
  },
  {
    id: "features",
    title: "HomePrep AI features",
    keywords: ["features", "feature", "can", "does", "Prioritized checklist", "Before-photos tips", "Budget-friendly", "Timeline-based"],
    body: "HomePrep AI includes: Prioritized checklist; Before-photos tips; Budget-friendly; Timeline-based. It does not add capabilities that are not listed here.",
    source: "HomePrep AI feature list",
    tags: [],
  },
  {
    id: "pricing",
    title: "HomePrep AI pricing",
    keywords: ["price", "pricing", "plan", "cost", "billing", "subscription", "monthly", "yearly"],
    body: "Listed prices for HomePrep AI: $15/month and $150/year. Checkout uses the in-app checkout route. This assistant cannot change a subscription or issue a refund.",
    source: "HomePrep AI pricing fields",
    tags: [],
  },
  {
    id: "howto",
    title: "How to use HomePrep AI",
    keywords: ["how", "start", "use", "tool", "run", "Get a prep plan"],
    body: "Open HomePrep AI and use Get a prep plan. The form asks for: Home type; Timeline; Budget; Focus.",
    source: "HomePrep AI tool fields",
    tags: [],
  },
  {
    id: "faq-1",
    title: "What is HomePrep AI?",
    keywords: ["What", "is", "HomePrep", "AI?"],
    body: "HomePrep AI is a tool that turns your home type and timeline into a prioritized prep checklist for photos and showings.",
    source: "HomePrep AI FAQ",
    tags: [],
  },
  {
    id: "faq-2",
    title: "What does the checklist cover?",
    keywords: ["What", "does", "the", "checklist", "cover?"],
    body: "What to fix, declutter, and stage, prioritized by impact on presentation.",
    source: "HomePrep AI FAQ",
    tags: [],
  },
  {
    id: "faq-3",
    title: "Is it expensive to follow?",
    keywords: ["Is", "it", "expensive", "to", "follow?"],
    body: "The tips are budget-friendly, favoring low-cost prep over renovations.",
    source: "HomePrep AI FAQ",
    tags: [],
  },
  {
    id: "honesty",
    title: "What this assistant will not claim",
    keywords: ["legal", "advice", "guarantee", "demo", "human", "refund", "support"],
    body: "Answers about HomePrep AI are decision support only, not legal, tax, accessibility-certification, or compliance sign-off. This assistant does not invent integrations, SSO, CSV export, or Slack connections unless they are already in the product description. If live AI is unavailable, the product must not pretend a demo result is live. Say you want a human and leave an email if you need a person.",
    source: "HomePrep AI support policy",
    tags: ["compliance"],
  },
];

function normalize(s: string): string {
  return (s || "").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ");
}
function toWords(s: string): string[] {
  return normalize(s).split(/\s+/).map((w) => w.trim()).filter(Boolean);
}
function cjkBigrams(s: string): string[] {
  const grams: string[] = [];
  const han = /[\u4e00-\u9fff]/;
  for (const w of toWords(s)) {
    if (han.test(w) && w.length >= 2) {
      for (let i = 0; i < w.length - 1; i++) grams.push(w.slice(i, i + 2));
    }
  }
  return grams;
}
function scoreEntry(entry: KbEntry, query: string): number {
  const q = normalize(query);
  const qWords = new Set(toWords(q));
  const qGrams = new Set(cjkBigrams(q));
  let s = 0;
  for (const kw of entry.keywords) {
    const k = kw.toLowerCase();
    if (q.includes(k)) s += 3;
  }
  for (const tw of toWords(entry.title)) {
    if (qWords.has(tw)) s += 2;
  }
  const idx = normalize(entry.keywords.join(" ") + " " + entry.title + " " + entry.body.slice(0, 400));
  for (const g of qGrams) if (idx.includes(g)) s += 0.5;
  return s;
}

export interface RetrieveResult {
  entries: KbEntry[];
  topScore: number;
}

export function retrieve(query: string, topK = 4, entries: KbEntry[] = KB): RetrieveResult {
  const scored = entries
    .map((e) => ({ e, s: scoreEntry(e, query) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, topK);
  return { entries: scored.map((x) => x.e), topScore: scored.length ? scored[0].s : 0 };
}

export function isComplianceRelated(entries: KbEntry[]): boolean {
  return entries.some((e) => e.tags.includes("compliance"));
}
