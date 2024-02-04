# Minimax Algorithm with Alpha-Beta Pruning

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Introduction

The Minimax algorithm is a decision-making algorithm commonly used in two-player turn-based games, such as Tic-Tac-Toe. It explores all possible moves of the game, assigns scores to each move, and chooses the move with the maximum score for the maximizing player and the minimum score for the minimizing player. Alpha-Beta Pruning is an enhancement to the Minimax algorithm that reduces the number of nodes evaluated in the search tree.

## Terminology

- **Maximizing Player**: The player trying to maximize the score (e.g., computer in Tic-Tac-Toe).
- **Minimizing Player**: The player trying to minimize the score (e.g., human opponent).
- **Depth**: The level of recursion in the search tree.
- **Score**: A value assigned to a game state, indicating the desirability of that state for the maximizing or minimizing player.

## Minimax Algorithm Overview

1. **Recursive Exploration**: The algorithm recursively explores the game tree by considering all possible moves at each level.
2. **Leaf Node Evaluation**: When the maximum depth is reached or a terminal game state is encountered, the leaf nodes are evaluated using a scoring function.
3. **Backtracking**: The scores are propagated back up the tree, alternating between maximizing and minimizing players.
4. **Best Move Selection**: At the root level, the algorithm selects the move with the highest score for the maximizing player and the lowest score for the minimizing player.

## Alpha-Beta Pruning

Alpha-Beta Pruning is a technique to reduce the number of nodes evaluated in the search tree, making the Minimax algorithm more efficient.

### Alpha and Beta Values

- **Alpha**: The best score currently known to the maximizing player.
- **Beta**: The best score currently known to the minimizing player.

### Pruning Conditions

1. **Maximizing Player (Alpha Update)**:

   - If the current node's score is greater than or equal to beta, prune the subtree below this node.
   - Update alpha to the maximum of alpha and the current node's score.

2. **Minimizing Player (Beta Update)**:
   - If the current node's score is less than or equal to alpha, prune the subtree below this node.
   - Update beta to the minimum of beta and the current node's score.

### Benefits of Alpha-Beta Pruning

- Reduces the number of nodes explored, leading to faster computation.
- Preserves the optimal move even with pruning.

## Implementation in Tic-Tac-Toe Library

The `minimax` function in the Tic-Tac-Toe library incorporates the alpha-beta pruning technique. It maintains alpha and beta values during recursive exploration, updating them based on the scores of child nodes and pruning the tree when possible.
