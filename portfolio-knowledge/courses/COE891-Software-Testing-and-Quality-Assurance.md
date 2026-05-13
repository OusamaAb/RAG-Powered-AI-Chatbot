# COE891 — Software Testing and Quality Assurance

## Course Overview
Test planning and design, automation, coverage and quality metrics, defect management, and engineering practices for reliable software.

## Institution / Program
Toronto Metropolitan University, Software Engineering, Electrical and Computer Engineering Department

## Term / Date
Fourth Year, Winter Semester

## Main Topics
Software testing and quality assurance fundamentals, verification and validation, unit testing, integration testing, system testing, acceptance testing, test planning, test documentation, JUnit automated testing, TestNG automated testing, Selenium web application testing, parameterized testing, JUnit Theories, Input Space Partitioning, Boundary Value Analysis, code coverage, coverage-based test design, OpenClover, JaCoCo, Control Flow Graphs, Data Flow Graphs, node coverage, edge coverage, edge-pair coverage, prime path coverage, data flow testing, definition-use pairs, infeasible paths, logic-based testing, predicate coverage, clause coverage, GACC, CACC, RACC, GICC, RICC, syntax-based testing, mutation testing, PIT mutation testing, regression testing, test oracles, continuous integration testing concepts, and AI-assisted software testing using LLMs and ChatUniTest.

## Theory Learned
This course taught the theory behind designing, running, and evaluating software tests in a structured way. I learned how software testing is used to verify and validate programs, how different testing levels are applied, and how test cases can be designed from requirements, input domains, source code structure, and expected behaviour.

A major concept was Input Space Partitioning, where the input domain is divided into valid and invalid groups so that representative test cases can be selected. This was connected with Boundary Value Analysis, which focuses on testing edge cases because faults often happen near input limits.

I also learned about coverage-based testing. This included statement coverage, path coverage, graph coverage, and data flow coverage. Through Control Flow Graphs and Data Flow Graphs, I learned how to model program execution, identify feasible and infeasible paths, and design tests for node coverage, edge coverage, edge-pair coverage, prime path coverage, and DU-path coverage.

Logic-based testing was another important part of the course. I learned how predicates and clauses are used to analyze boolean expressions and how coverage criteria such as predicate coverage, clause coverage, GACC, CACC, RACC, GICC, and RICC can be used to test whether individual clauses affect the overall decision.

The course also introduced syntax-based testing and mutation testing. Mutation testing showed how artificial faults can be inserted into a program to evaluate whether a test suite is strong enough to detect incorrect behaviour. This helped show that high line coverage does not always mean a test suite is effective.

The course also covered AI-assisted software testing using LLMs and ChatUniTest. I learned that LLMs can help generate test cases, but their output still needs human review because generated tests can contain incorrect expected values, weak assertions, or tests that go outside the intended scope.

## Lab Work
The labs focused on applying software testing concepts using Java testing tools and real code examples.

In Lab 1, I worked with JUnit, TestNG, parameterized tests, and JUnit Theories. I implemented and tested an ArrayMult class for point-wise multiplication of arrays with different lengths. I also debugged a Triangle class by fixing Heron’s formula and adding validation for invalid side lengths and triangle inequality errors. The lab also included Java regular expression testing for phone number validation, JUnit test suites, Fibonacci parameterized testing, prime number testing, and theory-based tests for mathematical properties.

In Lab 2, I worked with coverage-based test design, OpenClover, Input Space Partitioning, and Boundary Value Analysis. I analyzed coverage for Java classes such as Money and MoneyBag, studied how test code and production code affect coverage percentages, and created test cases for statement and path coverage. I also implemented and tested a triangle classification program that returned equilateral, isosceles, scalene, or not a triangle based on side lengths, range limits, and triangle inequality rules.

In Lab 3, I used Selenium and TestNG for web application testing. I automated browser-based tests using ChromeDriver and WebDriver. The lab included opening websites, checking page titles, finding input fields, clicking buttons, interacting with a todo-list web application, using TestNG priorities, using setup and cleanup annotations, and organizing tests with method dependencies.

In Lab 4, I worked on graph coverage and data flow coverage. I drew Control Flow Graphs for sample methods, including an isPalindrome method, and identified test requirements for node coverage, edge coverage, edge-pair coverage, and prime path coverage. I also identified infeasible paths and explained why certain execution paths could not occur. For data flow testing, I identified variable definitions, uses, DU pairs, and DU paths, then selected test cases to cover those requirements.

In Lab 5, I focused on logic coverage. I built truth tables for boolean predicates, identified clause determination conditions, and applied GACC, CACC, RACC, GICC, and RICC. I also analyzed triangle classification logic by defining predicates for invalid input, triangle inequality failure, equilateral cases, isosceles cases, and scalene cases. From these predicates, I created test suites for predicate coverage, clause coverage, and restricted active clause coverage.

