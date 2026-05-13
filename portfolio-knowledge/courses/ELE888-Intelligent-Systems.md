# ELE888 — Intelligent Systems (Machine Learning Algorithms)

## Course Overview
ELE888: Intelligent Systems introduced the foundations of machine learning, pattern classification, and intelligent system design. The course focused on how machines can make decisions from data using mathematical models, optimization techniques, supervised learning algorithms, neural networks, classifier evaluation methods, and unsupervised learning techniques.

A major focus of the course was understanding how intelligent systems are built from both theory and implementation. Topics included Bayesian decision theory, linear discriminant functions, gradient descent, logistic and softmax regression, multilayer neural networks, support vector machines, clustering, classifier evaluation, bias and variance, learning curves, machine learning system design, and principal component analysis.

## Institution / Program
Toronto Metropolitan University, Software Engineering, Electrical and Computer Engineering Department

## Term / Date
Fourth Year, Winter Semester

## Main Topics
- Introduction to intelligent systems, machine learning, and AI system design
- Review of linear algebra, probability, optimization, and gradient descent
- Bayesian decision theory and Bayes theorem
- Minimum-error and minimum-risk classification
- Gaussian class-conditional distributions
- Discriminant functions and decision boundaries
- Linear discriminant functions and perceptron-based classification
- Logistic regression and softmax regression
- Multilayer neural networks and deep learning fundamentals
- Backpropagation, activation functions, learning curves, and neural network training
- Support Vector Machines, cost functions, kernels, and optimization
- Classifier evaluation, error analysis, bias and variance
- Unsupervised learning, K-means clustering, nearest-neighbour clustering, and grouping algorithms
- Principal Component Analysis for dimensionality reduction and feature representation
- Practical machine learning system design using Python

## Theory Learned
This course built a strong foundation in how intelligent systems classify data, learn patterns, and make decisions. I learned how supervised learning models use labelled data to create decision boundaries, how probabilistic models estimate the most likely class, and how optimization methods adjust model parameters to reduce classification error.

The Bayesian decision theory portion covered prior probabilities, likelihoods, posterior probabilities, Bayes theorem, discriminant functions, Gaussian distributions, minimum-error-rate decisions, and minimum-risk classification. This helped explain how a classifier can make decisions not only based on probability, but also based on the cost of different types of mistakes.

The linear discriminant function section focused on representing classifiers as decision surfaces. I learned how a linear model separates classes using a weight vector and bias term, how augmented vectors simplify the decision rule, and how the perceptron criterion can be optimized using gradient descent. This also showed the limits of linear classifiers when class distributions overlap or are not linearly separable.

The neural network section introduced multilayer models, hidden layers, nonlinear activation functions, backpropagation, mean squared error, learning rate selection, and convergence behaviour. A key theory concept was that hidden layers allow a model to transform data into a new representation where nonlinear classification problems can become separable.

The unsupervised learning section focused on discovering structure in unlabeled data. I learned how K-means clustering assigns data points to the nearest cluster mean, updates cluster centres iteratively, and uses an error criterion to measure compactness. I also learned how initialization affects clustering results and how clustering quality can be evaluated using indexes such as the Xie-Beni index.

Overall, the course connected mathematical theory with practical implementation. It showed how intelligent systems rely on probability, optimization, data representation, and evaluation to produce reliable machine learning models.

## Lab Work
The lab work in ELE888 was completed as a set of practical machine learning assignments using Python. Each lab combined theoretical derivations with implementation, experiments, visualizations, and written analysis.

**Lab 0: Intro to Python for Machine Learning**  
This foundational lab introduced the Python tools needed for the course. It prepared students to work with numerical arrays, datasets, plots, and machine learning-style experiments using libraries such as NumPy, Matplotlib, and related Python tools.

**Lab 1: Bayesian Decision Theory**  
In this lab, I implemented a two-class Bayesian classifier using the IRIS dataset. The lab focused on deriving and coding a Bayes discriminant function using Gaussian class-conditional densities, prior probabilities, and posterior probabilities.

The classifier used the decision rule of assigning a sample to one class when the discriminant function was greater than zero and to the other class otherwise. I estimated Gaussian parameters such as the mean and standard deviation for each class, computed prior probabilities, and used Bayes theorem to calculate posterior probabilities.

A major part of the lab was finding the optimal decision threshold by solving where the discriminant function equals zero. I also studied cost-sensitive classification by adding a higher penalty for misclassifying one class as another. This shifted the decision threshold and showed how real-world classifiers may need to account for the cost of different errors.

The lab also compared different IRIS features, such as sepal length and sepal width, by evaluating posterior confidence and discriminant function magnitude. This helped demonstrate how feature selection affects classifier performance.

**Lab 2: Linear Discriminant Functions**  
In this lab, I implemented a linear discriminant classifier using the IRIS dataset and the perceptron gradient descent algorithm. The classifier was based on a linear decision function using sepal width and petal length as features.

The lab tested classification between Setosa and Versicolour, then repeated the process for Versicolour and Virginica. Different training and testing splits were used, including 30% training / 70% testing and 70% training / 30% testing. For Setosa vs Versicolour, the model achieved 100% testing accuracy in both split settings, showing that those classes were easily separable using the selected features.

For Versicolour vs Virginica, the accuracy was lower because the classes overlapped more in the selected feature space. This showed a realistic limitation of linear classifiers when the data is not perfectly separable.

The lab also explored the effect of learning rate, stopping threshold, and initial weight values. A smaller learning rate produced slower but more stable convergence, while a larger learning rate converged faster but could behave less smoothly. Changing the initial weight vector affected the optimization path and number of iterations needed for convergence.

