export const CODE_STUBS: Record<number, string> = {
  1: `function twoSum(nums, target) {
  // Input: nums = [2,7,11,15], target = 9
  // Output: [0,1]
  // Explanation: nums[0] + nums[1] == 9, return [0, 1]

  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }

  return [];
}`,

  3: `function lengthOfLongestSubstring(s) {
  // Input: s = "abcabcbb"
  // Output: 3
  // Explanation: The longest substring without repeating chars is "abc"

  let maxLen = 0;
  let left = 0;
  const charIndex = new Map();

  for (let right = 0; right < s.length; right++) {
    if (charIndex.has(s[right])) {
      left = Math.max(left, charIndex.get(s[right]) + 1);
    }
    charIndex.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}`,

  20: `function isValid(s) {
  // Input: s = "()[]{}"
  // Output: true
  // Input: s = "([)]"
  // Output: false

  const stack = [];
  const pairs = { ')': '(', '}': '{', ']': '[' };

  for (const char of s) {
    if (char in pairs) {
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
}`,

  121: `function maxProfit(prices) {
  // Input: prices = [7,1,5,3,6,4]
  // Output: 5
  // Explanation: Buy on day 2 (price=1) and sell on day 5 (price=6), profit = 6-1 = 5

  let minPrice = prices[0];
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    maxProfit = Math.max(maxProfit, prices[i] - minPrice);
    minPrice = Math.min(minPrice, prices[i]);
  }

  return maxProfit;
}`,
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
    { input: "prices = [7,6,4,3,1]", output: "0", explanation: "No profit possible" },
  ],
};

export function getCodeStub(leetcodeNumber: number): string {
  return CODE_STUBS[leetcodeNumber] || defaultStub();
}

export function getExamples(leetcodeNumber: number): any[] {
  return PROBLEM_EXAMPLES[leetcodeNumber] || [];
}

function defaultStub(): string {
  return `function solve(input) {
  // Solve the problem here
  // Return the expected output

  return result;
}`;
}