In Lab 6, I performed mutation testing using PIT. I tested Money and MoneyBag classes and analyzed mutation reports showing killed, survived, and uncovered mutants. I compared mutation coverage before and after enabling additional mutators such as constructor call and non-void method call mutators. This lab showed how mutation testing evaluates the strength of a test suite beyond simple line coverage.

## Projects / Deliverables
The main project was a team-based software testing and quality assurance project on selected components from the Apache Commons Math library. The project applied multiple testing methods, including Input Space Partitioning, Boundary Value Analysis, graph-based testing, logic-based testing, mutation testing, and LLM-assisted test generation.

For the statistics portion, JUnit tests were created for WeightedMean and WeightedVariance. These tests checked full arrays, subarrays, empty ranges, single-element ranges, invalid begin and length values, negative weights, and zero-sum weights.

For graph-based testing, the project analyzed matrix-related methods such as getEntry, setEntry, and transpose. Control Flow Graphs and Data Flow Graphs were created to show execution paths, variable definitions, and variable uses. Test cases were selected for valid matrix access, invalid matrix access, setting matrix values, and transposing matrices.

For logic-based testing, the project tested RealMatrix.add() and RealMatrix.multiply(). The tests checked valid matrix operations, zero matrix addition, negative values, rectangular matrix multiplication, and dimension mismatch cases. The logic testing focused on predicates related to matrix dimension compatibility.

For mutation testing, the project focused on MultivariateNormalDistribution. The tested methods were getMeans(), getStandardDeviations(), and density(double[]). Manual JUnit 5 tests checked correct mean values, standard deviation calculations, density values at the mean, non-zero mean cases, diagonal covariance cases, off-mean density values, symmetry, one-dimensional cases, and invalid dimension exceptions. PIT was used to compare default and custom mutation runs.

The project also included LLM-assisted testing using ChatUniTest. LLM-generated tests were created for the same selected methods and compared with manually written tests. The manual test suite was more reliable, while the LLM-generated tests reached similar coverage but contained incorrect expected values in some cases. This showed that AI can support testing, but human review is still necessary.

Deliverables included lab reports, JUnit and TestNG test cases, Selenium tests, coverage screenshots, graph and data flow analysis, mutation testing reports, a project test plan, project checkpoint work, and a final project report.

## Tools / Technologies
Java, JUnit 4, JUnit 5, JUnit Theories, JUnit Parameterized Tests, TestNG, Selenium WebDriver, ChromeDriver, Maven, Eclipse IDE, OpenClover, JaCoCo, PIT Mutation Testing, ChatUniTest, Apache Commons Math, GitHub, Java regular expressions, coverage reports, and mutation testing reports.

## Skills Demonstrated
Designed and executed automated unit tests, wrote JUnit and TestNG test suites, created parameterized and theory-based tests, automated browser testing using Selenium WebDriver, applied Input Space Partitioning and Boundary Value Analysis, designed tests from equivalence classes and boundary cases, measured code coverage using OpenClover and JaCoCo, built and analyzed Control Flow Graphs and Data Flow Graphs, identified node coverage, edge coverage, edge-pair coverage, prime path coverage, and DU-path coverage requirements, recognized infeasible paths and infeasible test requirements, applied predicate coverage, clause coverage, and active clause coverage, used PIT to perform mutation testing, interpreted killed mutants, survived mutants, and uncovered mutants, compared manual tests with LLM-generated tests, tested real open-source Java library components, and documented testing methods, results, and limitations clearly.

## Key Takeaways
This course showed that effective software testing requires planning, structure, and measurable criteria. A strong test suite should be designed from requirements, input domains, program logic, and expected behaviour, not just from random examples.

One major takeaway was that code coverage and test quality are not the same thing. A test suite can execute many lines of code but still fail to detect faults if the assertions are weak. Mutation testing made this clear by showing whether tests could actually catch behavioural changes.

Another takeaway was that different testing methods are useful for different types of problems. Input Space Partitioning and Boundary Value Analysis help select strong input cases, graph coverage helps test program structure, data flow testing helps track variable behaviour, logic coverage helps test boolean decisions, and mutation testing helps evaluate test strength.

The course also showed the value of automation through tools like JUnit, TestNG, Selenium, OpenClover, JaCoCo, Maven, and PIT. These tools make testing more repeatable, measurable, and practical for larger software systems.

The AI-assisted testing portion showed that LLMs can help generate test drafts, but they cannot fully replace careful manual testing. Generated tests still need to be reviewed because they may contain wrong expected values, weak assertions, or incorrect assumptions.

## Related Portfolio Topics
Java unit testing, automated QA, Selenium web application testing, mutation testing with PIT, code coverage analysis with OpenClover and JaCoCo, Apache Commons Math testing project, LLM-assisted software testing with ChatUniTest, test planning and documentation, regression testing, CI/CD testing concepts, QA automation for full-stack applications, and applying systematic testing techniques to projects such as BreakEven, AI marking tools, RAG chatbot systems, and software engineering portfolio applications.