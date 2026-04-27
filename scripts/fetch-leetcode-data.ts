// Fetches all 35 problems' data from LeetCode GraphQL and saves to src/data/leetcode-problems.json
// Run: npx tsx scripts/fetch-leetcode-data.ts

import { promises as fs } from "fs";
import path from "path";

const SLUGS: Record<number, string> = {
  1: "two-sum",
  2: "add-two-numbers",
  3: "longest-substring-without-repeating-characters",
  11: "container-with-most-water",
  20: "valid-parentheses",
  21: "merge-two-sorted-lists",
  33: "search-in-rotated-sorted-array",
  39: "combination-sum",
  46: "permutations",
  56: "merge-intervals",
  78: "subsets",
  79: "word-search",
  98: "validate-binary-search-tree",
  102: "binary-tree-level-order-traversal",
  121: "best-time-to-buy-and-sell-stock",
  141: "linked-list-cycle",
  146: "lru-cache",
  155: "min-stack",
  198: "house-robber",
  200: "number-of-islands",
  206: "reverse-linked-list",
  207: "course-schedule",
  208: "implement-trie-prefix-tree",
  211: "design-add-and-search-words-data-structure",
  215: "kth-largest-element-in-an-array",
  217: "contains-duplicate",
  226: "invert-binary-tree",
  236: "lowest-common-ancestor-of-a-binary-tree",
  238: "product-of-array-except-self",
  239: "sliding-window-maximum",
  322: "coin-change",
  347: "top-k-frequent-elements",
  424: "longest-repeating-character-replacement",
  704: "binary-search",
  739: "daily-temperatures",
};

const QUERY = `query q($s: String!) {
  question(titleSlug: $s) {
    questionId
    questionFrontendId
    title
    titleSlug
    difficulty
    content
    exampleTestcases
    sampleTestCase
    codeSnippets { lang langSlug code }
    topicTags { name slug }
    hints
    similarQuestions
    stats
  }
}`;

async function fetchProblem(slug: string): Promise<any> {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com",
      "User-Agent": "Mozilla/5.0",
    },
    body: JSON.stringify({ query: QUERY, variables: { s: slug } }),
  });
  if (!res.ok) throw new Error(`LeetCode GraphQL failed: ${res.status}`);
  const json = await res.json();
  if (!json.data?.question) {
    throw new Error(`No question data for ${slug}: ${JSON.stringify(json).slice(0, 200)}`);
  }
  return json.data.question;
}

async function main() {
  const out: Record<number, any> = {};
  const entries = Object.entries(SLUGS);
  for (let i = 0; i < entries.length; i++) {
    const [id, slug] = entries[i];
    process.stdout.write(`[${i + 1}/${entries.length}] ${slug}... `);
    try {
      out[Number(id)] = await fetchProblem(slug);
      console.log("ok");
    } catch (e: any) {
      console.log("FAIL:", e.message);
    }
    await new Promise((r) => setTimeout(r, 400)); // throttle
  }

  const outPath = path.resolve(__dirname, "..", "src", "data", "leetcode-problems.json");
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, JSON.stringify(out, null, 2));
  console.log(`\nSaved ${Object.keys(out).length} problems to ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
