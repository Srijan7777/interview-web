[Practice](https://workat.tech/practice)

[Data Structures and Algorithms](https://workat.tech/problem-solving/practice) [Machine Coding Round (LLD)](https://workat.tech/machine-coding/practice) [System Design & Architecture (HLD)](https://workat.tech/system-design/practice) [Frontend UI Machine Coding](https://workat.tech/frontend-development/practice)

[Resources](https://workat.tech/resources)

[Career Advice and Roadmaps](https://workat.tech/general) [Data Structures and Algorithms](https://workat.tech/problem-solving) [Machine Coding Round (LLD)](https://workat.tech/machine-coding) [System Design & Architecture (HLD)](https://workat.tech/system-design) [Backend Development](https://workat.tech/backend-development) [Frontend Development](https://workat.tech/frontend-development) [Project Ideas for Software Developers](https://workat.tech/project-ideas) [Core Computer Science](https://workat.tech/core-cs)

[Companies](https://workat.tech/company)

[SDE Jobs & Internships](https://workat.tech/jobs) [Interview Questions](https://workat.tech/problem-solving/practice/companies) [Compare Companies](https://workat.tech/compare)

[IDE](https://workat.tech/ide)

[Online IDE](https://workat.tech/ide) [Collaborative IDE](https://workat.tech/collab/ide)

Login

# Design a Distributed Queue \| Kafka \| Machine Coding Round Questions (SDE II/III)

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

Design an In-Memory Distributed Queue like Kafka.

### Requirements

- The queue should be in-memory and should not require access to the file system.
- There can be multiple topics in the queue.
- A (string) message can be published on a topic by a producer/publisher and consumers/subscribers can subscribe to the topic to receive the messages.
- There can be multiple producers and consumers.
- A producer can publish to multiple topics.
- A consumer can listen to multiple topics.
- The consumer should print "<consumer\_id> received <message>" on receiving the message.
- The queue system should be multi-threaded, i.e., messages can be produced or consumed in parallel by different producers/consumers.

### Input/Output Format

- You do not need to take input from the command-line.
- Create 2 topics: topic1 and topic2
- Create 2 producers: producer1, and producer2
- Create 5 consumers: consumer1, consumer2, consumer3, consumer4, and consumer5
- Make all 5 consumers subscribe to topic1
- Make consumers 1, 3, and 4 subscribe to topic2
- Make producer1 publish message "Message 1" to topic1
- Make producer1 publish message "Message 2" to topic1
- Make producer2 publish message "Message 3" to topic1
- Make producer1 publish message "Message 4" to topic2
- Make producer2 publish message "Message 5" to topic2

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

### Optional Requirements

- Allow consumer groups. A consumer group can have multiple consumers and consumers mention their consumer group while subscribing to a topic. A message can be consumed by only one consumer per consumer group.

![Gaurav Chandak](https://lh6.googleusercontent.com/-0pqq1NN5qK4/AAAAAAAAAAI/AAAAAAAALr8/xW9PmtNCGjw/s96-c/photo.jpg)

Gaurav Chandak

Gaurav is the co-founder of workat.tech and has previously worked at Flipkart and Microsoft. He intends to actively contribute to the future of education through workat.tech.

Related Content

[![](https://workat.tech/machine-coding/practice/design-distributed-queue-cuudq0sk0v14)\\
\\
Design an In-Memory Key-Value Store \| Machine Coding Round Questions (SDE II/III)](https://workat.tech/machine-coding/practice/design-key-value-store-6gz6cq124k65) [![](https://workat.tech/machine-coding/practice/design-distributed-queue-cuudq0sk0v14)\\
\\
Design Chess Validator \| Machine Coding Round Questions (SDE I/II)](https://workat.tech/machine-coding/practice/design-chess-validator-to77d8oqpx2h) [![](https://workat.tech/machine-coding/practice/design-distributed-queue-cuudq0sk0v14)\\
\\
Design a Library Management System \| Machine Coding Round Questions (SDE II)](https://workat.tech/machine-coding/practice/design-library-management-system-jgjrv8q8b136)

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