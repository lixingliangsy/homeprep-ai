export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "HomePrep AI",
  slug: "homeprep-ai",
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
