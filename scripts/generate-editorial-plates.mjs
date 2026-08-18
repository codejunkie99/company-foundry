import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const out = join(import.meta.dirname, '..', 'assets', 'editorial')
mkdirSync(out, { recursive: true })

const plates = [
  ['01-first-principles', 'HARNESS MAP · 6 RESPONSIBILITIES · 1 SHARED SYSTEM', 'An agent is six jobs, not one black box.', 'composition', 'state', 'context', 'execution', 'recovery', 'surfaces', 'The model only occupies one station.', 'Every station has a named owner.'],
  ['02-deepseek-harness', 'RUNTIME MAP · PLUGINS · SERVICES · FIBERS', 'The harness is a reversible service graph.', 'profile patch', 'Cordis context', 'service seam', 'provider', 'agent loop', 'event log', 'Change a provider without changing the method.', 'The company defines work. The runtime enforces it.'],
  ['03-work-not-intelligence', 'WORK DESIGN · 5 HIDDEN JOBS · 1 DECISION', 'A stronger model cannot repair vague work.', 'outcome', 'evidence', 'interpretation', 'artifact', 'approval', 'decision', 'The unit is a packet, not a department.', 'Make work legible before making it automatic.'],
  ['04-closed-loop', 'OPERATING LOOP · 6 STAGES · 1 FEEDBACK PATH', 'Work only closes when a decision is recorded.', 'brief', 'evidence', 'route', 'artifact', 'review', 'decision', 'A result without sources is not complete.', 'The next packet starts with the last receipt.'],
  ['05-customer-evidence', 'EVIDENCE MAP · INTERNAL + EXTERNAL · CLAIM LEDGER', 'Customer research needs a company memory.', 'interviews', 'tickets', 'usage data', 'market', 'claim ledger', 'decision frame', 'Observed fact and interpretation stay separate.', 'Unknown is a valid and useful output.'],
  ['06-model-router', 'MODEL ROUTE · 3 LANES · 1 RECEIPT', 'Route the task, not the company.', 'economy', 'fast', 'capable', 'Kimi K3', 'fallback', 'receipt', 'Every route records cost, speed, and reason.', 'The capability request survives provider change.'],
  ['07-skill-registry', 'SKILL FILE · FRONTMATTER · PROCEDURE · REVIEW', 'A skill file is an executable contract.', 'frontmatter', 'inputs', 'procedure', 'artifact', 'review', 'stop rule', 'Skills carry inputs, checks, owner, and stop rule.', 'A prompt becomes a skill when it can be reviewed.'],
  ['08-artifact-lineage', 'ARTIFACT LINEAGE · INPUT → REVIEW → ACTION', 'The work must outlive the chat.', 'packet', 'sources', 'skill v.', 'route', 'artifact', 'review', 'Every artifact points back to its evidence.', 'A dashboard is a decision surface, not decoration.'],
  ['09-authority-gates', 'AUTHORITY LADDER · 4 LEVELS · DEFAULT: PREPARE', 'Access is not authority.', 'observe', 'prepare', 'commit', 'emit', 'policy', 'audit log', 'A skill can request authority, never grant it.', 'The default creates drafts, not consequences.'],
  ['10-control-plane', 'SYSTEM BOUNDARY · METHOD · RUNTIME · CONTROL PLANE', 'The harness executes. The control plane coordinates.', 'company method', 'work packet', 'runtime', 'tools', 'control plane', 'surfaces', 'Keep the portable procedure above the runtime.', 'The UI is a view of work, not the work itself.'],
  ['11-first-workflow', 'FIRST RUN · 7 STEPS · 1 REAL WORKFLOW', 'Start with one repeatable decision.', 'brief', 'packet', 'research', 'route', 'artifact', 'review', 'Choose work that happens twice a month.', 'Earn autonomy through a second trusted run.'],
  ['12-measurement', 'OPERATING METRICS · QUALITY · TIME · COST', 'Measure decisions, not output volume.', 'cycle time', 'source rate', 'rework', 'latency', 'cost', 'correction', 'A cheap answer nobody trusts is expensive.', 'Track where human judgement enters the loop.'],
  ['13-failure-modes', 'FAILURE MAP · 5 DESIGN ERRORS · 1 RESPONSE', 'Most harness failures are organisational.', 'vague role', 'bad context', 'late review', 'empty UI', 'too much authority', 'freeze + fix', 'Find the first broken boundary.', 'Do not ask the model to compensate for a missing system.'],
  ['14-operating-cadence', 'CADENCE · WEEKLY · MONTHLY · QUARTERLY', 'A registry gets smaller as it gets better.', 'weekly run', 'blocked work', 'skill review', 'route eval', 'incident path', 'version', 'Retire duplicate procedure before adding one.', 'A harness is an operating system, not a launch.'],
  ['15-harness-company', 'COMPANY MAP · METHOD + RUNTIME + HUMAN JUDGEMENT', 'The company itself becomes the harness.', 'brief', 'skill', 'route', 'artifact', 'authority', 'learning', 'The product is executable organisational design.', 'More agents is not the goal. Better work is.'],
]

const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const sans = 'Helvetica Neue, Arial, sans-serif'
const mono = '.SF NS Mono, SFMono-Regular, Menlo, monospace'
const text = (x, y, value, size, weight = 400, fill = '#101828', anchor = 'start', family = sans) => `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(value)}</text>`

