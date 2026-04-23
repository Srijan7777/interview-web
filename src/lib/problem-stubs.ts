// Code stubs for DSA problems (boilerplate only - no solutions)
// Students write their own implementations

export const CODE_STUBS: Record<string, Record<number, string>> = {
  javascript: {
    1: `function twoSum(nums, target) {
  // Write your solution here

}`,

    3: `function lengthOfLongestSubstring(s) {
  // Write your solution here

}`,

    20: `function isValid(s) {
  // Write your solution here

}`,

    121: `function maxProfit(prices) {
  // Write your solution here

}`,
  },

  python: {
    1: `def twoSum(nums, target):
    # Write your solution here
    pass
`,
    3: `def lengthOfLongestSubstring(s):
    # Write your solution here
    pass
`,
    20: `def isValid(s):
    # Write your solution here
    pass
`,
    121: `def maxProfit(prices):
    # Write your solution here
    pass
`,
  },

  java: {
    1: `public int[] twoSum(int[] nums, int target) {
  // Write your solution here
  return new int[]{0, 0};
}`,
    3: `public int lengthOfLongestSubstring(String s) {
  // Write your solution here
  return 0;
}`,
    20: `public boolean isValid(String s) {
  // Write your solution here
  return false;
}`,
    121: `public int maxProfit(int[] prices) {
  // Write your solution here
  return 0;
}`,
  },

  cpp: {
    1: `vector<int> twoSum(vector<int>& nums, int target) {
  // Write your solution here
  return {0, 0};
}`,
    3: `int lengthOfLongestSubstring(string s) {
  // Write your solution here
  return 0;
}`,
    20: `bool isValid(string s) {
  // Write your solution here
  return false;
}`,
    121: `int maxProfit(vector<int>& prices) {
  // Write your solution here
  return 0;
}`,
  },
};

export function getCodeStub(leetcodeNumber: number, language: string = "javascript"): string {
  return CODE_STUBS[language]?.[leetcodeNumber] || defaultStub();
}

export function getTestCases(leetcodeNumber: number): TestCase[] {
  return TEST_CASES[leetcodeNumber] || [];
}

export function getExamples(leetcodeNumber: number): any[] {
  return PROBLEM_EXAMPLES[leetcodeNumber] || [];
}

function defaultStub(): string {
  return `// Write your solution here
function solve(input) {
  return result;
}`;
}

interface TestCase {
  input: string;
  output: string;
  explanation?: string;
}

export const TEST_CASES: Record<number, TestCase[]> = {
  1: [
    { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] = 9" },
    { input: "nums = [3,2,4], target = 6", output: "[1,2]", explanation: "nums[1] + nums[2] = 6" },
    { input: "nums = [3,3], target = 6", output: "[0,1]" },
  ],
  3: [
    { input: 's = "abcabcbb"', output: "3", explanation: 'The substring "abc" has length 3' },
    { input: 's = "bbbbb"', output: "1", explanation: 'The substring "b" has length 1' },
    { input: 's = "pwwkew"', output: "3", explanation: 'The substring "wke" has length 3' },
    { input: 's = "au"', output: "2" },
  ],
  20: [
    { input: 's = "()"', output: "true" },
    { input: 's = "()[]{}"', output: "true" },
    { input: 's = "([)]"', output: "false", explanation: "Brackets are mismatched" },
    { input: 's = "{[]}"', output: "true" },
  ],
  121: [
    { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy at 1, sell at 6, profit = 5" },
    { input: "prices = [7,6,4,3,1]", output: "0", explanation: "No profit possible" },
    { input: "prices = [2,4,1]", output: "2" },
  ],
};

export const PROBLEM_EXAMPLES: Record<number, any[]> = {
  1: [
    { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] = 9" },
    { input: "nums = [3,2,4], target = 6", output: "[1,2]", explanation: "nums[1] + nums[2] = 6" },
  ],
  3: [
    { input: 's = "abcabcbb"', output: "3", explanation: 'The substring "abc" has length 3' },
    { input: 's = "bbbbb"', output: "1", explanation: 'The substring "b" has length 1' },
    { input: 's = "pwwkew"', output: "3", explanation: 'The substring "wke" has length 3' },
  ],
  20: [
    { input: 's = "()"', output: "true" },
    { input: 's = "()[]{}"', output: "true" },
    { input: 's = "([)]"', output: "false", explanation: "Brackets are mismatched" },
  ],
  121: [
    { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy at 1, sell at 6" },
    { input: "prices = [7,6,4,3,1]", output: "0", explanation: "No profit" },
  ],
};

// Test cases for Judge0 execution (stdin/stdout format)
export const PISTON_TEST_CASES: Record<number, { stdin: string; expected: string; label: string }[]> = {
  1: [
    { label: "Example 1", stdin: "4\n2 7 11 15\n9", expected: "0 1" },
    { label: "Example 2", stdin: "3\n3 2 4\n6", expected: "1 2" },
    { label: "Duplicate", stdin: "2\n3 3\n6", expected: "0 1" },
  ],
  3: [
    { label: "Example 1", stdin: "abcabcbb", expected: "3" },
    { label: "Example 2", stdin: "bbbbb", expected: "1" },
    { label: "Example 3", stdin: "pwwkew", expected: "3" },
    { label: "Two chars", stdin: "au", expected: "2" },
  ],
  20: [
    { label: "Simple", stdin: "()", expected: "true" },
    { label: "Multiple", stdin: "()[]{}", expected: "true" },
    { label: "Mismatch", stdin: "([)]", expected: "false" },
    { label: "Nested", stdin: "{[]}", expected: "true" },
  ],
  121: [
    { label: "Example 1", stdin: "6\n7 1 5 3 6 4", expected: "5" },
    { label: "Decreasing", stdin: "5\n7 6 4 3 1", expected: "0" },
    { label: "Two prices", stdin: "2\n2 4", expected: "2" },
  ],
};
