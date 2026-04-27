[Practice](https://workat.tech/practice)

[Data Structures and Algorithms](https://workat.tech/problem-solving/practice) [Machine Coding Round (LLD)](https://workat.tech/machine-coding/practice) [System Design & Architecture (HLD)](https://workat.tech/system-design/practice) [Frontend UI Machine Coding](https://workat.tech/frontend-development/practice)

[Resources](https://workat.tech/resources)

[Career Advice and Roadmaps](https://workat.tech/general) [Data Structures and Algorithms](https://workat.tech/problem-solving) [Machine Coding Round (LLD)](https://workat.tech/machine-coding) [System Design & Architecture (HLD)](https://workat.tech/system-design) [Backend Development](https://workat.tech/backend-development) [Frontend Development](https://workat.tech/frontend-development) [Project Ideas for Software Developers](https://workat.tech/project-ideas) [Core Computer Science](https://workat.tech/core-cs)

[Companies](https://workat.tech/company)

[SDE Jobs & Internships](https://workat.tech/jobs) [Interview Questions](https://workat.tech/problem-solving/practice/companies) [Compare Companies](https://workat.tech/compare)

[IDE](https://workat.tech/ide)

[Online IDE](https://workat.tech/ide) [Collaborative IDE](https://workat.tech/collab/ide)

Login

# Design an In-Memory Key-Value Store \| Machine Coding Round Questions (SDE II/III)

![Gaurav Chandak](https://lh6.googleusercontent.com/-0pqq1NN5qK4/AAAAAAAAAAI/AAAAAAAALr8/xW9PmtNCGjw/s96-c/photo.jpg)

Gaurav Chandak

> **Machine Coding Round Complete Guide**
>
> - [What is a Machine Coding Round?](https://workat.tech/machine-coding/article/what-is-a-machine-coding-round-omfn1w54ojlg)
> - [How to prepare for Machine Coding Round?](https://workat.tech/machine-coding/article/how-to-prepare-for-machine-coding-round-naf2ih7a9e5l)
> - [How to clear the Machine Coding Round?](https://workat.tech/machine-coding/article/how-to-ace-machine-coding-round-hi8lnpp8tlmo)
> - [Machine Coding Round Interview Practice Questions](https://workat.tech/machine-coding/article/how-to-practice-for-machine-coding-kp0oj3sw2jca)
> - [Machine Coding Round Interview Solutions/Editorials](https://workat.tech/machine-coding)

### Problem Statement

Design an In-Memory Key-Value Store like Redis.

### Requirements

- The key-value store will be in-memory and does not require access to the file system.
- The key will always be a string.
- The value would be an object/map. The object would have attributes and corresponding values.

Example => `"sde_bootcamp": { "title": "SDE-Bootcamp", "price": 30000.00, "enrolled": false, "estimated_time": 30 }`
- Each attribute key would be a string and the attribute values could be string, integer, double or boolean.
- The key-value store should be thread-safe.
- The Key-Value store should expose the following functions:

  - `get(String key)` =\> Should return the value (object with attributes and their values). Return null if key not present
  - `search(String attributeKey, String attributeValue)` =\> Returns a list of keys that have the given attribute key, value pair.
  - `put(String key, List<Pair<String, String>> listOfAttributePairs)` =\> Adds the key and the attributes to the key-value store. If the key already exists then the value is replaced.
  - `delete(String key)` =\> Deletes the key, value pair from the store.
  - `keys()` =\> Return a list of all the keys

- The value object should override the toString method to print the object as a comma-separated list of key-value pairs for the attributes.

Example: attribute1: attribute\_value\_1, attribute2: attribute\_value\_2, attribute3: attribute\_value\_3
- The data type of an attribute should get fixed after its first occurrence. Example: Once we encounter an attribute age with an integer value then any entry with an age attribute having a non-integer value should result in an exception.
- Nothing should be printed inside any of these methods. All scanning and printing should happen in the Driver/Main class only. Exception Handling should also happen in the Driver/Main class.

### Input/Output Format

The code should strictly follow the input/output format and will be tested with provided test cases.

#### Input Format

Multiple lines with each line containing a command.

Possible commands:

- `get <key>`
- `put <key> <attributeKey1> <attributeValue1> <attributeKey2> <attributeValue2>....`
- `delete <key>`
- `search <attributeKey> <attributeValue>`
- `keys`
- `exit`

Stop taking the input when you encounter the word exit.

Assume that attribute keys and values would not have space in between.

#### Output Format

Print output based on the specific commands as mentioned below.

##### get

Comma and space-separated attributes. Example:

```
attribute1: attribute_value_1, attribute2: attribute_value_2, attribute3: attribute_value_3
```

Print "`No entry found for <key>`" if get returns null.

##### put

Do not print anything. Print "`Data Type Error`" if attribute has data type other than previous set.

##### delete

Do not print anything.

##### search

Comma-separated keys. Example:

```
key1,key2,key3,key4
```

Print in sorted order

##### keys

Comma-separated keys. Example:

```
key1,key2,key3,key4
```

Print in sorted order

### Example

#### Sample Input

```
put sde_bootcamp title SDE-Bootcamp price 30000.00 enrolled false estimated_time 30
get sde_bootcamp
keys
put sde_kickstart title SDE-Kickstart price 4000 enrolled true estimated_time 8
get sde_kickstart
keys
put sde_kickstart title SDE-Kickstart price 4000.00 enrolled true estimated_time 8
get sde_kickstart
keys
delete sde_bootcamp
get sde_bootcamp
keys
put sde_bootcamp title SDE-Bootcamp price 30000.00 enrolled true estimated_time 30
search price 30000.00
search enrolled true
```

#### Expected Output

```
title: SDE-Bootcamp, price: 30000.00, enrolled: false, estimated_time: 30
sde_bootcamp
Data Type Error
No entry found for sde_kickstart
sde_bootcamp
title: SDE-Kickstart, price: 4000.00, enrolled: true, estimated_time: 8
sde_bootcamp,sde_kickstart
No entry found for sde_bootcamp
sde_kickstart
sde_bootcamp
sde_bootcamp,sde_kickstart
```

### Expectations

- Make sure that you have a working and demonstrable code
- Make sure that the code is functionally correct
- Code should be modular and readable
- Separation of concern should be addressed
- Please do not write everything in a single file (if not coding in C/C++)
- Code should easily accommodate new requirements and minimal changes
- There should be a main method from where the code could be easily testable
- \[Optional\] Write unit tests, if possible
- No need to create a GUI

1

![Gaurav Chandak](https://lh6.googleusercontent.com/-0pqq1NN5qK4/AAAAAAAAAAI/AAAAAAAALr8/xW9PmtNCGjw/s96-c/photo.jpg)

Gaurav Chandak

Gaurav is the co-founder of workat.tech and has previously worked at Flipkart and Microsoft. He intends to actively contribute to the future of education through workat.tech.

Related Content

[![](https://workat.tech/machine-coding/practice/design-key-value-store-6gz6cq124k65)\\
\\
Design a Distributed Queue \| Kafka \| Machine Coding Round Questions (SDE II/III)](https://workat.tech/machine-coding/practice/design-distributed-queue-cuudq0sk0v14) [![](https://workat.tech/machine-coding/practice/design-key-value-store-6gz6cq124k65)\\
\\
Design Trello \| Machine Coding Round Questions (SDE II)](https://workat.tech/machine-coding/practice/trello-problem-t0nwwqt61buz) [![](https://workat.tech/machine-coding/practice/design-key-value-store-6gz6cq124k65)\\
\\
Design Splitwise \| Machine Coding Round Questions (SDE I/II)](https://workat.tech/machine-coding/practice/splitwise-problem-0kp2yneec2q2)

[![SDE Bootcamp - Become a software engineer at a product-based company](https://d2yjqys1j7uhg1.cloudfront.net/images/kickstart-program.svg)\\
\\
Practice Machine Coding](https://workat.tech/machine-coding/practice)

[![Learning Resources](https://d2yjqys1j7uhg1.cloudfront.net/images/books.svg)\\
\\
Interview Prep Resources](https://workat.tech/resources)

[![Community](https://d2yjqys1j7uhg1.cloudfront.net/images/community.svg)\\
\\
Join our community](https://workat.tech/discord)

[About](https://workat.tech/about)

[FAQs](https://workat.tech/faq)

[Terms](https://workat.tech/terms)

[Privacy](https://workat.tech/privacy)

[hi@workat.tech](mailto:hi@workat.tech)

Blog

- [Career Advice and Roadmaps](https://workat.tech/general)
- [Data Structures & Algorithms](https://workat.tech/problem-solving)
- [Machine Coding Round (LLD)](https://workat.tech/machine-coding)
- [System Design & Architecture](https://workat.tech/system-design)
- [Backend Development](https://workat.tech/backend-development)
- [Frontend Development](https://workat.tech/frontend-development)
- [Awesome Project Ideas](https://workat.tech/project-ideas)
- [Core Computer Science](https://workat.tech/core-cs)

Practice Questions

- [Machine Coding (LLD) Questions](https://workat.tech/machine-coding/practice)
- [System Design (HLD) Questions](https://workat.tech/system-design/practice)
- [Topic-wise DSA Questions](https://workat.tech/problem-solving/practice/topics)
- [Company-wise DSA Questions](https://workat.tech/problem-solving/practice/companies)
- [DSA Sheets (Curated Lists)](https://workat.tech/problem-solving/practice/lists)
- [JavaScript Interview Questions](https://workat.tech/frontend-development/article/top-javascript-interview-questions-answers-bt2553k4egca)
- [Frontend UI Machine Coding Questions](https://workat.tech/frontend-development/practice)

Online Compilers (IDE)

- [Online Java Compiler](https://workat.tech/ide/online-java-compiler)
- [Online C++ Compiler](https://workat.tech/ide/online-cpp-compiler)
- [Online C Compiler](https://workat.tech/ide/online-c-compiler)
- [Online Python Compiler](https://workat.tech/ide/online-python-compiler)
- [Online JavaScript Compiler](https://workat.tech/ide/online-javascript-compiler)

Topic-wise Problems

- [Dynamic Programming Interview Questions](https://workat.tech/problem-solving/topics/dynamic-programming/practice)
- [Linked List Interview Questions](https://workat.tech/problem-solving/topics/linked-lists/practice)
- [Graph Interview Questions](https://workat.tech/problem-solving/topics/graphs/practice)
- [Backtracking Interview Questions](https://workat.tech/problem-solving/topics/backtracking/practice)
- [Arrays Interview Questions](https://workat.tech/problem-solving/topics/arrays/practice)
- [Trees Interview Questions](https://workat.tech/problem-solving/topics/binary-trees/practice)

Company-wise Problems

- [Amazon Interview Questions](https://workat.tech/company/amazon/interview-questions/problem-solving)
- [Microsoft Interview Questions](https://workat.tech/company/microsoft/interview-questions/problem-solving)
- [Google Interview Questions](https://workat.tech/company/google/interview-questions/problem-solving)
- [Flipkart Interview Questions](https://workat.tech/company/flipkart/interview-questions/problem-solving)
- [Adobe Interview Questions](https://workat.tech/company/adobe/interview-questions/problem-solving)
- [Facebook Interview Questions](https://workat.tech/company/facebook/interview-questions/problem-solving)

DSA Sheets (Curated Lists)

- [Top Interview Questions](https://workat.tech/problem-solving/lists/top-interview-questions/practice)
- [FAANG Interview Questions](https://workat.tech/problem-solving/lists/faang-interview-questions/practice)
- [Most Asked Interview Questions](https://workat.tech/problem-solving/lists/most-asked-questions/practice)
- [6 month DSA Practice Sheet](https://workat.tech/problem-solving/lists/six-month-dsa-practice-sheet/practice)
- [3 month DSA Practice Sheet](https://workat.tech/problem-solving/lists/three-month-dsa-practice-sheet/practice)
- [Last minute DSA Practice Sheet](https://workat.tech/problem-solving/lists/one-week-dsa-practice-sheet/practice)

© 2020-2022 WORKATTECH TECHNOLOGIES PVT LTD\|ALL RIGHTS RESERVED