function plate(data, index) {
  const [slug, eyebrow, title, ...rest] = data
  const blocks = rest.slice(0, 6)
  const [insight, proof] = rest.slice(6)
  const x0 = 78, y = 360, w = 196, gap = 48
  const cards = blocks.map((label, i) => {
    const x = x0 + i * (w + gap)
    const accent = i === 3 ? '#2563eb' : '#111827'
    return `
      <g>
        <rect x="${x}" y="${y}" width="${w}" height="174" rx="11" fill="${i === 3 ? '#edf4ff' : '#ffffff'}" stroke="${accent}" stroke-width="${i === 3 ? 3 : 1.5}"/>
        <rect x="${x + 20}" y="${y + 21}" width="42" height="30" rx="7" fill="${i === 3 ? '#d7e7ff' : '#f1f5f9'}"/>
        ${text(x + 41, y + 43, String(i + 1).padStart(2, '0'), 15, 700, i === 3 ? '#1d4ed8' : '#475569', 'middle', mono)}
        <rect x="${x + 72}" y="${y + 27}" width="58" height="8" rx="4" fill="${accent}" opacity="${i === 3 ? 1 : 0.72}"/>
        <rect x="${x + 72}" y="${y + 43}" width="40" height="8" rx="4" fill="#a8a8a8"/>
        ${text(x + w / 2, y + 118, label, 22, 700, '#151515', 'middle')}
        ${text(x + w / 2, y + 146, i === 3 ? 'written gate' : 'named stage', 13, 500, '#64748b', 'middle', mono)}
      </g>`
  }).join('')
  const arrows = blocks.slice(0, -1).map((_, i) => {
    const x = x0 + w + i * (w + gap)
    return `<path d="M${x + 10} ${y + 87}H${x + gap - 8}" stroke="#2563eb" stroke-width="4" marker-end="url(#arrow)"/>`
  }).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000" role="img" aria-labelledby="title-${index} desc-${index}">
  <title id="title-${index}">${esc(title)}</title><desc id="desc-${index}">${esc(eyebrow)}. ${esc(insight)} ${esc(proof)}</desc>
  <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#2563eb"/></marker></defs>
  <rect width="1600" height="1000" fill="#f6f9ff"/>
  <rect x="46" y="40" width="1508" height="920" rx="18" fill="#fcfdff" stroke="#cbd5e1" stroke-width="2"/>
  ${text(78, 92, eyebrow, 17, 700, '#52637c', 'start', mono)}
  <rect x="78" y="130" width="${Math.min(1130, title.length * 28)}" height="76" rx="28" fill="#dceaff"/>
  ${text(78, 187, title, 52, 700)}
  ${text(78, 242, 'A company harness turns an explicit operating rule into visible work, evidence, and a human decision.', 23, 400, '#52637c')}
  <line x1="78" y1="292" x2="1522" y2="292" stroke="#cbd5e1" stroke-width="2"/>
  ${text(78, 325, 'EXECUTION PATH · STAGES MOVE LEFT TO RIGHT', 15, 700, '#52637c', 'start', mono)}
  <rect x="${x0 + 3 * (w + gap) - 24}" y="328" width="${w + 48}" height="236" rx="14" fill="#f2f7ff" stroke="#2563eb" stroke-width="2" stroke-dasharray="9 8"/>
  ${cards}${arrows}
  <rect x="78" y="602" width="1444" height="144" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  ${text(106, 641, 'WRITTEN GATE', 15, 700, '#1d4ed8', 'start', mono)}
  <rect x="106" y="664" width="482" height="44" rx="9" fill="#f8fbff" stroke="#bfdbfe" stroke-width="1.5"/>
  ${text(128, 693, 'required record  →  reviewed  →  unlocked', 18, 500, '#1e293b', 'start', mono)}
  <line x1="637" y1="622" x2="637" y2="727" stroke="#cbd5e1" stroke-width="2"/>
  ${text(670, 641, 'PARALLEL LANE', 15, 700, '#52637c', 'start', mono)}
  <rect x="670" y="664" width="420" height="44" rx="9" fill="#14213d"/>
  ${text(690, 693, 'draft, inspect, and improve in parallel', 15, 500, '#ffffff', 'start', mono)}
  <line x1="1140" y1="622" x2="1140" y2="727" stroke="#cbd5e1" stroke-width="2"/>
  ${text(1172, 641, 'SYSTEM CLAIM', 15, 700, '#52637c', 'start', mono)}
  ${text(1172, 686, insight, 18, 700, '#151515')}
  <rect x="78" y="782" width="704" height="132" rx="13" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  ${text(110, 824, 'COST OF A MISTAKE', 15, 700, '#52637c', 'start', mono)}
  ${text(110, 875, 'A clear boundary makes correction cheap.', 28, 700)}
  <rect x="818" y="782" width="704" height="132" rx="13" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  ${text(850, 824, 'EXIT CONDITION', 15, 700, '#52637c', 'start', mono)}
  ${text(850, 875, proof, 25, 700)}
  ${text(78, 940, `HARNESS COMPANY · VISUAL ${String(index).padStart(2, '0')} / ${String(plates.length).padStart(2, '0')}`, 15, 700, '#52637c', 'start', mono)}
</svg>`
}

for (const [index, data] of plates.entries()) {
  writeFileSync(join(out, `${data[0]}.svg`), plate(data, index + 1))
}

console.log(`Wrote ${plates.length} editorial SVG plates to ${out}`)
