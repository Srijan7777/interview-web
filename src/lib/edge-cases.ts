// Curated edge cases per problem. Shown in ProblemStatement so user thinks about them.
// Grouped by leetcodeNumber.

export interface EdgeCase {
  label: string;
  input: string;
  expected: string;
  why: string;
}

export const EDGE_CASES: Record<number, EdgeCase[]> = {
  1: [
    { label: "Duplicate values", input: "nums = [3,3], target = 6", expected: "[0,1]", why: "Same value used twice" },
    { label: "Negative numbers", input: "nums = [-1,-2,-3,-4], target = -7", expected: "[2,3]", why: "Handles negatives" },
    { label: "Min size input", input: "nums = [2,7], target = 9", expected: "[0,1]", why: "Array of 2 only" },
  ],
  2: [
    { label: "Different lengths", input: "l1 = [9,9,9,9], l2 = [9,9]", expected: "[8,9,0,0,1]", why: "Carry propagation" },
    { label: "Single zero", input: "l1 = [0], l2 = [0]", expected: "[0]", why: "Edge of zero" },
  ],
  3: [
    { label: "Empty string", input: "s = \"\"", expected: "0", why: "Empty input guard" },
    { label: "All same chars", input: "s = \"aaaa\"", expected: "1", why: "Window shrinks to 1" },
    { label: "Unicode", input: "s = \"dvdf\"", expected: "3", why: "Non-obvious window" },
  ],
  11: [
    { label: "Min size", input: "height = [1,1]", expected: "1", why: "Two bars only" },
    { label: "Tall + short", input: "height = [1,8,6,2,5,4,8,3,7]", expected: "49", why: "Classic two-pointer case" },
  ],
  20: [
    { label: "Single char", input: "s = \"(\"", expected: "false", why: "Unmatched open" },
    { label: "Empty string", input: "s = \"\"", expected: "true", why: "Empty is valid" },
    { label: "Only closers", input: "s = \"]]\"", expected: "false", why: "Stack empty on pop" },
  ],
  21: [
    { label: "One empty", input: "l1 = [], l2 = [0]", expected: "[0]", why: "Null list edge" },
    { label: "Both empty", input: "l1 = [], l2 = []", expected: "[]", why: "Both null" },
  ],
  33: [
    { label: "Not rotated", input: "nums = [1,2,3,4,5], target = 3", expected: "2", why: "Normal binary search" },
    { label: "Target not found", input: "nums = [4,5,6,7,0,1,2], target = 3", expected: "-1", why: "Returns -1" },
    { label: "Single element", input: "nums = [1], target = 0", expected: "-1", why: "One-element edge" },
  ],
  39: [
    { label: "Target smaller than min", input: "candidates = [5,6,7], target = 3", expected: "[]", why: "No valid combo" },
    { label: "Single candidate multi-use", input: "candidates = [2], target = 4", expected: "[[2,2]]", why: "Reuse allowed" },
  ],
  46: [
    { label: "Single element", input: "nums = [1]", expected: "[[1]]", why: "Base case" },
    { label: "Duplicates in input", input: "nums = [1,2]", expected: "[[1,2],[2,1]]", why: "Order matters" },
  ],
  56: [
    { label: "Fully overlapping", input: "intervals = [[1,4],[2,3]]", expected: "[[1,4]]", why: "Inner contained" },
    { label: "No overlap", input: "intervals = [[1,2],[3,4]]", expected: "[[1,2],[3,4]]", why: "Disjoint" },
    { label: "Unsorted input", input: "intervals = [[2,6],[1,3],[8,10]]", expected: "[[1,6],[8,10]]", why: "Sort first" },
  ],
  78: [
    { label: "Empty input", input: "nums = []", expected: "[[]]", why: "Empty set is subset" },
    { label: "Single", input: "nums = [0]", expected: "[[],[0]]", why: "Base case" },
  ],
  79: [
    { label: "Reuse disallowed", input: "board = [[\"a\",\"a\"]], word = \"aaa\"", expected: "false", why: "No cell reuse" },
    { label: "1x1 match", input: "board = [[\"a\"]], word = \"a\"", expected: "true", why: "Single cell" },
  ],
  98: [
    { label: "Right subtree boundary", input: "root = [5,1,4,null,null,3,6]", expected: "false", why: "3 < 5 violates BST" },
    { label: "Single node", input: "root = [1]", expected: "true", why: "Leaf is BST" },
  ],
  102: [
    { label: "Empty tree", input: "root = []", expected: "[]", why: "Null root" },
    { label: "Single node", input: "root = [1]", expected: "[[1]]", why: "One level" },
  ],
  121: [
    { label: "Descending prices", input: "prices = [7,6,4,3,1]", expected: "0", why: "No profit possible" },
    { label: "Single day", input: "prices = [5]", expected: "0", why: "Can't buy + sell same day" },
    { label: "Flat prices", input: "prices = [3,3,3,3]", expected: "0", why: "No gain" },
  ],
  141: [
    { label: "No cycle", input: "head = [1,2], pos = -1", expected: "false", why: "Linear list" },
    { label: "Self-loop", input: "head = [1], pos = 0", expected: "true", why: "Cycle on self" },
    { label: "Empty", input: "head = []", expected: "false", why: "Null head" },
  ],
  146: [
    { label: "Capacity 1", input: "capacity = 1, put(1,1), put(2,2), get(1)", expected: "-1", why: "Evicts 1 on put(2)" },
    { label: "Update existing", input: "put(1,1), put(1,2), get(1)", expected: "2", why: "Update should not evict" },
  ],
  155: [
    { label: "Pop after push", input: "push(1), push(2), pop(), getMin()", expected: "1", why: "Min after pop" },
    { label: "All same", input: "push(1), push(1), pop(), getMin()", expected: "1", why: "Duplicate mins" },
  ],
  198: [
    { label: "Single house", input: "nums = [5]", expected: "5", why: "Base case" },
    { label: "Two houses", input: "nums = [5,1]", expected: "5", why: "Pick larger" },
    { label: "Alternating large", input: "nums = [2,7,9,3,1]", expected: "12", why: "Skip correctly" },
  ],
  200: [
    { label: "All water", input: "grid = [[\"0\"]]", expected: "0", why: "No islands" },
    { label: "Diagonal neighbors", input: "grid = [[\"1\",\"0\"],[\"0\",\"1\"]]", expected: "2", why: "Diagonal ≠ connected" },
  ],
  206: [
    { label: "Empty", input: "head = []", expected: "[]", why: "Null edge" },
    { label: "Single", input: "head = [1]", expected: "[1]", why: "Base case" },
  ],
  207: [
    { label: "Cycle present", input: "numCourses = 2, prereqs = [[0,1],[1,0]]", expected: "false", why: "Cycle blocks" },
    { label: "No prereqs", input: "numCourses = 3, prereqs = []", expected: "true", why: "Trivially valid" },
  ],
  208: [
    { label: "Prefix present, word not", input: "insert(\"apple\"), search(\"app\")", expected: "false", why: "Prefix ≠ word" },
    { label: "startsWith on prefix", input: "insert(\"apple\"), startsWith(\"app\")", expected: "true", why: "Prefix match" },
  ],
  211: [
    { label: "Dot matches any", input: "addWord(\"bad\"), search(\".ad\")", expected: "true", why: "Wildcard" },
    { label: "All dots", input: "addWord(\"a\"), search(\".\")", expected: "true", why: "Single wildcard" },
  ],
  215: [
    { label: "k = length", input: "nums = [3,2,1], k = 3", expected: "1", why: "Smallest" },
    { label: "Duplicates", input: "nums = [3,2,3,1,2,4,5,5,6], k = 4", expected: "4", why: "Dupes counted separately" },
  ],
  217: [
    { label: "No dupes", input: "nums = [1,2,3,4]", expected: "false", why: "Clean array" },
    { label: "Immediate dupe", input: "nums = [1,1]", expected: "true", why: "Two equal" },
  ],
  226: [
    { label: "Empty", input: "root = []", expected: "[]", why: "Null root" },
    { label: "Single node", input: "root = [1]", expected: "[1]", why: "No-op for leaf" },
  ],
  236: [
    { label: "LCA is root", input: "root = [3,5,1], p = 5, q = 1", expected: "3", why: "Root is ancestor" },
    { label: "One is ancestor of other", input: "root = [3,5,1,6,2], p = 5, q = 6", expected: "5", why: "p is ancestor of q" },
  ],
  238: [
    { label: "Contains zero", input: "nums = [1,2,0,4]", expected: "[0,0,8,0]", why: "Single zero zeros others" },
    { label: "Two zeros", input: "nums = [1,0,3,0]", expected: "[0,0,0,0]", why: "Multi-zero" },
    { label: "Negatives", input: "nums = [-1,1,0,-3,3]", expected: "[0,0,9,0,0]", why: "Sign handling" },
  ],
  239: [
    { label: "k = 1", input: "nums = [1,-1], k = 1", expected: "[1,-1]", why: "Window size 1" },
    { label: "k = len", input: "nums = [1,3,-1,-3,5,3,6,7], k = 8", expected: "[7]", why: "Single max" },
  ],
  322: [
    { label: "Amount 0", input: "coins = [1], amount = 0", expected: "0", why: "No coins needed" },
    { label: "Impossible", input: "coins = [2], amount = 3", expected: "-1", why: "Odd + even coins only" },
    { label: "Single coin type", input: "coins = [1], amount = 100", expected: "100", why: "Large amount" },
  ],
  347: [
    { label: "All unique (k = len)", input: "nums = [1,2,3], k = 3", expected: "[1,2,3]", why: "All returned" },
    { label: "Tie in freq", input: "nums = [1,1,2,2,3], k = 2", expected: "[1,2]", why: "Tie handling" },
  ],
  424: [
    { label: "k = 0", input: "s = \"ABAB\", k = 0", expected: "2", why: "No replacements allowed" },
    { label: "All same", input: "s = \"AAAA\", k = 2", expected: "4", why: "Already valid" },
  ],
  704: [
    { label: "Target at start", input: "nums = [1,2,3,4], target = 1", expected: "0", why: "Left edge" },
    { label: "Target not found", input: "nums = [1,3,5], target = 2", expected: "-1", why: "-1 return" },
    { label: "Single element", input: "nums = [5], target = 5", expected: "0", why: "Base case" },
  ],
  739: [
    { label: "All descending", input: "temps = [73,72,71,70]", expected: "[0,0,0,0]", why: "No warmer day" },
    { label: "All same", input: "temps = [50,50,50]", expected: "[0,0,0]", why: "No strictly warmer" },
  ],
};

