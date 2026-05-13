# CPS688 — Advanced Algorithms

## Course Overview
CPS688: Advanced Algorithms focused on the design, analysis, and proof of correctness of more advanced algorithmic techniques. The course built on earlier data structures and algorithms knowledge and went deeper into graph algorithms, greedy strategies, dynamic programming, divide-and-conquer, backtracking, reductions, NP-completeness, network flow, linear programming, string matching, and randomized algorithms.

The course was mostly theoretical, with emphasis on understanding why algorithms work, how to analyze their time and space complexity, and how to choose the correct algorithmic strategy for a given problem.

## Institution / Program
Toronto Metropolitan University, Software Engineering, Electrical and Computer Engineering Department

## Term / Date
Third Year, Winter Semester

## Main Topics
- Stable Matching
  - Stable Matching Problem
  - Perfect matching
  - Stable vs unstable pairings
  - Propose-and-reject / Gale-Shapley style algorithm

- Graph Algorithms
  - Graph definitions: vertices, edges, directed graphs, undirected graphs
  - Graph representations: adjacency lists and adjacency matrices
  - Paths, connectivity, trees, and connected components
  - Breadth-First Search and Depth-First Search
  - Bipartite graphs and testing bipartiteness

- Greedy Algorithms
  - Greedy algorithm design strategy
  - Shortest path problems
  - Edge relaxation
  - Dijkstra’s algorithm
  - Bellman-Ford algorithm
  - Minimum spanning trees
  - Kruskal’s algorithm
  - Prim’s algorithm

- Backtracking
  - State-space trees
  - Recursive search
  - Pruning invalid partial solutions
  - N-Queens problem
  - Rat in a maze problem
  - M-coloring problem

- Dynamic Programming
  - Overlapping subproblems
  - Optimal substructure
  - Recurrence-based algorithm design
  - Coin change problem
  - Sequence alignment
  - Knapsack problem
  - Fractional knapsack
  - Discrete knapsack with and without repetition

- Divide-and-Conquer
  - Breaking problems into independent subproblems
  - Merge sort
  - Quick sort
  - Counting inversions
  - Recurrence-based runtime analysis

- NP-Complete Problems and Reductions
  - Easy vs hard computational problems
  - Decision problems
  - P and NP
  - NP-hardness and NP-completeness
  - Polynomial-time reductions
  - Traveling Salesman Problem
  - Hamiltonian Cycle Problem
  - Longest Path Problem
  - Integer Linear Programming
  - Independent Set
  - Vertex Cover
  - SAT and 3-SAT reductions

- Network Flow
  - Flow networks
  - Edge capacity and flow
  - Source and sink nodes
  - Minimum cut problem
  - Maximum flow problem
  - Ford-Fulkerson algorithm
  - Max-flow min-cut theorem
  - Bipartite matching
  - Applications such as baseball elimination

- Substring Search
  - Brute-force string matching
  - Knuth-Morris-Pratt algorithm
  - Deterministic finite-state automata for pattern matching
  - Boyer-Moore algorithm
  - Rabin-Karp algorithm
  - Hashing-based string search

- Linear Programming
  - Optimization problems with constraints
  - Decision variables
  - Objective functions
  - Feasible regions
  - Geometric interpretation of linear programs
  - Convexity
  - Standard form for linear programs
  - Simplex method

- Randomized Algorithms
  - Randomization as an algorithmic technique
  - Contention resolution
  - Randomized protocols
  - Random variables
  - Randomized global minimum cut
  - Contraction algorithm
  - Randomized approximation for MAX 3-SAT
  - Monte Carlo and Las Vegas algorithms
  - RP and ZPP complexity classes
  - Randomized hashing
  - Universal hashing
  - Chernoff bounds
  - Load balancing and random allocation

## Theory Learned
This course developed a deeper understanding of how advanced algorithms are designed, analyzed, and proven correct. A major part of the theory involved learning how to identify the structure of a problem and match it with the correct algorithmic paradigm.

The course covered greedy algorithms, where solutions are built step by step by making locally optimal choices. Through examples such as shortest paths and minimum spanning trees, the course showed that greedy algorithms can be very efficient, but they require careful proof to show that the local choices actually lead to a globally optimal solution.

Dynamic programming was another major theory area. The course explained how some problems can be broken into overlapping subproblems, where the solution to a larger problem depends on solutions to smaller versions of the same problem. Problems such as coin change, sequence alignment, and knapsack were used to show how recurrence relations can be turned into efficient algorithms.

The course also covered divide-and-conquer algorithms, where problems are split into smaller independent pieces, solved recursively, and then combined. Sorting algorithms such as merge sort and quick sort were used to explain how recursive structure leads to efficient algorithms and how recurrence relations are used to analyze runtime.

