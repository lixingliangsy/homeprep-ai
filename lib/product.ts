export interface InputField {
  key: string
  label: string
  type: 'input' | 'text' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "HomePrep AI",
  slug: "homeprep-ai",
  productId: "PROD_2MTKBvvZUfp1sK13MPodBN",
  priceMonthly: 15,
  yearlyProductId: "PROD_3sA9HAP8VVUyPQ6RdXTwGT",
  priceYearly: 150,

  checkoutUrl: "https://pancake.waffo.ai/store/lixingliang-ai-tools-6cilbw8v/checkout/cs_648d5098-5cc5-547e-282e-17efb67dcd91",
  tagline: "Staging and prep tips that get homes photos-ready.",
  description: "From your home type and timeline, get a prioritized prep checklist: what to fix, declutter, and stage before photos and showings.",
  toolTitle: "Get a prep plan",
  resultLabel: "Your prep plan",
  ctaLabel: "Get plan",
  features: [
  "Prioritized checklist",
  "Before-photos tips",
  "Budget-friendly",
  "Timeline-based"
],
  inputs: [
  {
    "key": "homeType",
    "label": "Home type",
    "type": "select",
    "options": [
      "House",
      "Condo",
      "Townhouse"
    ]
  },
  {
    "key": "timeline",
    "label": "Timeline",
    "type": "select",
    "options": [
      "Under 1 week",
      "2-4 weeks",
      "1-2 months"
    ]
  },
  {
    "key": "budget",
    "label": "Budget",
    "type": "select",
    "options": [
      "Low",
      "Medium",
      "Any"
    ]
  },
  {
    "key": "focus",
    "label": "Focus",
    "type": "select",
    "options": [
      "Photos",
      "Showings",
      "Both"
    ]
  }
] as InputField[],
  definitionLead: "HomePrep AI turns your home type and timeline into a prioritized prep checklist — what to fix, declutter, and stage before photos and showings — so the listing photographs well.",
  geoFaq: [
    { q: "What is HomePrep AI?", a: "HomePrep AI is a tool that turns your home type and timeline into a prioritized prep checklist for photos and showings." },
    { q: "What does the checklist cover?", a: "What to fix, declutter, and stage, prioritized by impact on presentation." },
    { q: "Is it expensive to follow?", a: "The tips are budget-friendly, favoring low-cost prep over renovations." },
    { q: "Does it fit my schedule?", a: "It is timeline-based so the plan matches the days you have before photos." },
    { q: "Who should use it?", a: "Homeowners and agents who want a photo-ready prep plan without a full stager." },
    { q: "Does it help with before-photos?", a: "It includes before-photos tips so you capture the home at its best." },
  ],
  systemPrompt: "You are a home-staging consultant. Given a home type, a timeline, a budget level, and a focus (photos/showings/both), produce a prioritized prep checklist: the top fixes, what to declutter, and how to stage for the focus, scaled to the timeline and budget. Lead with the highest-impact, lowest-cost moves. In demo mode, return a realistic sample following this structure.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "4 plans/mo"
  },
  {
    "tier": "Pro",
    "price": "$15/mo",
    "desc": "Unlimited, save history"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const ht = inputs['homeType'] || 'House'
  const tl = inputs['timeline'] || '2-4 weeks'
  const bd = inputs['budget'] || 'Medium'
  const fc = inputs['focus'] || 'Both'
  let out = 'HOME PREP PLAN (' + ht + ' | ' + tl + ' | budget: ' + bd + ' | focus: ' + fc + ')\n\n'
  out += 'DO FIRST (high impact, low cost)\n'
  out += '- Declutter surfaces; pack away personal photos\n'
  out += '- Deep-clean kitchen and bath; fix leaky fixtures\n'
  if (fc === 'Photos' || fc === 'Both') out += '- Open blinds, add 1 neutral throw pillow per room for the shoot\n'
  if (fc === 'Showings' || fc === 'Both') out += '- Stage one "life" moment (book on a chair, coffee mugs) for visits\n'
  out += '\nIF TIME/BUDGET ALLOW\n'
  out += '- ' + (bd === 'Low' ? 'Rent a rug to warm a bare room' : 'Paint one tired wall in a neutral tone') + '\n\n'
  out += '\n--- (Mock demo. Add home type + timeline for a tailored plan.)'
  return out
}
}
