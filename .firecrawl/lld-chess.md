[Practice](https://workat.tech/practice)

[Data Structures and Algorithms](https://workat.tech/problem-solving/practice) [Machine Coding Round (LLD)](https://workat.tech/machine-coding/practice) [System Design & Architecture (HLD)](https://workat.tech/system-design/practice) [Frontend UI Machine Coding](https://workat.tech/frontend-development/practice)

[Resources](https://workat.tech/resources)

[Career Advice and Roadmaps](https://workat.tech/general) [Data Structures and Algorithms](https://workat.tech/problem-solving) [Machine Coding Round (LLD)](https://workat.tech/machine-coding) [System Design & Architecture (HLD)](https://workat.tech/system-design) [Backend Development](https://workat.tech/backend-development) [Frontend Development](https://workat.tech/frontend-development) [Project Ideas for Software Developers](https://workat.tech/project-ideas) [Core Computer Science](https://workat.tech/core-cs)

[Companies](https://workat.tech/company)

[SDE Jobs & Internships](https://workat.tech/jobs) [Interview Questions](https://workat.tech/problem-solving/practice/companies) [Compare Companies](https://workat.tech/compare)

[IDE](https://workat.tech/ide)

[Online IDE](https://workat.tech/ide) [Collaborative IDE](https://workat.tech/collab/ide)

Login

# Design Chess Validator \| Machine Coding Round Questions (SDE I/II)

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

Let's look at the game of Chess. Chess is a two-player strategy game played on an 8\*8 checkered board which looks something like this:

![](https://wat-images.s3.ap-south-1.amazonaws.com/images/machine-coding/chess/Chess_Init.png)

Image Source: This and all subsequent images are from Wikipedia

The game starts with the above board position.

### Rules of the game

- The game is played between two players. One player controls an army of white pieces and the other controls the army of black pieces.
- Each army includes the following pieces: 1 King, 1 Queen, 2 Knights, 2 Rooks, 2 Bishops, 8 Pawns
- Each piece has its own way of moving on the board.
- A player may move only to an empty cell unless it is trying to capture a piece of the other player.
- A piece is captured when a player moves to a position currently occupied by a piece of the opponent.
- Each player needs to move a piece in each turn.
- The game starts with the player owning the white pieces making the first move. After this, the players play alternate turns.
- There are more rules but it is outside the scope of this problem.

### Piece Moves

Let's look at all the valid moves of the different types of pieces.

#### Pawn

- A pawn can move to a cell which is one step immediately in front of it.
- If it is the first move of that pawn, it can move two positions to a cell in front. Both the cells in front of it needs to be unoccupied.
-  It can also move one step diagonally in front while capturing a piece of the opponent. The capture cannot happen without moving diagonally.
- Valid moves:

![](https://wat-images.s3.ap-south-1.amazonaws.com/images/machine-coding/chess/Chess_Pawn.png)

#### Knight

- A knight moves in an 'L' shape, i.e., two steps horizontally and one step vertically or two steps vertically and one step horizontally.
- The knight can leap over other pieces to land directly on the destination cell.
- Valid moves:

![](https://wat-images.s3.ap-south-1.amazonaws.com/images/machine-coding/chess/Chess_Knight.png)

#### Rook

- A rook can move any number of steps either horizontally or vertically without leaping over any other piece.
- Valid moves:

![](https://wat-images.s3.ap-south-1.amazonaws.com/images/machine-coding/chess/Chess_Rook.png)

#### Bishop

- A bishop can move any number of steps diagonally without leaping over any other piece.
- Valid moves:

![](https://wat-images.s3.ap-south-1.amazonaws.com/images/machine-coding/chess/Chess_Bishop.png)

#### Queen

- A queen can move any number of steps in any direction (horizontally, vertically, or diagonally) without leaping over any other piece.
- Valid moves:

![](https://wat-images.s3.ap-south-1.amazonaws.com/images/machine-coding/chess/Chess_Queen.png)

#### King

- A king can move one step in any direction (horizontally, vertically, or diagonally).
- Valid moves:

![](https://wat-images.s3.ap-south-1.amazonaws.com/images/machine-coding/chess/Chess_King.png)

### Requirements

Create a command-line application for a chess validator with the following requirements:

- Initialize a chessboard with two players and all the pieces in the right positions.

![](https://wat-images.s3.ap-south-1.amazonaws.com/images/machine-coding/chess/Chess_Init.png)
- Print the board after initializing.
- Allow the user to make moves on behalf of both the players.
  - The user will make a move by entering the start position and the end position.
  - You need to determine the piece and make the move if it is valid.
  - Valid move:

    - The piece is controlled by the player having the current turn
    - The move is valid based on how that particular piece can move
    - The start and end position are inside the board

  - If the move is invalid

    - print 'Invalid Move'
    - the same player plays again

  - If the move is valid:
    - move the piece to the destination and remove any captured piece
    - print the board after the move

The position of a piece is represented as the column name (a-h) followed by the row number (1-8).

##### Examples

- a1 represents the cell at the extreme bottom-left
- h8 represents the cell at the extreme top-right.

### Input/Output Format

The code should strictly follow the input/output format and will be tested with provided test cases.

#### Input Format

Multiple lines with each line containing the Start Position End Position. Both the positions will be separated by a space.

Stop taking the input when you encounter the word exit.

#### Output Format

Print the initial board followed by an extra line. This would be followed by the board after each move and an extra line after every valid move. In case of an invalid move do not print the board and instead print:

Invalid Move

The board needs to be printed in the following format based on the respective position:

```
BR BN BB BQ BK BB BN BR
BP BP BP BP BP BP BP BP
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
WP WP WP WP WP WP WP WP
WR WN WB WQ WK WB WN WR
```

Here,

- W and B represents a white and black piece respectively
- P => Pawn
- R => Rook
- N => Knight
- B => Bishop
- Q => Queen
- K => King
- An empty cell is represented by two hyphens (--).

### Examples

#### Sample Input

```
e2 e4
e7 e5
f1 c4
b8 c6
d1 h5
g8 f6
h5 f7
f8 f7
g7 f7
h8 f7
d8 f7
c6 f7
c4 f7
h8 g8
f2 f4
e5 f4
f7 e8
exit
```

#### Expected Output

```
BR BN BB BQ BK BB BN BR
BP BP BP BP BP BP BP BP
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
WP WP WP WP WP WP WP WP
WR WN WB WQ WK WB WN WR

BR BN BB BQ BK BB BN BR
BP BP BP BP BP BP BP BP
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- WP -- -- --
-- -- -- -- -- -- -- --
WP WP WP WP -- WP WP WP
WR WN WB WQ WK WB WN WR

BR BN BB BQ BK BB BN BR
BP BP BP BP -- BP BP BP
-- -- -- -- -- -- -- --
-- -- -- -- BP -- -- --
-- -- -- -- WP -- -- --
-- -- -- -- -- -- -- --
WP WP WP WP -- WP WP WP
WR WN WB WQ WK WB WN WR

BR BN BB BQ BK BB BN BR
BP BP BP BP -- BP BP BP
-- -- -- -- -- -- -- --
-- -- -- -- BP -- -- --
-- -- WB -- WP -- -- --
-- -- -- -- -- -- -- --
WP WP WP WP -- WP WP WP
WR WN WB WQ WK -- WN WR

BR -- BB BQ BK BB BN BR
BP BP BP BP -- BP BP BP
-- -- BN -- -- -- -- --
-- -- -- -- BP -- -- --
-- -- WB -- WP -- -- --
-- -- -- -- -- -- -- --
WP WP WP WP -- WP WP WP
WR WN WB WQ WK -- WN WR

BR -- BB BQ BK BB BN BR
BP BP BP BP -- BP BP BP
-- -- BN -- -- -- -- --
-- -- -- -- BP -- -- WQ
-- -- WB -- WP -- -- --
-- -- -- -- -- -- -- --
WP WP WP WP -- WP WP WP
WR WN WB -- WK -- WN WR

BR -- BB BQ BK BB -- BR
BP BP BP BP -- BP BP BP
-- -- BN -- -- BN -- --
-- -- -- -- BP -- -- WQ
-- -- WB -- WP -- -- --
-- -- -- -- -- -- -- --
WP WP WP WP -- WP WP WP
WR WN WB -- WK -- WN WR

BR -- BB BQ BK BB -- BR
BP BP BP BP -- WQ BP BP
-- -- BN -- -- BN -- --
-- -- -- -- BP -- -- --
-- -- WB -- WP -- -- --
-- -- -- -- -- -- -- --
WP WP WP WP -- WP WP WP
WR WN WB -- WK -- WN WR

Invalid Move
Invalid Move
Invalid Move
Invalid Move
Invalid Move
Invalid Move
Invalid Move
BR -- BB BQ BK BB BR --
BP BP BP BP -- WQ BP BP
-- -- BN -- -- BN -- --
-- -- -- -- BP -- -- --
-- -- WB -- WP -- -- --
-- -- -- -- -- -- -- --
WP WP WP WP -- WP WP WP
WR WN WB -- WK -- WN WR

BR -- BB BQ BK BB BR --
BP BP BP BP -- WQ BP BP
-- -- BN -- -- BN -- --
-- -- -- -- BP -- -- --
-- -- WB -- WP WP -- --
-- -- -- -- -- -- -- --
WP WP WP WP -- -- WP WP
WR WN WB -- WK -- WN WR

BR -- BB BQ BK BB BR --
BP BP BP BP -- WQ BP BP
-- -- BN -- -- BN -- --
-- -- -- -- -- -- -- --
-- -- WB -- WP BP -- --
-- -- -- -- -- -- -- --
WP WP WP WP -- -- WP WP
WR WN WB -- WK -- WN WR

BR -- BB BQ WQ BB BR --
BP BP BP BP -- -- BP BP
-- -- BN -- -- BN -- --
-- -- -- -- -- -- -- --
-- -- WB -- WP BP -- --
-- -- -- -- -- -- -- --
WP WP WP WP -- -- WP WP
WR WN WB -- WK -- WN WR
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

- Keep the code extensible to allow new types of pieces with any type of move.
- Keep the code extensible to change the move style of any of the existing pieces.
- Keep the code extensible to change the size of the grid.
- Keep the code extensible to change the starting positions on the board.

![Gaurav Chandak](https://lh6.googleusercontent.com/-0pqq1NN5qK4/AAAAAAAAAAI/AAAAAAAALr8/xW9PmtNCGjw/s96-c/photo.jpg)

Gaurav Chandak

Gaurav is the co-founder of workat.tech and has previously worked at Flipkart and Microsoft. He intends to actively contribute to the future of education through workat.tech.

Related Content

[![](https://workat.tech/machine-coding/practice/design-chess-validator-to77d8oqpx2h)\\
\\
Design Splitwise \| Machine Coding Round Questions (SDE I/II)](https://workat.tech/machine-coding/practice/splitwise-problem-0kp2yneec2q2) [![](https://workat.tech/machine-coding/practice/design-chess-validator-to77d8oqpx2h)\\
\\
Design a Parking Lot \| Machine Coding Round Questions (SDE I/II)](https://workat.tech/machine-coding/practice/design-parking-lot-qm6hwq4wkhp8) [![](https://workat.tech/machine-coding/practice/design-chess-validator-to77d8oqpx2h)\\
\\
Design an In-Memory Key-Value Store \| Machine Coding Round Questions (SDE II/III)](https://workat.tech/machine-coding/practice/design-key-value-store-6gz6cq124k65)

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