**Lab 3: Multilayer Neural Networks**  
In this lab, I implemented a multilayer neural network from scratch to solve the XOR classification problem. XOR is not linearly separable, so it cannot be solved by a single linear decision boundary. This made it a useful example for understanding why hidden layers are needed.

The network architecture used two input neurons, two hidden neurons, and one output neuron. The hyperbolic tangent activation function was used in both the hidden and output layers. I added bias terms, initialized weights randomly, performed forward propagation, calculated mean squared error, and then applied batch backpropagation to update the weights.

The lab included plotting the learning curve to show how the mean squared error decreased during training. It also visualized the decision boundary in the original input space and in the hidden-layer feature space. The hidden-space visualization showed how the hidden layer transformed the XOR inputs into a representation where the output neuron could separate the classes more effectively.

This lab gave practical experience with neural network training, nonlinear classification, activation functions, gradient-based learning, and the role of hidden layers in solving problems that linear models cannot solve.

**Lab 4: Unsupervised Learning**  
In this lab, I implemented the K-means clustering algorithm from scratch and applied it to image colour clustering. Each image pixel was treated as a data point in RGB space, where the red, green, and blue values formed a three-dimensional feature vector.

The image was reshaped from an image matrix into a two-dimensional dataset where each row represented a pixel. The K-means algorithm then assigned each pixel to the closest cluster centre using Euclidean distance, updated the cluster means, and repeated this process until the means converged.

The first experiment used `k = 2` to simplify the image into two dominant colour groups. I plotted the error criterion over iterations, visualized the movement of cluster means in RGB space, displayed labelled pixel clusters, and reconstructed the labelled image using the final cluster means.

The second experiment used `k = 5` and ran K-means twice with different initial means. This showed that K-means can converge to different local solutions depending on initialization. I compared the two clustering results using the Xie-Beni index, where the lower value indicated better cluster compactness and separation. In the results, the second run produced the better clustering solution.

## Projects / Deliverables
- Completed four individual practical machine learning lab assignments that functioned as mini-projects.
- Implemented Bayesian classifiers using Gaussian class-conditional modelling and posterior probability calculations.
- Built a cost-sensitive Bayes decision classifier and analyzed how different misclassification penalties shift the decision threshold.
- Implemented a linear discriminant classifier using perceptron gradient descent.
- Evaluated model performance using train/test splits, decision boundaries, convergence plots, and classification accuracy.
- Implemented a multilayer neural network from scratch using forward propagation and batch backpropagation.
- Solved the XOR classification problem using a nonlinear neural network architecture.
- Visualized neural network learning using learning curves and decision boundary plots.
- Implemented K-means clustering from scratch for unsupervised image colour segmentation.
- Used RGB-space clustering to identify dominant colours and reconstruct simplified labelled images.
- Compared clustering quality using the Xie-Beni index.
- Produced written technical reports explaining theory, implementation, results, plots, and conclusions.

## Tools / Technologies
- Python
- NumPy
- Pandas
- Matplotlib
- scikit-learn
- ImageIO
- IRIS dataset
- Custom machine learning implementations from scratch
- Data visualization and decision boundary plotting
- Gradient descent and backpropagation implementations
- K-means clustering implementation
- Technical report writing using course-provided lab formats

## Skills Demonstrated
- Applied probability theory to machine learning classification problems
- Implemented Bayesian decision rules and posterior probability calculations
- Built supervised classifiers using discriminant functions
- Used gradient descent to optimize machine learning models
- Evaluated classifier accuracy using training and testing datasets
- Interpreted decision boundaries and class separation in feature space
- Analyzed the effects of learning rate, initialization, and training size on convergence
- Implemented neural network forward propagation and backpropagation from scratch
- Solved nonlinear classification problems using hidden layers
- Applied unsupervised learning to image data
- Implemented K-means clustering without relying on prebuilt clustering functions
- Visualized model behaviour using learning curves, scatter plots, error plots, and reconstructed images
- Compared clustering quality using numerical evaluation metrics
- Connected theoretical machine learning concepts to practical engineering implementations
- Wrote technical reports explaining methods, results, and conclusions clearly

## Key Takeaways
ELE888 helped me understand machine learning from the ground up instead of only using high-level libraries. The course showed how intelligent systems are built using probability, linear algebra, optimization, and data-driven decision making.

One major takeaway was that the choice of model depends heavily on the structure of the data. Bayesian classifiers work well when the probability model fits the data, linear discriminants are effective when classes are linearly separable, and neural networks are needed when the decision boundary is nonlinear.

Another important lesson was that model evaluation matters as much as model implementation. Training/testing splits, accuracy, learning curves, error analysis, and visualizations all help determine whether a model is actually learning useful patterns or simply fitting a specific dataset.

The labs also showed that machine learning algorithms can be sensitive to design choices such as learning rate, initial weights, selected features, number of clusters, and initial cluster means. Because of this, intelligent system design requires experimentation, interpretation, and careful tuning.

Overall, this course strengthened my understanding of the core algorithms behind machine learning and gave me hands-on experience implementing classifiers, neural networks, and clustering algorithms in Python.

## Related Portfolio Topics
- Machine Learning Algorithm Implementation
- Supervised Learning and Pattern Classification
- Bayesian Classification and Decision Theory
- Linear Models and Gradient Descent
- Neural Networks and Backpropagation
- Unsupervised Learning and Clustering
- Computer Vision and Image-Based Clustering
- Python-Based Data Science
- Model Evaluation and Error Analysis
- Feature Engineering and Feature Selection
- AI System Design
- Data Visualization for Machine Learning
- Intelligent Systems Engineering