export function getEdgeCases(leetcodeNumber: number): EdgeCase[] {
  return EDGE_CASES[leetcodeNumber] || [];
}

// Complexity expectations per problem (what interviewer expects)
export const COMPLEXITY_EXPECTED: Record<number, { time: string; space: string; note: string }> = {
  1: { time: "O(n)", space: "O(n)", note: "Hash map single pass" },
  2: { time: "O(max(m,n))", space: "O(max(m,n))", note: "Traverse both lists once" },
  3: { time: "O(n)", space: "O(min(n,m))", note: "Sliding window with last-seen map" },
  11: { time: "O(n)", space: "O(1)", note: "Two pointers" },
  20: { time: "O(n)", space: "O(n)", note: "Stack" },
  21: { time: "O(m+n)", space: "O(1)", note: "Iterative merge" },
  33: { time: "O(log n)", space: "O(1)", note: "Modified binary search" },
  39: { time: "O(2^t)", space: "O(t)", note: "Backtracking with target t" },
  46: { time: "O(n!)", space: "O(n)", note: "Backtracking, n factorial results" },
  56: { time: "O(n log n)", space: "O(n)", note: "Sort dominates" },
  78: { time: "O(n·2^n)", space: "O(n)", note: "Each element in/out" },
  79: { time: "O(n·3^L)", space: "O(L)", note: "DFS with word length L" },
  98: { time: "O(n)", space: "O(h)", note: "Inorder or bounds check" },
  102: { time: "O(n)", space: "O(n)", note: "BFS with queue" },
  121: { time: "O(n)", space: "O(1)", note: "Track min + max profit" },
  141: { time: "O(n)", space: "O(1)", note: "Floyd's tortoise + hare" },
  146: { time: "O(1) per op", space: "O(cap)", note: "HashMap + doubly-linked list" },
  155: { time: "O(1) per op", space: "O(n)", note: "Parallel min-stack" },
  198: { time: "O(n)", space: "O(1)", note: "DP with 2 vars" },
  200: { time: "O(m·n)", space: "O(m·n)", note: "DFS or BFS each cell once" },
  206: { time: "O(n)", space: "O(1)", note: "Iterative pointer flip" },
  207: { time: "O(V+E)", space: "O(V+E)", note: "Topological sort or DFS cycle check" },
  208: { time: "O(L) per op", space: "O(N·L)", note: "L = word length" },
  211: { time: "O(26^L)", space: "O(N·L)", note: "Trie with DFS wildcard" },
  215: { time: "O(n log k)", space: "O(k)", note: "Min-heap of size k" },
  217: { time: "O(n)", space: "O(n)", note: "Hash set" },
  226: { time: "O(n)", space: "O(h)", note: "Recursive swap" },
  236: { time: "O(n)", space: "O(h)", note: "Post-order DFS" },
  238: { time: "O(n)", space: "O(1)", note: "Two passes (exclude output array)" },
  239: { time: "O(n)", space: "O(k)", note: "Monotonic deque" },
  322: { time: "O(n·amount)", space: "O(amount)", note: "Bottom-up DP" },
  347: { time: "O(n log k)", space: "O(n)", note: "Bucket sort or heap" },
  424: { time: "O(n)", space: "O(1)", note: "Sliding window with 26-char freq" },
  704: { time: "O(log n)", space: "O(1)", note: "Standard binary search" },
  739: { time: "O(n)", space: "O(n)", note: "Monotonic stack" },
};

export function getExpectedComplexity(leetcodeNumber: number) {
  return COMPLEXITY_EXPECTED[leetcodeNumber] || null;
}
