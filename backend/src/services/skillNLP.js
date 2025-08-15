// Simple NLP utilities for skill extraction and gap scoring
// No external dependencies; uses a curated skill catalog and frequency-based weighting.

const SKILL_CATALOG = [
  // Engineering
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Express', 'Next.js', 'HTML', 'CSS', 'GraphQL', 'Redux',
  'Python', 'Django', 'Flask', 'FastAPI', 'Java', 'Spring', 'Kotlin', 'Go', 'C#', 'ASP.NET',
  'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis',
  'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Terraform', 'CI/CD',
  // Data/ML
  'NumPy', 'Pandas', 'scikit-learn', 'TensorFlow', 'PyTorch', 'Data Analysis', 'Machine Learning', 'NLP',
  // DevOps
  'Git', 'Jenkins', 'Github Actions', 'Ansible',
  // Marketing
  'SEO', 'Google Ads', 'Analytics', 'Content Marketing', 'Marketing Automation', 'A/B Testing', 'CRM',
]

const BOOST_WORDS = [
  // Strong requirement boosters
  'must', 'required', 'need', 'mandatory', 'proficient', 'expert', 'strong', 'deep',
  // Nice-to-have
  'plus', 'preferred', 'nice', 'bonus', 'familiar',
]

function normalize(text = '') {
  return String(text).toLowerCase()
}

function tokenize(text = '') {
  // Keep alphanumerics, dots and hashes for tech terms (e.g., Node.js, C#) and split on non-word-ish boundaries
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9#+./\s-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
}

function containsTerm(textNorm, term) {
  // match term in a case-insensitive way; allow dots and plus in catalog terms
  const safe = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const rx = new RegExp(`(^|[^a-z0-9+#.])${safe.toLowerCase()}($|[^a-z0-9+#.])`, 'i')
  return rx.test(textNorm)
}

export function extractRequiredSkills(jobDescription = '') {
  const norm = normalize(jobDescription)
  const tokens = tokenize(jobDescription)

  const counts = new Map()
  const boosts = new Map()

  // Count occurrences of catalog skills
  for (const skill of SKILL_CATALOG) {
    if (containsTerm(norm, skill)) {
      // frequency approximation: count token matches for first token of skill
      const first = skill.toLowerCase().split(/\s|\./)[0]
      const freq = tokens.filter((t) => t === first).length || 1
      counts.set(skill, (counts.get(skill) || 0) + freq)
    }
  }

  // Boost weights if booster words appear near skills (simple heuristic)
  const window = 8
  for (let i = 0; i < tokens.length; i++) {
    if (BOOST_WORDS.includes(tokens[i])) {
      const start = Math.max(0, i - window)
      const end = Math.min(tokens.length, i + window)
      const span = tokens.slice(start, end).join(' ')
      for (const skill of SKILL_CATALOG) {
        if (containsTerm(span, skill)) {
          boosts.set(skill, (boosts.get(skill) || 0) + 1)
        }
      }
    }
  }

  // Build scored list
  const scored = Array.from(counts.entries()).map(([skill, c]) => {
    const b = boosts.get(skill) || 0
    // base weight = frequency + 2*boosts
    const weight = c + 2 * b
    return { skill, weight }
  })

  // Sort by weight desc and cap to top 12
  scored.sort((a, b) => b.weight - a.weight)
  const top = scored.slice(0, 12)

  return {
    skills: top.map((s) => s.skill),
    scored: top,
  }
}

export function computeGaps(currentSkills = [], requiredScored = []) {
  // Normalize for comparison
  const cur = new Set(currentSkills.map((s) => s.toLowerCase()))

  return requiredScored.map(({ skill, weight }) => {
    const has = cur.has(skill.toLowerCase())
    // Map weight (>=4 => High, >=2 => Medium, else Low)
    const priority = weight >= 4 ? 'High' : weight >= 2 ? 'Medium' : 'Low'
    const required = 60 + Math.min(35, weight * 5) // 60..95 based on weight
    const proficiency = has ? 40 : 0 // simple assumption; could be refined with history later
    return { skill, priority, proficiency, required }
  })
}

export function computeOverallScore(currentSkills = [], requiredSkills = []) {
  if (!requiredSkills.length) return 0
  const cur = new Set(currentSkills.map((s) => s.toLowerCase()))
  const matches = requiredSkills.filter((s) => cur.has(s.toLowerCase())).length
  return Math.round((matches / requiredSkills.length) * 100)
}

export function recommendCourses(requiredSkills = []) {
  const recs = []
  for (const skill of requiredSkills.slice(0, 5)) {
    recs.push({
      skill,
      course: `${skill} Essentials`,
      provider: 'SkillHub',
      duration: '4-6 weeks',
      url: '#',
    })
  }
  return recs
}
