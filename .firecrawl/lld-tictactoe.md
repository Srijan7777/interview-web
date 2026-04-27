[Practice](https://workat.tech/practice)

[Data Structures and Algorithms](https://workat.tech/problem-solving/practice) [Machine Coding Round (LLD)](https://workat.tech/machine-coding/practice) [System Design & Architecture (HLD)](https://workat.tech/system-design/practice) [Frontend UI Machine Coding](https://workat.tech/frontend-development/practice)

[Resources](https://workat.tech/resources)

[Career Advice and Roadmaps](https://workat.tech/general) [Data Structures and Algorithms](https://workat.tech/problem-solving) [Machine Coding Round (LLD)](https://workat.tech/machine-coding) [System Design & Architecture (HLD)](https://workat.tech/system-design) [Backend Development](https://workat.tech/backend-development) [Frontend Development](https://workat.tech/frontend-development) [Project Ideas for Software Developers](https://workat.tech/project-ideas) [Core Computer Science](https://workat.tech/core-cs)

[Companies](https://workat.tech/company)

[SDE Jobs & Internships](https://workat.tech/jobs) [Interview Questions](https://workat.tech/problem-solving/practice/companies) [Compare Companies](https://workat.tech/compare)

[IDE](https://workat.tech/ide)

[Online IDE](https://workat.tech/ide) [Collaborative IDE](https://workat.tech/collab/ide)

Login

# Design Tic-Tac-Toe \| Machine Coding Round Questions (SDE I)

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

Let's look at the game of Tic Tac Toe. Tic Tac Toe is a two-player strategy game played on a 3\*3 grid. There are 9 empty cells and 9 pieces - 5 pieces of 'X' and 4 pieces of 'O'

The game starts with an empty grid.

### Rules of the game

- The game is played between two players. One player owns the X pieces and can put it on any of the empty cells in the grid. The other player owns the O pieces and can in any of the empty cells.
- The player with X makes the first turn. Each player plays alternately after that.
- The first player to form a horizontal/vertical/diagonal sequence wins.

### Requirements

Create a command-line application for tic tac toe with the following requirements:

- Ask the user for the names of the two players
- Print the grid after initializing
- Allow the user to make moves on behalf of both the players.

  - The user will make a move by entering the cell position.
  - You need to determine the piece (X/O) and make the move if it is valid.
  - Valid move:

    - The piece is controlled by the player having the current turn
    - The cell is empty

  - If the move is invalid

    - print 'Invalid Move'
    - the same player plays again

  - If the move is valid:
    - put the piece on the cell
    - print the board after the move

- Determine if a player has won or if there are no valid moves left. Ignore all moves mentioned after that.

A position in the cell is represented by two values: row number (1-3) and column number (1-3).

##### Examples

- 3 1 represents the cell at the extreme bottom-left (3rd row, 1st column)
- 1 3 represents the cell at the extreme top-right (1st row, 3rd column)

### Input/Output Format

The code should strictly follow the input/output format and will be tested with provided test cases.

#### Input Format

Multiple lines with each line containing the Cell Position. The row and column numbers will be separated by a space.

Stop taking the input when you encounter the word exit.

#### Output Format

Print the initial grid. This would be followed by the grid after each move. In case of an invalid move, do not print the grid and instead print:

Invalid Move

The board needs to be printed in the following format based on the respective position:

```
X X O
- - X
O O -
```

Here,

X and O represent the different pieces. An empty cell is represented by a hyphen (-).

The initial position of the board would be

```
- - -
- - -
- - -
```

If the player wins after a move, print: 'Player\_Name won the game'

If there are no valid moves left for any player, print 'Game Over'

### Examples

#### Sample Input

```
X Gaurav
O Sagar
2 2
1 3
1 1
1 2
2 2
3 3
exit
```

#### Expected Output

```
- - -
- - -
- - -
- - -
- X -
- - -
- - O
- X -
- - -
X - O
- X -
- - -
X O O
- X -
- - -
Invalid Move
X O O
- X -
- - X
Gaurav won the game
```

#### Sample Input

```
X Gaurav
O Sagar
2 3
1 2
2 2
2 1
1 1
3 3
3 2
3 1
1 3
exit
```

#### Expected Output

```
- - -
- - -
- - -
- - -
- - X
- - -
- O -
- - X
- - -
- O -
- X X
- - -
- O -
O X X
- - -
X O -
O X X
- - -
X O -
O X X
- - O
X O -
O X X
- X O
X O X
O X X
O X O
Game Over
```

#### Sample Input

```
X Gaurav
O Sagar
exit
```

#### Expected Output

```
- - -
- - -
- - -
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

### Optional Requirements

**Please do these only if you’ve time left.** You can write your code such that these could be accommodated without changing your code much.

- Keep the code extensible to change the size of the grid.
- Keep the code extensible to allow different types of pieces.
- Keep the code extensible to allow more than 2 players/piece types.

1

![Gaurav Chandak](https://lh6.googleusercontent.com/-0pqq1NN5qK4/AAAAAAAAAAI/AAAAAAAALr8/xW9PmtNCGjw/s96-c/photo.jpg)

Gaurav Chandak

Gaurav is the co-founder of workat.tech and has previously worked at Flipkart and Microsoft. He intends to actively contribute to the future of education through workat.tech.

Related Content

[![](https://workat.tech/machine-coding/practice/design-tic-tac-toe-smyfi9x064ry)\\
\\
Design 2048 Game \| Machine Coding Round Questions (SDE I)](https://workat.tech/machine-coding/practice/design-2048-game-osycd22zpn1y) [![](https://workat.tech/machine-coding/practice/design-tic-tac-toe-smyfi9x064ry)\\
\\
Design Snake And Ladder \| Machine Coding Round Questions (SDE I)](https://workat.tech/machine-coding/practice/snake-and-ladder-problem-zgtac9lxwntg) [![](https://workat.tech/machine-coding/practice/design-tic-tac-toe-smyfi9x064ry)\\
\\
Design Chess Validator \| Machine Coding Round Questions (SDE I/II)](https://workat.tech/machine-coding/practice/design-chess-validator-to77d8oqpx2h)

[![SDE Bootcamp - Become a software engineer at a product-based company](https://workat.tech/machine-coding/practice/design-tic-tac-toe-smyfi9x064ry)\\
\\
Practice Machine Coding](https://workat.tech/machine-coding/practice)

[![Learning Resources](https://workat.tech/machine-coding/practice/design-tic-tac-toe-smyfi9x064ry)\\
\\
Interview Prep Resources](https://workat.tech/resources)

[![Community](https://workat.tech/machine-coding/practice/design-tic-tac-toe-smyfi9x064ry)\\
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