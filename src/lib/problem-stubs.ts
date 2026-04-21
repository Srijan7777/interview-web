export interface TestCase {
  input: any[];
  output: any;
  explanation?: string;
}

export const CODE_STUBS: Record<string, Record<number, string>> = {
  javascript: {
    1: `function twoSum(nums, target) {
  // Write your solution here
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
  // Write your solution here
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
  // Write your solution here
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
  // Write your solution here
  let minPrice = prices[0];
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    maxProfit = Math.max(maxProfit, prices[i] - minPrice);
    minPrice = Math.min(minPrice, prices[i]);
  }

  return maxProfit;
}`,
  },

  python: {
    1: `def twoSum(nums, target):
    # Write your solution here
    num_map = {}

    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i

    return []`,

    3: `def lengthOfLongestSubstring(s):
    # Write your solution here
    char_index = {}
    max_len = 0
    left = 0

    for right, char in enumerate(s):
        if char in char_index:
            left = max(left, char_index[char] + 1)
        char_index[char] = right
        max_len = max(max_len, right - left + 1)

    return max_len`,

    20: `def isValid(s):
    # Write your solution here
    stack = []
    pairs = {')', '(', '}': '{', ']': '['}

    for char in s:
        if char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
        else:
            stack.append(char)

    return len(stack) == 0`,

    121: `def maxProfit(prices):
    # Write your solution here
    min_price = prices[0]
    max_profit = 0

    for price in prices[1:]:
        max_profit = max(max_profit, price - min_price)
        min_price = min(min_price, price)

    return max_profit`,
  },

  java: {
    1: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        Map<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }

        return new int[]{};
    }
}`,

    3: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Write your solution here
        Map<Character, Integer> charIndex = new HashMap<>();
        int maxLen = 0;
        int left = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (charIndex.containsKey(c)) {
                left = Math.max(left, charIndex.get(c) + 1);
            }
            charIndex.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}`,

    20: `class Solution {
    public boolean isValid(String s) {
        // Write your solution here
        Stack<Character> stack = new Stack<>();

        for (char c : s.toCharArray()) {
            if (c == ')') {
                if (stack.isEmpty() || stack.pop() != '(') return false;
            } else if (c == '}') {
                if (stack.isEmpty() || stack.pop() != '{') return false;
            } else if (c == ']') {
                if (stack.isEmpty() || stack.pop() != '[') return false;
            } else {
                stack.push(c);
            }
        }

        return stack.isEmpty();
    }
}`,

    121: `class Solution {
    public int maxProfit(int[] prices) {
        // Write your solution here
        int minPrice = prices[0];
        int maxProfit = 0;

        for (int i = 1; i < prices.length; i++) {
            maxProfit = Math.max(maxProfit, prices[i] - minPrice);
            minPrice = Math.min(minPrice, prices[i]);
        }

        return maxProfit;
    }
}`,
  },

  cpp: {
    1: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        unordered_map<int, int> map;

        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (map.find(complement) != map.end()) {
                return {map[complement], i};
            }
            map[nums[i]] = i;
        }

        return {};
    }
};`,

    3: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // Write your solution here
        unordered_map<char, int> charIndex;
        int maxLen = 0;
        int left = 0;

        for (int right = 0; right < s.length(); right++) {
            if (charIndex.find(s[right]) != charIndex.end()) {
                left = max(left, charIndex[s[right]] + 1);
            }
            charIndex[s[right]] = right;
            maxLen = max(maxLen, right - left + 1);
        }

        return maxLen;
    }
};`,

    20: `class Solution {
public:
    bool isValid(string s) {
        // Write your solution here
        stack<char> st;

        for (char c : s) {
            if (c == ')') {
                if (st.empty() || st.top() != '(') return false;
                st.pop();
            } else if (c == '}') {
                if (st.empty() || st.top() != '{') return false;
                st.pop();
            } else if (c == ']') {
                if (st.empty() || st.top() != '[') return false;
                st.pop();
            } else {
                st.push(c);
            }
        }

        return st.empty();
    }
};`,

    121: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        // Write your solution here
        int minPrice = prices[0];
        int maxProfit = 0;

        for (int i = 1; i < prices.size(); i++) {
            maxProfit = max(maxProfit, prices[i] - minPrice);
            minPrice = min(minPrice, prices[i]);
        }

        return maxProfit;
    }
};`,
  },
};

export const TEST_CASES: Record<number, TestCase[]> = {
  1: [
    { input: [[2, 7, 11, 15], 9], output: [0, 1], explanation: "nums[0] + nums[1] = 9" },
    { input: [[3, 2, 4], 6], output: [1, 2], explanation: "nums[1] + nums[2] = 6" },
    { input: [[3, 3], 6], output: [0, 1], explanation: "nums[0] + nums[1] = 6" },
  ],
  3: [
    { input: ["abcabcbb"], output: 3, explanation: 'The substring "abc" has length 3' },
    { input: ["bbbbb"], output: 1, explanation: 'The substring "b" has length 1' },
    { input: ["pwwkew"], output: 3, explanation: 'The substring "wke" has length 3' },
    { input: ["au"], output: 2 },
  ],
  20: [
    { input: ["()"], output: true },
    { input: ["()[]{}"], output: true },
    { input: ["([)]"], output: false, explanation: "Brackets are mismatched" },
    { input: ["{[]}"], output: true },
  ],
  121: [
    { input: [[7, 1, 5, 3, 6, 4]], output: 5, explanation: "Buy at 1, sell at 6, profit = 5" },
    { input: [[7, 6, 4, 3, 1]], output: 0, explanation: "No profit possible" },
    { input: [[2, 4, 1]], output: 2 },
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
    { input: "prices = [7,6,4,3,1]", output: "0", explanation: "No profit possible" },
  ],
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
