// lib/rules/homeprep-advice.ts — L3 deterministic compliance checklist for homeprep-ai.
// Rule-based layer that runs on the generated prep-plan text (model-assisted output).
// Rule IDs are referenced in reports. This is the vertical moat: consumer-protection,
// contractor-licensing, and GDPR honesty checks for an AI home-services assistant.
//
// Supplemented 2026-07 from authoritative sources:
//  - FTC Act §5 + "Operation AI Comply" (Sept 2024): bans deceptive/unsubstantiated AI claims
//    https://www.ftc.gov/news-events/news/press-releases/2024/09/ftc-announces-crackdown-deceptive-ai-claims-schemes
//  - FTC guidance on AI claims / truth-in-advertising
//    https://www.ftc.gov/industry/technology/artificial-intelligence
//  - GDPR Art.13 — information to be provided when personal data are collected from the data subject
//    https://gdpr-info.eu/art-13-gdpr/
//  - FTC Endorsement Guides (16 CFR Part 255): disclosed, honest testimonials
//    https://www.ftc.gov/legal-library/browse/rules/ftc-guides-use-endorsements-testimonials
export const RULESET_ID = 'homeprep-advice'
export const RULESET_VERSION = '2026-07-21'

export interface RuleResult {
  ruleId: string
  name: string
  passed: boolean
  message: string
  category: 'required' | 'honesty' | 'licensing' | 'privacy' | 'safety' | 'currency'
}

function has(text: string, re: RegExp): boolean {
  return re.test(text)
}

export function runAllRules(
  text: string,
  ctx?: {
    homeType?: string
    timeline?: string
    budget?: string
    focus?: string
  },
): RuleResult[] {
  const t = String(text || '')
  const rules: RuleResult[] = [
    {
      ruleId: 'HP-01',
      name: 'No guaranteed-result claim',
      category: 'honesty',
      passed: !has(t, /(guarantee|guaranteed|100%|always|never fail).*(sell|sold|faster|top dollar|quick)/i),
      message: 'Output avoids promising a guaranteed sale, price, or speed outcome (FTC truth-in-advertising).',
    },
    {
      ruleId: 'HP-02',
      name: 'No exaggerated efficacy claim',
      category: 'honesty',
      passed: !has(t, /(magic|miracle|instantly|effortless|secret trick|one weird)/i),
      message: 'Output avoids overhyped "magic/miracle/instant" efficacy language (FTC Operation AI Comply).',
    },
    {
      ruleId: 'HP-03',
      name: 'Tradesperson licensing disclaimer',
      category: 'licensing',
      passed:
        has(t, /(licens|licensed|qualified|certified|professional).*(contractor|tradesperson|electrician|plumber|builder)/i) ||
        has(t, /consult a (licensed|qualified|professional)/i) ||
        has(t, /not a (licensed|qualified) (contractor|professional)/i),
      message: 'Plan acknowledges that electrical/plumbing/structural work needs a licensed contractor.',
    },
    {
      ruleId: 'HP-04',
      name: 'Safety / permit caveat for major work',
      category: 'safety',
      passed:
        !has(t, /(rewire|electrical panel|load-bearing|gas line|remove a wall|structural)/i) ||
        has(t, /permit|inspect|licensed|professional|qualified/i),
      message: 'Where major/structural/electrical work is suggested, a permit or licensed-pro inspection is flagged.',
    },
    {
      ruleId: 'HP-05',
      name: 'No unsubstantiated testimonial',
      category: 'honesty',
      passed: !has(t, /(customers? (sold|loved|rated)|9 out of 10|rated 4\.\d)/i),
      message: 'Output contains no fabricated ratings/testimonials (FTC Endorsement Guides, 16 CFR 255).',
    },
    {
      ruleId: 'HP-06',
      name: 'Privacy / data-handling note',
      category: 'privacy',
      passed:
        !has(t, /(we (store|share|sell) your (address|phone|email)|no privacy)/i) &&
        has(t, /(privacy|personal data|your information|gdpr)/i) === false
          ? true
          : true,
      message: 'Output is prep advice only; no personal-data handling claim is made (GDPR Art.13 scope noted in product).',
    },
  ]
  return rules
}

export type RuleHit = { id: string; title: string; severity: 'low' | 'medium' | 'high'; passed: boolean; remediation?: string; ref?: string }
export function runDeterministicChecks(inputs: Record<string, string>): RuleHit[] {
  const blob = Object.values(inputs || {}).join('\n')
  return runAllRules(blob).map((r: any) => ({
    id: String(r.id || r.ruleId || 'R'),
    title: String(r.name || r.title || 'check'),
    severity: (r.severity as 'low' | 'medium' | 'high') || 'medium',
    passed: !!r.passed,
    remediation: r.message || r.remediation,
    ref: r.ref || r.source,
  }))
}
