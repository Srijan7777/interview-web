[Practice](https://workat.tech/practice)

[Data Structures and Algorithms](https://workat.tech/problem-solving/practice) [Machine Coding Round (LLD)](https://workat.tech/machine-coding/practice) [System Design & Architecture (HLD)](https://workat.tech/system-design/practice) [Frontend UI Machine Coding](https://workat.tech/frontend-development/practice)

[Resources](https://workat.tech/resources)

[Career Advice and Roadmaps](https://workat.tech/general) [Data Structures and Algorithms](https://workat.tech/problem-solving) [Machine Coding Round (LLD)](https://workat.tech/machine-coding) [System Design & Architecture (HLD)](https://workat.tech/system-design) [Backend Development](https://workat.tech/backend-development) [Frontend Development](https://workat.tech/frontend-development) [Project Ideas for Software Developers](https://workat.tech/project-ideas) [Core Computer Science](https://workat.tech/core-cs)

[Companies](https://workat.tech/company)

[SDE Jobs & Internships](https://workat.tech/jobs) [Interview Questions](https://workat.tech/problem-solving/practice/companies) [Compare Companies](https://workat.tech/compare)

[IDE](https://workat.tech/ide)

[Online IDE](https://workat.tech/ide) [Collaborative IDE](https://workat.tech/collab/ide)

Login

# Design Splitwise \| Machine Coding Round Questions (SDE I/II)

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

Create an expense sharing application.

An expense sharing application is where you can add your expenses and split it among different people. The app
keeps balances between people as in who owes how much to whom.

### Example

```
You live with 3 other friends.
You: User1 (id: u1)
Flatmates: User2 (u2), User3 (u3), User4 (u4)

This month's electricity bill was Rs. 1000.
Now you can just go to the app and add that you paid 1000,
select all the 4 people and then select split equally.
Input: u1 1000 4 u1 u2 u3 u4 EQUAL

For this transaction, everyone owes 250 to User1.
The app should update the balances in each of the profiles accordingly.

User2 owes User1: 250 (0+250)
User3 owes User1: 250 (0+250)
User4 owes User1: 250 (0+250)

---

Now, It is the BBD sale on Flipkart and there is an offer on your card.
You buy a few stuffs for User2 and User3 as they asked you to.
The total amount for each person is different.
Input: u1 1250 2 u2 u3 EXACT 370 880

For this transaction, User2 owes 370 to User1 and User3 owes 880 to User1.

The app should update the balances in each of the profiles accordingly.
User2 owes User1: 620 (250+370)
User3 owes User1: 1130 (250+880)
User4 owes User1: 250 (250+0)

---

Now, you go out with your flatmates and take your brother/sister along with you.
User4 pays and everyone splits equally. You owe for 2 people.
Input: u4 1200 4 u1 u2 u3 u4 PERCENT 40 20 20 20

For this transaction, User1 owes 480 to User4, User2 owes 240 to User4 and User3 owes 240 to User4.

The app should update the balances in each of the profiles accordingly.
User1 owes User4: 230 (250-480)
User2 owes User1: 620 (620+0)
User2 owes User4: 240 (0+240)
User3 owes User1: 1130 (1130+0)
User3 owes User4: 240 (0+240)

```

### Requirements

- User: Each user should have a userId, name, email, mobile number.
- Expense: Could either be EQUAL, EXACT or PERCENT
- Users can add any amount, select any type of expense and split with any of the available users.
- The percent and amount provided could have decimals upto two decimal places.
- In case of percent, you need to verify if the total sum of percentage shares is 100 or not.
- In case of exact, you need to verify if the total sum of shares is equal to the total amount or not.
- The application should have a capability to show expenses for a single user as well as balances for
everyone.

- When asked to show balances, the application should show balances of a user with all the users where there
is a non-zero balance.

- The amount should be rounded off to two decimal places. Say if User1 paid 100 and amount is split equally
among 3 people. Assign 33.34 to first person and 33.33 to others.


### Input

- You can create a few users in your main method. No need to take it as input.
- There will be 3 types of input:
  - Expense in the format: `EXPENSE <user-id-of-person-who-paid> <no-of-users> <space-separated-list-of-users> <EQUAL/EXACT/PERCENT> <space-separated-values-in-case-of-non-equal>`
  - Show balances for all: `SHOW`
  - Show balances for a single user: `SHOW <user-id>`

### Output

- When asked to show balance for a single user. Show all the balances that user is part of:
- Format: `<user-id-of-x> owes <user-id-of-y>: <amount>`
- If there are no balances for the input, print `No balances`
- In cases where the user for which balance was asked for, owes money, they’ll be x. They’ll be y otherwise.

### Sample Input

```
SHOW
SHOW u1
EXPENSE u1 1000 4 u1 u2 u3 u4 EQUAL
SHOW u4
SHOW u1
EXPENSE u1 1250 2 u2 u3 EXACT 370 880
SHOW
EXPENSE u4 1200 4 u1 u2 u3 u4 PERCENT 40 20 20 20
SHOW u1
SHOW
```

### Sample Output

```
No balances
No balances
User4 owes User1: 250
User2 owes User1: 250
User3 owes User1: 250
User4 owes User1: 250
User2 owes User1: 620
User3 owes User1: 1130
User4 owes User1: 250
User1 owes User4: 230
User2 owes User1: 620
User3 owes User1: 1130
User1 owes User4: 230
User2 owes User1: 620
User2 owes User4: 240
User3 owes User1: 1130
User3 owes User4: 240
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

**Please do these only if you’ve time left.** You can write your code such that these could be accommodated without
changing your code much.

- A way to add an expense name while adding the expense. Can also add notes, images, etc.
- Option to split by share. Ex: ‘User4 pays and everyone splits equally. You pay for 2 people.’ could be added as: `u4 1200 4 u1 u2 u3 u4 SHARE 2 1 1 1`
- A way to show the passbook for a user. The entries should show all the transactions a user was part of. You can print in any format you like.
- There can be an option to simplify expenses. When simplify expenses is turned on (is true), the balances should get simplified. Ex: ‘User1 owes 250 to User2 and User2 owes 200 to User3’ should simplify to ‘User1 owes 50 to User2 and 200 to User3’.

### Setup process

Please go through the setup process [here](https://workattech.github.io/machine-coding-feedback/#setup).

### Submission

- Try to solve it within 1.5 hours.
- Please go through the submission process [here](https://workattech.github.io/machine-coding-feedback/#submission).

3

![Gaurav Chandak](https://lh6.googleusercontent.com/-0pqq1NN5qK4/AAAAAAAAAAI/AAAAAAAALr8/xW9PmtNCGjw/s96-c/photo.jpg)

Gaurav Chandak

Gaurav is the co-founder of workat.tech and has previously worked at Flipkart and Microsoft. He intends to actively contribute to the future of education through workat.tech.

Related Content

[![](https://workat.tech/machine-coding/practice/splitwise-problem-0kp2yneec2q2)\\
\\
Design Snake And Ladder \| Machine Coding Round Questions (SDE I)](https://workat.tech/machine-coding/practice/snake-and-ladder-problem-zgtac9lxwntg) [![](https://workat.tech/machine-coding/practice/splitwise-problem-0kp2yneec2q2)\\
\\
Design Trello \| Machine Coding Round Questions (SDE II)](https://workat.tech/machine-coding/practice/trello-problem-t0nwwqt61buz) [![](https://workat.tech/machine-coding/practice/splitwise-problem-0kp2yneec2q2)\\
\\
Design Chess Validator \| Machine Coding Round Questions (SDE I/II)](https://workat.tech/machine-coding/practice/design-chess-validator-to77d8oqpx2h)

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