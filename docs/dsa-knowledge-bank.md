# DSA Knowledge Bank

This bank is a curated first pass for big-tech interview prep.

## Source Basis

- `LeetCodeDataset` contributes the idea of dense per-problem metadata and stronger edge-case coverage.
- `kamyu104/LeetCode-Solutions` confirms the canonical breadth of DSA patterns that recur across LeetCode and interviews.
- `awesome-competitive-programming` is the taxonomy guide for topic grouping and practice classification.

## What Is Included

- 35 high-signal problems across arrays, stacks, windows, intervals, binary search, graphs, DP, heap, linked lists, trees, backtracking, design, and trie.
- Company targeting biased toward `google`, `amazon`, `meta`, `microsoft`, with `apple` added on patterns that commonly overlap.
- Canonical test cases that focus on the inputs interviewers actually probe: duplicates, empty-ish edge cases, rotation, zero handling, cycles, and eviction behavior.

## Selection Rules

- Prefer patterns that recur in big-tech screens and onsite rounds.
- Keep the bank balanced across easy, medium, and hard follow-ups.
- Use canonical, deterministic cases instead of overfitting to a single platform example.
- Treat company tags as curated signals, not as a promise that a specific company always asks the exact same problem.

## Files

- Structured bank: [`src/lib/dsa-knowledge-bank.ts`](../src/lib/dsa-knowledge-bank.ts)
- Batch API for multiple questions: [`src/app/api/problems/batch/route.ts`](../src/app/api/problems/batch/route.ts)
- This summary: [`docs/dsa-knowledge-bank.md`](dsa-knowledge-bank.md)

## Multiple Questions

- Use the batch API to fetch a curated set of questions in one request.
- Filter by `topics`, `companies`, `difficulties`, and `limit`.
- The selector rotates across topics so a 5-question batch is not just five near-duplicates from the same bucket.

## Next Expansion

- Add graph-hard, dynamic-programming-hard, and tree-variant follow-ups in a third pass.
- Split the bank by company if you want company-specific rotations later.
- Wire the bank into the live session picker after the runner gets harnesses for the new problems.