Graph theory and graph algorithms were a large part of the course. This included graph representations, traversal algorithms like BFS and DFS, shortest path algorithms, minimum spanning trees, bipartite graphs, and connectivity. These topics showed how many real-world problems can be modeled as graphs and solved using well-known algorithmic techniques.

A key theoretical component was computational complexity. The course introduced P, NP, NP-hardness, and NP-completeness, along with the idea of polynomial-time reductions. This helped explain why some problems are considered computationally difficult and why finding efficient algorithms for certain problems is unlikely.

The course also introduced optimization techniques such as network flow and linear programming. Network flow focused on modeling systems with capacities and flows, using concepts such as max-flow, min-cut, and Ford-Fulkerson. Linear programming focused on representing optimization problems using decision variables, objective functions, and constraints.

The later topics introduced randomized algorithms, where randomness is used to design efficient algorithms or protocols. This included randomized contention resolution, randomized min-cut, randomized approximation algorithms, hashing, and probability-based runtime or correctness analysis.

Overall, the course taught not just how to run algorithms, but how to reason about them mathematically, prove their correctness, compare their efficiency, and understand their limitations.

## Lab Work
This course had no dedicated lab work in my offering. The practical work was mainly theory-based problem solving, written algorithm analysis, proofs, and exam preparation.

Although there were no programming labs, the course still involved working through algorithmic examples by hand, tracing algorithm behavior, analyzing runtimes, writing pseudocode, proving correctness, and applying algorithms to structured problems such as graphs, optimization models, string matching, and NP-complete reductions.

## Projects / Deliverables
This course had no major project deliverable in my offering.

The main deliverables were theory-based assessments, including exams and practice problems. The work focused on:
- Solving algorithm design problems
- Writing and analyzing pseudocode
- Proving algorithm correctness
- Performing runtime and space complexity analysis
- Applying reductions for NP-completeness
- Tracing graph, flow, dynamic programming, greedy, and randomized algorithms
- Explaining why a specific algorithmic approach is appropriate for a problem

## Tools / Technologies
- Mathematical notation for algorithm analysis
- Pseudocode
- Graph representations and diagrams
- Recurrence relations
- Big-O, Big-Theta, and Big-Omega notation
- Proof techniques such as induction, contradiction, and loop invariants
- D2L Brightspace for course materials
- Course notes and lecture slides
- Algorithm design textbooks and references
- Hand-written problem solving for exams and practice questions

This course did not depend heavily on a programming language or software tool. The focus was on theoretical algorithm design and analysis rather than implementation.

## Skills Demonstrated
- Designed algorithms using greedy, divide-and-conquer, dynamic programming, backtracking, and randomized approaches
- Analyzed algorithm efficiency using asymptotic notation
- Solved recurrence relations for recursive algorithms
- Proved algorithm correctness using formal reasoning
- Modeled problems using graphs, flows, constraints, and decision problems
- Applied BFS, DFS, shortest path, MST, max-flow, min-cut, and string matching algorithms
- Compared algorithmic paradigms and selected appropriate strategies for different problems
- Understood computational complexity classes such as P, NP, NP-hard, and NP-complete
- Built reductions between problems to reason about computational hardness
- Worked with optimization models such as network flow and linear programming
- Interpreted randomized algorithms using probability, expectation, and error models
- Developed stronger mathematical problem-solving and exam-based reasoning skills

## Key Takeaways
One of the biggest takeaways from CPS688 was that algorithm design is not only about memorizing algorithms. It is about understanding the structure of a problem and knowing which design technique fits that structure.

The course showed that different problems require different ways of thinking. Greedy algorithms are useful when local choices can be proven optimal, dynamic programming is useful when subproblems overlap, divide-and-conquer works well when subproblems are independent, and backtracking is useful when exploring a large search space with pruning.

Another important takeaway was the importance of proof. For advanced algorithms, it is not enough to give an answer or write pseudocode. You also need to justify why the algorithm is correct and why its runtime is efficient.

The NP-completeness section was especially important because it showed that not every problem has a known efficient solution. This helped build a better understanding of computational limits and why reductions are important in computer science.

Overall, CPS688 strengthened my ability to think mathematically, analyze complex problems, and approach software problems from an algorithmic and optimization-focused perspective.

## Related Portfolio Topics
- Algorithm design and optimization
- Graph-based problem solving
- Route planning and shortest path analysis
- Traffic data processing and travel time comparison
- Dynamic programming and optimization problems
- Complexity analysis for scalable systems
- Search algorithms and backtracking
- String matching and text processing
- Network flow and resource allocation
- Randomized algorithms and hashing
- Machine learning model efficiency and algorithmic runtime analysis
- Backend system design where performance and scalability matter