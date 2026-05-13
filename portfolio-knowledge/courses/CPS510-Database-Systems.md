# CPS510 — Database Systems

## Course Overview
Database Systems I introduced the fundamentals of database organization, design, implementation, and management. The course focused mainly on relational database systems, including how data is modeled, how relational tables are designed, how SQL is used to create and query databases, and how database schemas are improved through normalization. It also covered database architecture, relational algebra, functional dependencies, physical storage concepts, indexing, and other database models such as hierarchical, network, and inverted file systems.

The course combined database theory with hands-on implementation. The main practical component was a semester-long database project where the weekly lab work built toward a complete database-backed application.

## Institution / Program
Toronto Metropolitan University, Software Engineering, Electrical and Computer Engineering Department

## Term / Date
Third Year, Fall Semester

## Main Topics
- Introduction to databases and database management systems
- Database users, database environments, and DBMS responsibilities
- Database system architecture, including conceptual, internal, and external schemas
- Data models, schemas, instances, and data independence
- Entity-Relationship modeling and database design
- Entities, attributes, relationships, weak entities, cardinality, and participation constraints
- Enhanced ER modeling concepts such as specialization, generalization, subclasses, and superclasses
- Mapping ER diagrams into relational schemas
- Relational database terminology, including relations, tuples, attributes, domains, keys, and constraints
- Relational integrity constraints, including primary keys, foreign keys, uniqueness, and referential integrity
- SQL data definition and data manipulation
- Oracle SQL data types such as NUMBER, VARCHAR2, DATE, and TIMESTAMP
- Creating, altering, and dropping tables
- Basic SQL queries using SELECT, WHERE, ORDER BY, DISTINCT, AND, OR, and NOT
- Advanced SQL queries using joins, grouping, aggregation, HAVING, EXISTS, UNION, and MINUS
- SQL views
- Relational algebra operations such as selection, projection, renaming, Cartesian product, joins, union, difference, and intersection
- Relational calculus and Query-By-Example concepts
- Functional dependencies
- Normalization theory
- First Normal Form, Second Normal Form, Third Normal Form, and Boyce-Codd Normal Form
- Candidate keys, superkeys, prime attributes, and dependency preservation
- Physical database organization, file structures, storage hierarchy, disk storage, hashing, and indexing
- Basic transaction and update operation concepts
- Introduction to other database models and database management approaches

## Theory Learned
This course taught the foundations of how databases are designed, structured, queried, and maintained. A major part of the theory was learning how to move from a real-world problem description into a formal database design. This included identifying entities, attributes, relationships, keys, and constraints, then converting that conceptual ER model into relational tables.

A key concept was the relational model. I learned how data is represented as relations, where tables contain tuples/rows and attributes/columns. I also learned how domains define valid values, how primary keys uniquely identify records, and how foreign keys enforce relationships between tables. This helped connect the theory of database design to the practical structure of SQL tables.

The course also covered relational algebra as the formal foundation behind database queries. I learned how SQL queries can be represented using operations like selection, projection, joins, Cartesian product, union, difference, and renaming. This was useful because it showed what SQL is doing at a more theoretical level instead of only treating SQL as a programming language.

Normalization was another major theory topic. I learned how functional dependencies describe relationships between attributes and how those dependencies are used to detect poor database design. Through 1NF, 2NF, 3NF, and BCNF, I learned how to reduce redundancy, avoid update anomalies, and create schemas that are more consistent and easier to maintain.

The course also introduced physical database concepts, including how databases are stored on secondary storage, why indexing matters, and how file organization affects performance. This connected the logical side of databases with the lower-level storage and access methods used by real DBMS systems.

## Lab Work
The lab work was weekly and directly supported the semester-long database project. Each lab built one part of the final system, starting from the initial database idea and ending with a working implementation and GUI.

The first lab focused on defining the database application. For my group, this was an online job bank system called **JobsForAll**, designed to let applicants search and apply for jobs while allowing recruiters to post job listings and track application progress. This stage involved identifying the main users of the system, describing their interactions, and creating the first version of the required database tables.

The second lab focused on the ER model. We created an ER diagram for the job bank system, identifying entities such as Account, Applicant, Recruiter, Company, JobListing, and JobApplication. We also modeled relationships such as companies posting job listings, applicants submitting job applications, and recruiters being associated with companies.

The third lab focused on creating the database tables in Oracle. We wrote SQL `CREATE TABLE` statements with primary keys, foreign keys, uniqueness constraints, required fields, and appropriate Oracle data types. This included tables such as Company, Account, Applicant, Recruiter, JobListing, and JobApplication.

The fourth lab focused on query design. We wrote simple SQL queries to retrieve data from individual tables and also translated those queries into relational algebra. Examples included retrieving job titles for a company, listing recruiters for a company, showing job deadlines, filtering accounts by phone area code, and listing rejected applications.

The fifth lab expanded into advanced SQL queries and shell implementation. We worked with joins, aggregation, grouping, HAVING, EXISTS, UNION, and MINUS. We also created more complex queries such as counting how many job applications each applicant submitted, listing companies with more than one job listing, finding companies with recruiters in Toronto, and classifying users as applicants or recruiters.

