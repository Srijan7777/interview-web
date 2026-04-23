import type { Problem } from "@/types";

export interface CanonicalCase {
  label: string;
  input: string;
  output: string;
  notes?: string;
}

export interface KnowledgeBankEntry {
  problem: Problem;
  interviewSignal: string;
  canonicalCases: CanonicalCase[];
}

export interface KnowledgeBank {
  version: number;
  rotation: string[];
  selectionRules: string[];
  problems: KnowledgeBankEntry[];
}

const BIG_TECH = ["google", "amazon", "meta", "microsoft"];

export const DSA_KNOWLEDGE_BANK: KnowledgeBank = {
  version: 1,
  rotation: [
    "arrays-and-hashing",
    "stack",
    "sliding-window",
    "two-pointers",
    "intervals",
    "binary-search",
    "heap",
    "graphs",
    "dynamic-programming",
    "design",
    "trie",
  ],
  selectionRules: [
    "Prefer canonical big-tech staples with stable problem statements.",
    "Bias toward patterns that recur across Google, Amazon, Meta, and Microsoft screens.",
    "Keep at least one easy, one medium, and one advanced follow-up in each core bucket.",
    "Use representative edge cases, not every LeetCode example verbatim.",
  ],
  problems: [
    {
      problem: {
        id: "kb-001-two-sum",
        title: "Two Sum",
        topic: "arrays-and-hashing",
        difficulty: "easy",
        leetcodeNumber: 1,
        companies: BIG_TECH,
        tags: ["hash-map", "complement"],
        url: "https://leetcode.com/problems/two-sum/",
        approach: "Use a hash map to store seen values and look up complements in one pass.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      interviewSignal: "Baseline hash-map complement question that frequently appears in screens and warm-up rounds.",
      canonicalCases: [
        { label: "Standard", input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
        { label: "Middle pair", input: "nums = [3,2,4], target = 6", output: "[1,2]" },
        { label: "Duplicate values", input: "nums = [3,3], target = 6", output: "[0,1]" },
      ],
    },
    {
      problem: {
        id: "kb-002-valid-parentheses",
        title: "Valid Parentheses",
        topic: "stack",
        difficulty: "easy",
        leetcodeNumber: 20,
        companies: BIG_TECH,
        tags: ["stack"],
        url: "https://leetcode.com/problems/valid-parentheses/",
        approach: "Push opening brackets, validate each closing bracket against the stack top, and reject any mismatch.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      interviewSignal: "Classic stack hygiene problem that checks basic parsing discipline and edge-case handling.",
      canonicalCases: [
        { label: "Simple pair", input: 's = "()"', output: "true" },
        { label: "Mixed types", input: 's = "()[]{}"', output: "true" },
        { label: "Mismatch", input: 's = "([)]"', output: "false", notes: "Crossed ordering should fail." },
      ],
    },
    {
      problem: {
        id: "kb-003-best-time-stock",
        title: "Best Time to Buy and Sell Stock",
        topic: "arrays-and-hashing",
        difficulty: "easy",
        leetcodeNumber: 121,
        companies: ["amazon", "meta", "google", "microsoft"],
        tags: ["greedy", "one-pass"],
        url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
        approach: "Track the minimum price so far and the best profit in one pass.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      interviewSignal: "Greedy one-pass staple that is often used to probe invariant tracking and amortized thinking.",
      canonicalCases: [
        { label: "Profit exists", input: "prices = [7,1,5,3,6,4]", output: "5" },
        { label: "Monotone down", input: "prices = [7,6,4,3,1]", output: "0" },
        { label: "Single gain", input: "prices = [1,2]", output: "1" },
      ],
    },
    {
      problem: {
        id: "kb-004-contains-duplicate",
        title: "Contains Duplicate",
        topic: "arrays-and-hashing",
        difficulty: "easy",
        leetcodeNumber: 217,
        companies: BIG_TECH,
        tags: ["hash-set"],
        url: "https://leetcode.com/problems/contains-duplicate/",
        approach: "Use a set to track seen values and reject as soon as a repeat appears.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      interviewSignal: "Fast signal for set membership, short-circuiting, and duplicate detection.",
      canonicalCases: [
        { label: "Has repeat", input: "nums = [1,2,3,1]", output: "true" },
        { label: "All unique", input: "nums = [1,2,3,4]", output: "false" },
        { label: "Late repeat", input: "nums = [1,1,1,3,3,4,3,2,4,2]", output: "true" },
      ],
    },
    {
      problem: {
        id: "kb-005-product-except-self",
        title: "Product of Array Except Self",
        topic: "arrays-and-hashing",
        difficulty: "medium",
        leetcodeNumber: 238,
        companies: BIG_TECH,
        tags: ["prefix-suffix", "array"],
        url: "https://leetcode.com/problems/product-of-array-except-self/",
        approach: "Build prefix and suffix products so every position is computed without division.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      interviewSignal: "Common follow-up to test array decomposition and handling zeros without division.",
      canonicalCases: [
        { label: "All positive", input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
        { label: "Single zero", input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" },
        { label: "Two values", input: "nums = [2,3]", output: "[3,2]" },
      ],
    },
    {
      problem: {
        id: "kb-006-longest-substring",
        title: "Longest Substring Without Repeating Characters",
        topic: "sliding-window",
        difficulty: "medium",
        leetcodeNumber: 3,
        companies: ["google", "amazon", "meta", "apple"],
        tags: ["sliding-window", "hash-map"],
        url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        approach: "Use a sliding window with last-seen indexes to move the left boundary on duplicates.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(min(n, m))",
      },
      interviewSignal: "Canonical sliding-window question used to check window invariants and duplicate eviction logic.",
      canonicalCases: [
        { label: "Repeated pattern", input: 's = "abcabcbb"', output: "3" },
        { label: "Single char", input: 's = "bbbbb"', output: "1" },
        { label: "Window shift", input: 's = "pwwkew"', output: "3" },
      ],
    },
    {
      problem: {
        id: "kb-007-container-water",
        title: "Container With Most Water",
        topic: "two-pointers",
        difficulty: "medium",
        leetcodeNumber: 11,
        companies: ["amazon", "google", "meta", "apple"],
        tags: ["two-pointers"],
        url: "https://leetcode.com/problems/container-with-most-water/",
        approach: "Move the shorter wall inward because width shrinks on every step.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      interviewSignal: "High-signal two-pointer reasoning problem that rewards proof of why greedy moves are safe.",
      canonicalCases: [
        { label: "Reference", input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
        { label: "Two walls", input: "height = [1,1]", output: "1" },
        { label: "Symmetric peak", input: "height = [4,3,2,1,4]", output: "16" },
      ],
    },
    {
      problem: {
        id: "kb-008-merge-intervals",
        title: "Merge Intervals",
        topic: "intervals",
        difficulty: "medium",
        leetcodeNumber: 56,
        companies: ["google", "amazon", "meta", "microsoft"],
        tags: ["sort", "intervals"],
        url: "https://leetcode.com/problems/merge-intervals/",
        approach: "Sort by start time, then fold overlapping intervals into the current merged range.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
      },
      interviewSignal: "A baseline interval-merge problem that often leads to meeting-room and scheduling variants.",
      canonicalCases: [
        { label: "Overlap chain", input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" },
        { label: "Touching edges", input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]" },
        { label: "Nested", input: "intervals = [[1,4],[0,4]]", output: "[[0,4]]" },
      ],
    },
    {
      problem: {
        id: "kb-009-top-k-frequent",
        title: "Top K Frequent Elements",
        topic: "heap",
        difficulty: "medium",
        leetcodeNumber: 347,
        companies: BIG_TECH,
        tags: ["hash-map", "heap"],
        url: "https://leetcode.com/problems/top-k-frequent-elements/",
        approach: "Count frequencies, then use a heap or bucket strategy to extract the top k items.",
        timeComplexity: "O(n log k)",
        spaceComplexity: "O(n)",
      },
      interviewSignal: "Common heap/hash-map combination that also checks how candidates handle tie-breaking and output order.",
      canonicalCases: [
        { label: "Two hot items", input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]", notes: "Order can be normalized." },
        { label: "Single item", input: "nums = [1], k = 1", output: "[1]" },
        { label: "Mixed frequencies", input: "nums = [4,1,-1,2,-1,2,3], k = 2", output: "[-1,2]", notes: "Any order of the top two is acceptable." },
      ],
    },
    {
      problem: {
        id: "kb-010-binary-search",
        title: "Binary Search",
        topic: "binary-search",
        difficulty: "easy",
        leetcodeNumber: 704,
        companies: BIG_TECH,
        tags: ["binary-search"],
        url: "https://leetcode.com/problems/binary-search/",
        approach: "Maintain an invariant on the search window and shrink it until the target is found or ruled out.",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
      },
      interviewSignal: "Basic search invariant question that still surfaces in live interviews and as a building block for harder problems.",
      canonicalCases: [
        { label: "Target found", input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
        { label: "Target missing", input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" },
        { label: "Single element", input: "nums = [5], target = 5", output: "0" },
      ],
    },
    {
      problem: {
        id: "kb-011-rotated-search",
        title: "Search in Rotated Sorted Array",
        topic: "binary-search",
        difficulty: "medium",
        leetcodeNumber: 33,
        companies: ["google", "amazon", "meta", "microsoft"],
        tags: ["binary-search", "rotation"],
        url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
        approach: "Use the sorted half to decide which side contains the target on every iteration.",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
      },
      interviewSignal: "A canonical twist on binary search that checks whether the candidate can preserve the invariant through rotation.",
      canonicalCases: [
        { label: "Pivoted", input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
        { label: "Absent", input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" },
        { label: "Single element miss", input: "nums = [1], target = 0", output: "-1" },
      ],
    },
    {
      problem: {
        id: "kb-012-sliding-window-maximum",
        title: "Sliding Window Maximum",
        topic: "heap",
        difficulty: "hard",
        leetcodeNumber: 239,
        companies: BIG_TECH,
        tags: ["deque", "heap", "sliding-window"],
        url: "https://leetcode.com/problems/sliding-window-maximum/",
        approach: "Maintain a monotonic deque of candidate indexes so each element enters and leaves once.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(k)",
      },
      interviewSignal: "Deque-based monotonic structure problem that is common in stronger big-tech rounds.",
      canonicalCases: [
        { label: "Reference", input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[3,3,5,5,6,7]" },
        { label: "Single window", input: "nums = [1], k = 1", output: "[1]" },
        { label: "Full width", input: "nums = [9,11], k = 2", output: "[11]" },
      ],
    },
    {
      problem: {
        id: "kb-013-number-of-islands",
        title: "Number of Islands",
        topic: "graphs",
        difficulty: "medium",
        leetcodeNumber: 200,
        companies: BIG_TECH,
        tags: ["dfs", "bfs", "grid"],
        url: "https://leetcode.com/problems/number-of-islands/",
        approach: "Traverse each unseen land cell with DFS or BFS and mark the connected component as visited.",
        timeComplexity: "O(m * n)",
        spaceComplexity: "O(m * n)",
      },
      interviewSignal: "Core graph/grid traversal question used to check flood-fill reasoning and visited-state management.",
      canonicalCases: [
        {
          label: "Single island",
          input: "grid = [[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]",
          output: "1",
        },
        {
          label: "Multiple islands",
          input: "grid = [[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]",
          output: "3",
        },
        {
          label: "All water",
          input: "grid = [[\"0\",\"0\"],[\"0\",\"0\"]]",
          output: "0",
        },
      ],
    },
    {
      problem: {
        id: "kb-014-course-schedule",
        title: "Course Schedule",
        topic: "graphs",
        difficulty: "medium",
        leetcodeNumber: 207,
        companies: BIG_TECH,
        tags: ["topological-sort", "graph"],
        url: "https://leetcode.com/problems/course-schedule/",
        approach: "Detect cycles with topological sorting or DFS coloring on the prerequisite graph.",
        timeComplexity: "O(v + e)",
        spaceComplexity: "O(v + e)",
      },
      interviewSignal: "Standard DAG-cycle question that maps well to dependency graphs and scheduling systems.",
      canonicalCases: [
        { label: "Simple acyclic", input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" },
        { label: "Two-node cycle", input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false" },
        { label: "Layered DAG", input: "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]", output: "true" },
      ],
    },
    {
      problem: {
        id: "kb-015-house-robber",
        title: "House Robber",
        topic: "dynamic-programming",
        difficulty: "medium",
        leetcodeNumber: 198,
        companies: ["google", "amazon", "meta", "apple"],
        tags: ["dp", "1d-dp"],
        url: "https://leetcode.com/problems/house-robber/",
        approach: "Keep two rolling states: best up to the previous house and best up to the one before it.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      interviewSignal: "Classic 1D DP pattern that checks whether candidates can express recurrence and compress state.",
      canonicalCases: [
        { label: "Alternating picks", input: "nums = [1,2,3,1]", output: "4" },
        { label: "Mixed values", input: "nums = [2,7,9,3,1]", output: "12" },
        { label: "Small array", input: "nums = [2,1,1,2]", output: "4" },
      ],
    },
    {
      problem: {
        id: "kb-016-coin-change",
        title: "Coin Change",
        topic: "dynamic-programming",
        difficulty: "medium",
        leetcodeNumber: 322,
        companies: BIG_TECH,
        tags: ["dp", "unbounded-knapsack"],
        url: "https://leetcode.com/problems/coin-change/",
        approach: "Use bottom-up DP where each amount stores the fewest coins needed to reach it.",
        timeComplexity: "O(amount * numberOfCoins)",
        spaceComplexity: "O(amount)",
      },
      interviewSignal: "Important for recurrence design, impossible-state handling, and unbounded knapsack intuition.",
      canonicalCases: [
        { label: "Reachable", input: "coins = [1,2,5], amount = 11", output: "3" },
        { label: "Unreachable", input: "coins = [2], amount = 3", output: "-1" },
        { label: "Zero amount", input: "coins = [1], amount = 0", output: "0" },
      ],
    },
    {
      problem: {
        id: "kb-017-kth-largest",
        title: "Kth Largest Element in an Array",
        topic: "heap",
        difficulty: "medium",
        leetcodeNumber: 215,
        companies: BIG_TECH,
        tags: ["heap", "quickselect"],
        url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
        approach: "Use a min-heap of size k or a partition-based quickselect to isolate the kth largest value.",
        timeComplexity: "O(n log k)",
        spaceComplexity: "O(k)",
      },
      interviewSignal: "A common heap/selection question that appears in both coding screens and optimization follow-ups.",
      canonicalCases: [
        { label: "Reference", input: "nums = [3,2,1,5,6,4], k = 2", output: "5" },
        { label: "Duplicates", input: "nums = [3,2,3,1,2,4,5,5,6], k = 4", output: "4" },
        { label: "Single value", input: "nums = [1], k = 1", output: "1" },
      ],
    },
    {
      problem: {
        id: "kb-018-daily-temperatures",
        title: "Daily Temperatures",
        topic: "stack",
        difficulty: "medium",
        leetcodeNumber: 739,
        companies: ["amazon", "meta", "google", "microsoft"],
        tags: ["monotonic-stack"],
        url: "https://leetcode.com/problems/daily-temperatures/",
        approach: "Use a monotonic decreasing stack of indexes and resolve each day when a warmer temperature appears.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      interviewSignal: "Monotonic-stack pattern that is very common in big-tech interviews and interview prep sets.",
      canonicalCases: [
        { label: "Reference", input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]" },
        { label: "Increasing", input: "temperatures = [30,40,50,60]", output: "[1,1,1,0]" },
        { label: "Tiny", input: "temperatures = [30,60,90]", output: "[1,1,0]" },
      ],
    },
    {
      problem: {
        id: "kb-019-lru-cache",
        title: "LRU Cache",
        topic: "design",
        difficulty: "medium",
        leetcodeNumber: 146,
        companies: BIG_TECH,
        tags: ["design", "hash-map", "doubly-linked-list"],
        url: "https://leetcode.com/problems/lru-cache/",
        approach: "Combine a hash map for O(1) lookup with a doubly linked list for O(1) recency updates.",
        timeComplexity: "O(1) per operation",
        spaceComplexity: "O(capacity)",
      },
      interviewSignal: "One of the most important design/data-structure hybrids for big-tech interviews and system-agnostic design thinking.",
      canonicalCases: [
        {
          label: "Eviction path",
          input: "capacity = 2; ops = [put(1,1), put(2,2), get(1), put(3,3), get(2), put(4,4), get(1), get(3), get(4)]",
          output: "[1,-1,-1,3,4]",
        },
        {
          label: "Overwrite key",
          input: "capacity = 1; ops = [put(2,1), get(2), put(2,2), get(2)]",
          output: "[1,2]",
        },
        {
          label: "Single slot churn",
          input: "capacity = 2; ops = [put(2,1), put(1,1), put(2,3), put(4,1), get(1), get(2)]",
          output: "[-1,3]",
        },
      ],
    },
    {
      problem: {
        id: "kb-020-implement-trie",
        title: "Implement Trie (Prefix Tree)",
        topic: "trie",
        difficulty: "medium",
        leetcodeNumber: 208,
        companies: BIG_TECH,
        tags: ["trie", "design"],
        url: "https://leetcode.com/problems/implement-trie-prefix-tree/",
        approach: "Store children pointers per character and mark terminal nodes for exact-word checks.",
        timeComplexity: "O(length of word)",
        spaceComplexity: "O(total characters)",
      },
      interviewSignal: "A foundational prefix-structure question that shows up in search, autocomplete, and dictionary-style prompts.",
      canonicalCases: [
        {
          label: "Basic workflow",
          input: "ops = [insert(\"apple\"), search(\"apple\"), search(\"app\"), startsWith(\"app\"), insert(\"app\"), search(\"app\")]",
          output: "[null,true,false,true,null,true]",
        },
        {
          label: "Shared prefix",
          input: "ops = [insert(\"car\"), insert(\"card\"), search(\"car\"), startsWith(\"car\"), search(\"cards\")]",
          output: "[null,null,true,true,false]",
        },
        {
          label: "Empty trie queries",
          input: "ops = [search(\"a\"), startsWith(\"a\")]",
          output: "[false,false]",
        },
      ],
    },
    {
      problem: {
        id: "kb-021-longest-repeating-character-replacement",
        title: "Longest Repeating Character Replacement",
        topic: "sliding-window",
        difficulty: "medium",
        leetcodeNumber: 424,
        companies: ["google", "amazon", "meta", "microsoft"],
        tags: ["sliding-window", "frequency"],
        url: "https://leetcode.com/problems/longest-repeating-character-replacement/",
        approach: "Maintain a sliding window and track the most frequent character inside the current window.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      interviewSignal: "Good interview problem for proving window validity and handling amortized updates of a dominant frequency.",
      canonicalCases: [
        { label: "Balanced pattern", input: 's = "ABAB", k = 2', output: "4" },
        { label: "Mixed run", input: 's = "AABABBA", k = 1', output: "4" },
        { label: "All same", input: 's = "AAAA", k = 2', output: "4" },
      ],
    },
  ],
} as const;

export function getKnowledgeBankProblemById(leetcodeNumber: number): KnowledgeBankEntry | undefined {
  return DSA_KNOWLEDGE_BANK.problems.find((entry) => entry.problem.leetcodeNumber === leetcodeNumber);
}

export function getKnowledgeBankProblemByTitle(title: string): KnowledgeBankEntry | undefined {
  const normalizedTitle = title.trim().toLowerCase();
  return DSA_KNOWLEDGE_BANK.problems.find((entry) => entry.problem.title.toLowerCase() === normalizedTitle);
}
