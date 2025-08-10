import { promises as fs } from 'node:fs'
import path from 'node:path'

async function walkDirectory(directoryPath: string): Promise<string[]> {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') {
        continue
      }
      files.push(...(await walkDirectory(fullPath)))
    } else {
      files.push(fullPath)
    }
  }

  return files
}

async function countFileLines(filePath: string): Promise<number> {
  const content = await fs.readFile(filePath, 'utf8')
  if (content.length === 0) return 0
  return content.replace(/\r\n/g, '\n').split('\n').length
}

async function ensureDir(dirPath: string): Promise<void> {
  try {
    await fs.mkdir(dirPath, { recursive: true })
  } catch {
    // ignore
  }
}

async function main(): Promise<void> {
  const projectRoot = process.cwd()
  const srcDir = path.join(projectRoot, 'src')
  const publicDir = path.join(projectRoot, 'public')

  const allFiles = await walkDirectory(srcDir)
  let totalLines = 0

  for (const file of allFiles) {
    // Skip binary-ish large assets by extension if any
    const ext = path.extname(file).toLowerCase()
    if (['.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico'].includes(ext)) continue
    totalLines += await countFileLines(file)
  }

  const output = {
    codeLines: totalLines,
    updatedAt: new Date().toISOString(),
  }

  await ensureDir(publicDir)
  await fs.writeFile(path.join(publicDir, 'stats.json'), JSON.stringify(output, null, 2), 'utf8')
  console.log(`Wrote ${output.codeLines} lines to public/stats.json`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})