The sixth lab focused on functional dependencies. We identified which attributes determined other attributes in the database schema. For example, CompanyID determined company information, JobID determined job listing information, and the composite key of JobID and UserID determined the details of a job application.

The seventh lab focused on normalization to 3NF. We analyzed each table to confirm whether it satisfied 1NF, 2NF, and 3NF. This involved checking for atomic attributes, partial dependencies, and transitive dependencies.

The eighth lab focused on BCNF. We reviewed candidate keys, prime attributes, and dependency rules to determine whether each relation satisfied BCNF. We also considered improvements such as separating login credentials from account profile information.

The ninth lab focused on implementation and user interface work. We created a Unix shell-based interface for database operations such as creating tables, populating tables, querying tables, modifying records, and dropping tables. We also developed a GUI application for the project with pages for users, companies, jobs, and job applications.

Overall, the lab work was not separate from the project. Each weekly assignment was a step toward completing the final database system.

## Projects / Deliverables
The main project was a semester-long database-backed application called **JobsForAll**, an online job bank database system.

The purpose of the project was to design and implement a database system that supports two main user groups: applicants and recruiters. Applicants could create accounts, search job listings, filter jobs based on factors such as job type, location, salary, education, and experience, and apply to jobs using their saved account information. Recruiters could be linked to companies, post job listings, and track the status of job applications.

The database design included the following main tables:

- **Account**: stored user profile and login information
- **Applicant**: represented users who could apply for jobs
- **Recruiter**: represented users associated with a company
- **Company**: stored company details
- **JobListing**: stored job posting information such as title, type, company, salary, education, experience, post date, and deadline
- **JobApplication**: stored applications submitted by applicants, including CV, cover letter, submission date, and status

One important design improvement was removing the redundant ApplicationID field from the JobApplication table. Since the combination of JobID and UserID could uniquely identify each job application, the project used a composite primary key instead.

The project deliverables included:

- Application description and user/recruiter experience
- Initial and updated database tables
- ER diagram and updated ER diagram
- Oracle SQL table creation scripts
- Simple SQL queries and relational algebra translations
- Advanced SQL queries and relational algebra translations
- SQL views for interview tables, company listings, and recruiter lists
- Functional dependency analysis
- 3NF normalization analysis
- BCNF normalization analysis
- Unix shell implementation for database operations
- GUI application with pages for users, companies, jobs, and job applications
- Final project report documenting the full system

This project demonstrated the full database design process, from requirements and ER modeling to SQL implementation, normalization, querying, and application-level interaction.

## Tools / Technologies
- Oracle Database
- SQL
- SQL*Plus
- Oracle SQL data types such as NUMBER, VARCHAR2, DATE, and TIMESTAMP
- Relational algebra notation
- ER diagrams
- Unix shell scripting / command-line interface
- Database GUI implementation
- MySQL-related date handling considerations in the GUI/application layer
- Functional dependency analysis
- Normalization methods for 1NF, 2NF, 3NF, and BCNF
- Database design documentation
- Course textbook: *Fundamentals of Database Systems* by Elmasri and Navathe

## Skills Demonstrated
- Designed a relational database system from a real-world problem description
- Identified entities, attributes, relationships, keys, and constraints
- Created ER diagrams and translated them into relational schemas
- Wrote SQL DDL statements to create tables with primary keys and foreign keys
- Wrote SQL queries for filtering, joining, grouping, aggregating, and combining results
- Translated SQL-style query logic into relational algebra
- Created SQL views for reusable query results
- Applied functional dependency analysis to database schemas
- Normalized relations into 3NF and BCNF
- Reduced redundancy by improving table design and removing unnecessary attributes
- Implemented a database project using Oracle tools
- Built a basic interface for interacting with database records
- Worked in a team to design, implement, document, and present a database system
- Connected database theory to a practical application
- Documented database design decisions clearly and systematically

## Key Takeaways
CPS510 showed me how important database design is before writing any application code. A strong database system starts with understanding the problem, identifying the correct entities and relationships, and choosing keys and constraints carefully.

The course also helped me understand why normalization matters. Without normalization, a database can quickly suffer from redundancy, inconsistent data, and update anomalies. Learning 3NF and BCNF gave me a better way to think about clean schema design.

Another major takeaway was that SQL is not just about writing queries. It connects directly to relational algebra, database theory, constraints, and data integrity. The course helped me understand both the practical and theoretical sides of database systems.

The project made the course feel more realistic because each weekly assignment built toward a complete system. By the end, I had experience designing a database, implementing it in Oracle, writing queries, analyzing dependencies, normalizing tables, and creating a basic interface for interacting with the data.

## Related Portfolio Topics
- Relational database design
- SQL and Oracle database implementation
- ER modeling and schema design
- Data-backed application development
- Normalization and database integrity
- Query design and relational algebra
- Backend development foundations
- Data modeling for real-world systems
- User/account management systems
- Job board and application tracking systems
- Database documentation and technical reporting
- Team-based software engineering projects