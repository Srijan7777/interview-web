[Practice](https://workat.tech/practice)

[Data Structures and Algorithms](https://workat.tech/problem-solving/practice) [Machine Coding Round (LLD)](https://workat.tech/machine-coding/practice) [System Design & Architecture (HLD)](https://workat.tech/system-design/practice) [Frontend UI Machine Coding](https://workat.tech/frontend-development/practice)

[Resources](https://workat.tech/resources)

[Career Advice and Roadmaps](https://workat.tech/general) [Data Structures and Algorithms](https://workat.tech/problem-solving) [Machine Coding Round (LLD)](https://workat.tech/machine-coding) [System Design & Architecture (HLD)](https://workat.tech/system-design) [Backend Development](https://workat.tech/backend-development) [Frontend Development](https://workat.tech/frontend-development) [Project Ideas for Software Developers](https://workat.tech/project-ideas) [Core Computer Science](https://workat.tech/core-cs)

[Companies](https://workat.tech/company)

[SDE Jobs & Internships](https://workat.tech/jobs) [Interview Questions](https://workat.tech/problem-solving/practice/companies) [Compare Companies](https://workat.tech/compare)

[IDE](https://workat.tech/ide)

[Online IDE](https://workat.tech/ide) [Collaborative IDE](https://workat.tech/collab/ide)

Login

# Design Trello \| Machine Coding Round Questions (SDE II)

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

Create a project management application (like Trello).

A project management application (like Trello) is where you can manage your project by tracking smaller
tasks.

![](https://wat-images.s3.ap-south-1.amazonaws.com/images/blogs/trello-example.jpg)

- The app contains multiple boards to signify different projects
- Each board contains different lists to signify sub-project
- Each list contain different cards signifying smaller tasks
- Each card can be assigned to a user or may remain unassigned

### Requirements

- User: Each user should have a userId, name, email.
- Board: Each board should have a id, name, privacy (PUBLIC/PRIVATE), url, members, lists
- List: Each list should have a id, name and cards
- Card: Each card should have a id, name, description, assigned user
- We should be able to create/delete boards, add/remove people from the members list and modify attributes.
Deleting a board should delete all lists inside it.

- We should be able to create/delete lists and modify attributes. Deleting a list should delete all cards
inside it.

- We should be able to create/delete cards, assign/unassign a member to the card and modify attributes
- We should also be able to move cards across lists in the same board
- Ability to show all boards, a single board, a single list and a single card
- Default privacy should be public
- Cards should be unassigned by default
- Ids should be auto-generated for board/list/card
- URLs should get created based on the id

### Input

- You can create a few users in your main method. No need to take it as input.
- There will be different types of input:
  - BOARD CREATE
  - BOARD <name/privacy>
  - BOARD <ADD\_MEMBER/REMOVE\_MEMBER>
  - BOARD DELETE
  - LIST CREATE
  - LIST
  - LIST DELETE
  - CARD CREATE
  - CARD <name/description>
  - CARD ASSIGN
  - CARD UNASSIGN
  - CARD MOVE
  - CARD DELETE
  - SHOW
  - SHOW BOARD
  - SHOW LIST
  - SHOW CARD
- If you want you create these in the main method without taking user input.

### Output

- CREATE operations should print the id after creation
- SHOW should print all the boards with all the lists inside them and all the cards inside all the lists
(including all the attributes)

- SHOW <BOARD/LIST> should print that specific entity and everything inside it (including all the
attributes)

- SHOW CARD should print all the attributes of the card
- You can use any format to print these. Printing in json is not compulsory.

### Sample Input

```
SHOW
BOARD CREATE work@tech
SHOW BOARD 5da1583ec25d2a7e246b0375
SHOW
BOARD 5da1583ec25d2a7e246b0375 name workat.tech
BOARD 5da1583ec25d2a7e246b0375 privacy PRIVATE
SHOW BOARD 5da1583ec25d2a7e246b0375
BOARD CREATE workat
SHOW
BOARD 5da1583ec25d2a7e246b0375 ADD_MEMBER user1
BOARD 5da1583ec25d2a7e246b0375 ADD_MEMBER user2
BOARD 5da1583ec25d2a7e246b0375 ADD_MEMBER user3
BOARD 5da1583ec25d2a7e246b0375 REMOVE_MEMBER user2
SHOW BOARD 5da1583ec25d2a7e246b0375
BOARD DELETE 5da1586caaaad00d9b2d7aa6
SHOW BOARD 5da1586caaaad00d9b2d7aa6
SHOW
LIST CREATE 5da1583ec25d2a7e246b0375 Mock Interviews
SHOW LIST 5da1583547c78c15a1408df2
LIST 5da1583547c78c15a1408df2 name Mock Interviews - Applied
SHOW LIST 5da1583547c78c15a1408df2
LIST CREATE 5da1583ec25d2a7e246b0375 Mock Interviews - Scheduled
SHOW BOARD 5da1583ec25d2a7e246b0375
CARD CREATE 5da1583547c78c15a1408df2 abcd@gmail.com
CARD CREATE 5da1583547c78c15a1408df2 abcda@gmail.com
SHOW LIST 5da1583547c78c15a1408df2
CARD 5da1583547c78c15a14kj78g name abcde@gmail.com
CARD 5da1583547c78c15a14kj78g description At 7PM
SHOW LIST 5da1583547c78c15a1408df2
CARD 5da1583547c78c15a14kjsd8 ASSIGN gaurav@workat.tech
SHOW CARD 5da1583547c78c15a14kjsd8
CARD 5da1583547c78c15a14kjsd8 MOVE 5da1583547c78c15a143hj34
SHOW LIST 5da1583547c78c15a1408df2
SHOW LIST 5da1583547c78c15a143hj34
CARD 5da1583547c78c15a14kjsd8 UNASSIGN
SHOW CARD 5da1583547c78c15a14kjsd8
SHOW
```

### Sample Output

```
No boards
Created board: 5da1583ec25d2a7e246b0375
{"id": "5da1583ec25d2a7e246b0375", "name": "work@tech", "privacy": "PUBLIC"}
[{"id": "5da1583ec25d2a7e246b0375", "name": "work@tech", "privacy": "PUBLIC"}]
{"id": "5da1583ec25d2a7e246b0375", "name": "workat.tech", "privacy": "PRIVATE"}
Created board: 5da1586caaaad00d9b2d7aa6
[{"id": "5da1583ec25d2a7e246b0375", "name": "workat.tech", "privacy": "PRIVATE"}, {"id": "5da1586caaaad00d9b2d7aa6","name": "workat", "privacy": "PUBLIC"}]
{"id": "5da1583ec25d2a7e246b0375", "name": "workat.tech", "privacy": "PRIVATE", "members": [{"id": "user1", "name":"Gaurav Chandak", "email": "gaurav@workat.tech"}, {"id": "user3", "name": "Sagar Jain", "email":"sagar@workat.tech"}]}
Board 5da1586caaaad00d9b2d7aa6 does not exist
[{"id": "5da1583ec25d2a7e246b0375", "name": "workat.tech", "privacy": "PRIVATE", "members": [{"id": "user1", "name":"Gaurav Chandak", "email": "gaurav@workat.tech"}, {"id": "user3", "name": "Sagar Jain", "email":"sagar@workat.tech"}]}]
Created list: 5da1583547c78c15a1408df2
{"id": "5da1583547c78c15a1408df2", "name": "Mock Interviews"}
{"id": "5da1583547c78c15a1408df2", "name": "Mock Interviews - Applied"}
Created list: 5da1583547c78c15a143hj34
{"id": "5da1583ec25d2a7e246b0375", "name": "workat.tech", "privacy": "PRIVATE", "lists"": [{"id":"5da1583547c78c15a1408df2", "name": "Mock Interviews - Applied"}, {"id": "5da1583547c78c15a143hj34", "name": "MockInterviews - Scheduled"}] "members": [{"id": "user1", "name": "Gaurav Chandak", "email": "gaurav@workat.tech"},\
{"id": "user3", "name": "Sagar Jain", "email": "sagar@workat.tech"}]}
Created card: 5da1583547c78c15a14kjsd8
Created card: 5da1583547c78c15a14kj78g
{"id": "5da1583547c78c15a1408df2", "name": "Mock Interviews - Applied", "cards": [{"id": "5da1583547c78c15a14kjsd8","name": "abcd@gmail.com"}, {"id": "5da1583547c78c15a14kj78g", "name": "abcda@gmail.com"}]}
{"id": "5da1583547c78c15a1408df2", "name": "Mock Interviews - Applied", "cards": [{"id": "5da1583547c78c15a14kjsd8","name": "abcd@gmail.com"}, {"id": "5da1583547c78c15a14kj78g", "name": "abcde@gmail.com", "description": "At 7PM"}]}
{"id": "5da1583547c78c15a14kjsd8", "name": "abcd@gmail.com", "assignedTo": "gaurav@workat.tech"}
{"id": "5da1583547c78c15a1408df2", "name": "Mock Interviews - Applied", "cards": [{"id": "5da1583547c78c15a14kj78g","name": "abcde@gmail.com", "description": "At 7PM"}]}
{"id": "5da1583547c78c15a143hj34", "name": "Mock Interviews - Scheduled", "cards": [{"id":"5da1583547c78c15a14kjsd8", "name": "abcd@gmail.com", "assignedTo": "gaurav@workat.tech"}]}
{"id": "5da1583547c78c15a14kjsd8", "name": "abcd@gmail.com"}
```

### Expectations

- Make sure that you have a working and demonstrable code
- Make sure that the code is functionally correct
- Code should be modular and readable
- Separation of concern should be addressed
- Please do not write everything in a single file
- Code should easily accommodate new requirements and minimal changes
- There should be a main method from where the code could be easily testable
- \[Optional\] Write unit tests, if possible
- No need to create a GUI

### Optional Requirements

**Please do these only if you’ve time left.** You can write your code such that these could be accommodated
without changing your code much.

- Ability to clone a list with all the cards in it. All of these should have a different id.
- Ability to delete all the cards in a list without deleting the list.
- Option to add tags to a card and ability to get cards based on assigned tags.
- Ability to find all the cards assigned to a particular user.

### Setup process

Please go through the setup process [here](https://workattech.github.io/machine-coding-feedback/#setup).

### Submission

- Try to solve it within 1.5 hours.
- Please go through the submission process [here](https://workattech.github.io/machine-coding-feedback/#submission).

![Gaurav Chandak](https://lh6.googleusercontent.com/-0pqq1NN5qK4/AAAAAAAAAAI/AAAAAAAALr8/xW9PmtNCGjw/s96-c/photo.jpg)

Gaurav Chandak

Gaurav is the co-founder of workat.tech and has previously worked at Flipkart and Microsoft. He intends to actively contribute to the future of education through workat.tech.

Related Content

[![](https://workat.tech/machine-coding/practice/trello-problem-t0nwwqt61buz)\\
\\
Design Snake And Ladder \| Machine Coding Round Questions (SDE I)](https://workat.tech/machine-coding/practice/snake-and-ladder-problem-zgtac9lxwntg) [![](https://workat.tech/machine-coding/practice/trello-problem-t0nwwqt61buz)\\
\\
Design Splitwise \| Machine Coding Round Questions (SDE I/II)](https://workat.tech/machine-coding/practice/splitwise-problem-0kp2yneec2q2) [![](https://workat.tech/machine-coding/practice/trello-problem-t0nwwqt61buz)\\
\\
Design a Parking Lot \| Machine Coding Round Questions (SDE I/II)](https://workat.tech/machine-coding/practice/design-parking-lot-qm6hwq4wkhp8)

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