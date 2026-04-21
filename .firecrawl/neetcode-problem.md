[![NeetCode.io Logo](https://neetcode.io/assets/neetcode-io-logo.png)](https://neetcode.io/)Data Structures

[Pro](https://neetcode.io/pro)

Sign in

×

ESC

- [Question](https://neetcode.io/problems/dynamicArray/question)
- [Solution](https://neetcode.io/problems/dynamicArray/solution)
- [Submissions](https://neetcode.io/problems/dynamicArray/history)
- [Discuss(27)](https://neetcode.io/problems/dynamicArray/discuss)

# Design Dynamic Array (Resizable Array)

Easy

Design a [Dynamic Array](https://neetcode.io/courses/dsa-for-beginners/3) (aka a resizable array) class, such as an `ArrayList` in Java or a `vector` in C++.

Your `DynamicArray` class should support the following operations:

- `DynamicArray(int capacity)` will initialize an empty array with a capacity of `capacity`, where `capacity > 0`.
- `int get(int i)` will return the element at index `i`. Assume that index `i` is valid.
- `void set(int i, int n)` will set the element at index `i` to `n`. Assume that index `i` is valid.
- `void pushback(int n)` will push the element `n` to the end of the array.
- `int popback()` will pop and return the element at the end of the array. Assume that the array is non-empty.
- `void resize()` will _double_ the capacity of the array.
- `int getSize()` will return the number of elements in the array.
- `int getCapacity()` will return the capacity of the array.

**If we call `pushback(int n)` but the array is full, we should `resize()` the array first.**

**Example 1:**

```java
Input:
["Array", 1, "getSize", "getCapacity"]

Output:
[null, 0, 1]
```

**Example 2:**

```java
Input:
["Array", 1, "pushback", 1, "getCapacity", "pushback", 2, "getCapacity"]

Output:
[null, null, 1, null, 2]
```

**Example 3:**

```java
Input:
["Array", 1, "getSize", "getCapacity", "pushback", 1, "getSize", "getCapacity", "pushback", 2, "getSize", "getCapacity", "get", 1, "set", 1, 3, "get", 1, "popback", "getSize", "getCapacity"]

Output:
[null, 0, 1, null, 1, 1, null, 2, 2, 2, null, 3, 3, 1, 2]
```

**Note:**

- The index `i` provided to `get(int i)` and `set(int i)` is guaranteed to be greater than or equal to `0` and less than the number of elements in the array.

Acceptance Rate35.3%

Python

Python Python 3.14.2 Java Java 21 C++ C++ 23 JavaScript Node 22.08.0 C# C# 12 Go Go 1.23.5 Kotlin Kotlin 2.1.10 Swift Swift 6.1.0

Auto

Solution 1

+

NeetBot\|

Hint

\|\|Ln 1, Col 1

- Test Case
- Output

× Case 1× Case 2× Case 3

Input 1 =

Console

RunSubmit

# Editor Settings

### Font Size

Choose the font size of the editor.

16px

12px  13px  14px  15px  16px  17px  18px  19px  20px  21px  22px  23px  24px

### Tab Size

Update the default tab size of the editor.

4 Spaces

2 Spaces  4 Spaces

### Editor Key Bindings

Switch to Vim key bindings.

Normal

Normal  Vim

### Relative Line Numbers

Show line numbers relative to the cursor (useful for Vim motions).

### IntelliSense

Type-aware completions, signature help, and error highlighting.

### AI Features

Show AI chat, hints and suggest fix buttons.

### Ask NeetBot on Selection

Show Ask NeetBot popup when highlighting code.

### Celebration Animation

Show celebration animation on accepted submissions.

Close

# Delete Course Progress

Are you sure you want to delete your course progress? This will remove all of your progress for this course only.

Delete  Cancel

# Reset Code

This will reset your solution for **Design Dynamic Array (Resizable Array)** back to the starter code.

To reset code for all problems, visit your [profile page](https://neetcode.io/profile).

Reset  Cancel

# Close Solution

Are you sure you want to close this solution? Your code will be lost.

Close  Cancel

# Language Info

Python 3.14.2

Python does not have built-in **Tree Set** or **Tree Map** data structures so you may use [python-sortedcontainers](https://github.com/grantjenks/python-sortedcontainers) instead.

OK

## Daily Streak!

0days

You're building a habit. Stay consistent!

Continue

Remove from GitHub

Removing sync will delete this file from your GitHub repo.

Remove  Close

# Complexity Analysis

Close

# Clear Problem History

This will permanently clear your history for **Design Dynamic Array (Resizable Array)** and cannot be undone.

It will remove all submissions, delete saved code across all languages, and mark this problem as incomplete.

Clear History  Cancel

# Replace Editor Code?

Your current editor code differs from this submission.

Continuing will replace your editor code with the submission code to show the suggested fix.

Replace & Continue  Cancel

# Test Case 0

Input:

Your Output

Correct Output

Close

# Share interview details

Step 1 of 4

Which company asked this question?

No matching companies.

Close