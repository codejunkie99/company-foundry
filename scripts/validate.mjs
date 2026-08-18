import { readdir, readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const skillRoot = join(root, 'skills')
const assetRoot = join(root, 'assets')

async function filesNamed(dir, name) {
  const found = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) found.push(...await filesNamed(path, name))
    if (entry.isFile() && entry.name === name) found.push(path)
  }
  return found
}

const registry = await readFile(join(root, 'registry/company-harness.yml'), 'utf8')
const skills = await filesNamed(skillRoot, 'SKILL.md')
const svgs = (await readdir(assetRoot)).filter(file => file.endsWith('.svg'))

if ((registry.match(/^  - name:/gm) ?? []).length !== 7) throw new Error('registry must declare seven skills')
if (skills.length !== 7) throw new Error(`expected seven portable skills, found ${skills.length}`)
if (svgs.length !== 11) throw new Error(`expected eleven SVG assets, found ${svgs.length}`)

for (const file of skills) {
  const source = await readFile(file, 'utf8')
  if (!/^---\nname: .+\ndescription: .+\n---\n/m.test(source)) throw new Error(`invalid skill frontmatter: ${file}`)
}

for (const file of svgs) {
  const source = await readFile(join(assetRoot, file), 'utf8')
  if (!source.includes('<svg') || !source.includes('</svg>')) throw new Error(`invalid SVG: ${file}`)
}

for (const path of [
  join(root, 'presets/deepseek-harness/company-research/agent.cordis.yml'),
  join(root, 'presets/deepseek-harness/company-builder/agent.cordis.yml'),
]) await stat(path)

console.log(`validated ${skills.length} skills and ${svgs.length} SVG assets`)
