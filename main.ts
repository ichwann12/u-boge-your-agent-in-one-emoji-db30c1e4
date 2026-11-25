import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The entry lives in entry.txt as data, not code: this program only
// copies it verbatim into the grader's output directory. Trimming
// strips only the trailing newline, never part of the emoji itself.
const repoRoot = dirname(fileURLToPath(import.meta.url));
const entry = readFileSync(join(repoRoot, "entry.txt"), "utf8").trim();

// One emoji: a single Unicode code point, nothing else.
if ([...entry].length !== 1) {
  throw new Error(`entry must be exactly one emoji, got ${JSON.stringify(entry)}`);
}

const outputDir =
  process.env.MAKEFUN_OUTPUT_DIR ??
  process.env.MAKEFUN_BOT_DIR ??
  join(repoRoot, "output");

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), entry, "utf8");
