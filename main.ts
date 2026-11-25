// One Word, First Thought (u-0xkianno-one-word-first-thought-106abaf8)
// Guard + hand-in program: reads entry.txt beside this file, validates it is
// exactly one word of letters only (no spaces, no punctuation), prints the
// word, its letter count and the remaining character budget, and writes it
// to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt). The sealed
// scorer requires UTF-8 text of 1 to 24 characters, not only whitespace.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_CHARS = 24;

const here = dirname(fileURLToPath(import.meta.url));
const entryPath = join(here, "entry.txt");
const raw = readFileSync(entryPath, "utf8");
const word = raw.replace(/\r?\n$/, "");

function fail(message: string): never {
  console.error(`entry rejected: ${message}`);
  process.exit(1);
}

if (word.length === 0) fail("entry is empty");
if (word.trim() !== word || /\s/.test(word)) {
  fail("entry must be a single word with no spaces");
}
if (!/^[A-Za-z]+$/.test(word)) {
  fail("entry must contain letters only (no punctuation or digits)");
}
if (word.length > MAX_CHARS) {
  fail(`entry is ${word.length} letters; the gate limit is ${MAX_CHARS}`);
}

console.log(word);
console.log(`letters: ${word.length}`);
console.log(`budget: ${MAX_CHARS - word.length} of ${MAX_CHARS} characters left`);
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), word);
console.log(`written: ${join(outDir, "entry.txt")}`);
