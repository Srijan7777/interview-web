// Harness templates for Judge0 API execution
// Each harness reads stdin, calls user's solution, prints stdout
// User code injected at // USER_CODE marker

export const HARNESSES: Record<string, Record<number, string>> = {
  javascript: {
    1: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
let lines = [];
rl.on('line', l => lines.push(l.trim()));
rl.on('close', () => {
  // USER_CODE
  const n = parseInt(lines[0]);
  const nums = lines[1].split(' ').map(Number);
  const target = parseInt(lines[2]);
  const result = twoSum(nums, target);
  console.log(result.join(' '));
});
`,
    3: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
let s = '';
rl.on('line', l => { s = l.trim(); });
rl.on('close', () => {
  // USER_CODE
  const result = lengthOfLongestSubstring(s);
  console.log(result);
});
`,
    20: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
let s = '';
rl.on('line', l => { s = l.trim(); });
rl.on('close', () => {
  // USER_CODE
  const result = isValid(s);
  console.log(result);
});
`,
    121: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
let lines = [];
rl.on('line', l => lines.push(l.trim()));
rl.on('close', () => {
  // USER_CODE
  const n = parseInt(lines[0]);
  const prices = lines[1].split(' ').map(Number);
  const result = maxProfit(prices);
  console.log(result);
});
`,
  },

  python: {
    1: `
# USER_CODE

n = int(input())
nums = list(map(int, input().split()))
target = int(input())
result = twoSum(nums, target)
print(*result)
`,
    3: `
# USER_CODE

s = input()
result = lengthOfLongestSubstring(s)
print(result)
`,
    20: `
# USER_CODE

s = input()
result = isValid(s)
print(result)
`,
    121: `
# USER_CODE

n = int(input())
prices = list(map(int, input().split()))
result = maxProfit(prices)
print(result)
`,
  },

  java: {
    1: `
import java.util.*;
import java.io.*;

class Solution {
  // USER_CODE
}

public class Main {
  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    int n = Integer.parseInt(br.readLine().trim());
    int[] nums = Arrays.stream(br.readLine().trim().split(" ")).mapToInt(Integer::parseInt).toArray();
    int target = Integer.parseInt(br.readLine().trim());
    Solution sol = new Solution();
    int[] res = sol.twoSum(nums, target);
    System.out.println(res[0] + " " + res[1]);
  }
}
`,
    3: `
import java.util.*;
import java.io.*;

class Solution {
  // USER_CODE
}

public class Main {
  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    String s = br.readLine().trim();
    Solution sol = new Solution();
    int result = sol.lengthOfLongestSubstring(s);
    System.out.println(result);
  }
}
`,
    20: `
import java.util.*;
import java.io.*;

class Solution {
  // USER_CODE
}

public class Main {
  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    String s = br.readLine().trim();
    Solution sol = new Solution();
    boolean result = sol.isValid(s);
    System.out.println(result);
  }
}
`,
    121: `
import java.util.*;
import java.io.*;

class Solution {
  // USER_CODE
}

public class Main {
  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    int n = Integer.parseInt(br.readLine().trim());
    int[] prices = Arrays.stream(br.readLine().trim().split(" ")).mapToInt(Integer::parseInt).toArray();
    Solution sol = new Solution();
    int result = sol.maxProfit(prices);
    System.out.println(result);
  }
}
`,
  },

  cpp: {
    1: `
#include <bits/stdc++.h>
using namespace std;

// USER_CODE

int main() {
  int n;
  cin >> n;
  vector<int> nums(n);
  for (int i = 0; i < n; i++) cin >> nums[i];
  int target;
  cin >> target;
  vector<int> result = twoSum(nums, target);
  cout << result[0] << " " << result[1] << endl;
  return 0;
}
`,
    3: `
#include <bits/stdc++.h>
using namespace std;

// USER_CODE

int main() {
  string s;
  cin >> s;
  int result = lengthOfLongestSubstring(s);
  cout << result << endl;
  return 0;
}
`,
    20: `
#include <bits/stdc++.h>
using namespace std;

// USER_CODE

int main() {
  string s;
  cin >> s;
  bool result = isValid(s);
  cout << (result ? "true" : "false") << endl;
  return 0;
}
`,
    121: `
#include <bits/stdc++.h>
using namespace std;

// USER_CODE

int main() {
  int n;
  cin >> n;
  vector<int> prices(n);
  for (int i = 0; i < n; i++) cin >> prices[i];
  int result = maxProfit(prices);
  cout << result << endl;
  return 0;
}
`,
  },
};

export function getHarness(language: string, problemId: number): string {
  return HARNESSES[language]?.[problemId] || '';
}
