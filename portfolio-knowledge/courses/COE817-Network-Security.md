# COE817 — Network Security

## Course Overview
COE817 introduced the theory and application of security in computer network environments. The course focused on how to protect wired and wireless networks from common threats by applying cryptographic techniques, authentication protocols, secure communication protocols, and defensive network design.

The course connected theoretical cybersecurity concepts with hands-on Java network programming labs. Topics included symmetric and public-key encryption, authentication, key distribution, transport-level security, WiFi security, e-mail security, IP security, malicious software, firewalls, and intrusion detection systems. A major focus of the course was understanding how secure protocols are designed, why they can fail, and how to improve them against attacks such as replay attacks, message tampering, and unauthorized access.

## Institution / Program
Toronto Metropolitan University, Software Engineering, Electrical and Computer Engineering Department

## Term / Date
Fourth Year, Winter Semester

## Main Topics
- Introduction to network security and cryptography
- Security goals: confidentiality, integrity, authentication, availability, and non-repudiation
- Threat models for networked systems
- Symmetric-key encryption and block ciphers
- Public-key cryptography and RSA
- Java Cryptography Architecture and Java Crypto Extensions
- Authentication protocols using nonces, shared keys, public keys, and digital signatures
- Key management and key distribution protocols
- Key Distribution Center-based secure communication
- Transport-level security concepts
- Wireless network security and WiFi protection
- E-mail security
- IP security
- Malicious software and common network-based attacks
- Firewalls and intrusion detection systems
- Replay attack prevention
- Secure client-server application design

## Theory Learned
This course taught how security is designed into networked systems rather than added afterward. A major part of the theory was understanding the core goals of cybersecurity: keeping data private, ensuring messages are not modified, proving the identity of communicating parties, and maintaining trust between systems that communicate over a network.

The cryptography portion covered both symmetric-key and public-key encryption. Symmetric encryption was used to understand how two parties can protect messages using a shared secret key, while public-key encryption introduced RSA key pairs, public/private key usage, and secure exchange of information between parties that do not initially share a secret. The course also covered how encryption alone is not enough, since a message can be encrypted but still replayed or misused if freshness and authentication are not handled correctly.

Authentication protocols were a major topic. The course explored nonce-based challenge-response protocols, where random values are used to prove that a message is fresh and not copied from an earlier session. It also covered digital signatures, where a sender signs a message using a private key and the receiver verifies it using the sender’s public key. This helped demonstrate the difference between confidentiality, authentication, integrity, and non-repudiation.

Key management and key distribution were another important part of the course. The labs showed how a Key Distribution Center can issue master keys and session keys to clients, allowing two or more clients to communicate securely. This introduced the idea that secure communication depends not only on encryption algorithms, but also on how keys are created, exchanged, stored, and trusted.

The course also introduced higher-level network security mechanisms such as transport-level security, IP security, wireless network protection, e-mail security, firewalls, intrusion detection systems, and malicious software defenses. These topics helped connect low-level cryptographic building blocks to real-world network security systems.

## Lab Work
The lab work focused on applying network security concepts through Java socket programming and Java cryptography libraries. The labs gradually built from basic client-server communication to more complex secure systems involving encryption, authentication, key distribution, digital signatures, and replay attack prevention.

### Lab 1 — Java Socket Programming and Vigenère Cipher
Lab 1 introduced Java socket programming through a client-server text chat system. The goal was to build a simple “Siri” text chat application where one or more clients could send questions to a server and receive responses.

The first part of the lab involved creating a server that handled one client. The client would send a question to the server, and the server would respond with an answer. To connect this with basic cryptography, the messages between the client and server were encoded and decoded using the Vigenère cipher with the key `TMU`. This required implementing both encryption and decryption logic, then showing the encrypted message, decrypted message, and server response.

The second part expanded the system so the server could handle multiple clients at the same time. This introduced multithreading in socket programming, since the server needed to create a new thread or handler for each connected client. This lab helped build the foundation for later secure client-server applications by practicing TCP socket communication, local host connections, message passing, encryption/decryption flow, and concurrent client handling.

### Lab 2 — Authentication Protocols
Lab 2 focused on authentication protocols using Java cryptography libraries. This lab introduced the Java Cryptography Architecture and Java Crypto Extensions, including packages such as `java.security.*` and `javax.crypto.*`.

The first task was to implement a symmetric key-based authentication protocol. In this protocol, Alice sends her identity and a nonce to Bob. Bob responds with his own nonce and an encrypted message containing his identity and Alice’s nonce. Alice then sends back an encrypted message containing her identity and Bob’s nonce. This demonstrated how shared keys and nonces can be used to prove identity and message freshness.

The second task was to implement a public key-based authentication protocol using RSA. This required generating RSA public/private key pairs, encrypting and decrypting messages using RSA, and using nonces to confirm freshness. This helped show how public-key cryptography can support authentication when parties do not simply rely on one shared secret.

The third task introduced digital signatures. Alice sends Bob a message along with a signature generated using Alice’s private key. Bob verifies the signature using Alice’s public key, proving that the message came from Alice and was not altered. The lab also required modifying the protocol to prevent replay attacks, showing that a valid signature alone does not guarantee that a message is fresh.

### Lab 3 — Key Distribution Protocols
Lab 3 focused on implementing a hybrid key distribution protocol using a Key Distribution Center. The lab involved three parties: client A, client B, and the KDC server.

The protocol had two main phases. In Phase 1, public-key cryptography was used to distribute master keys between the KDC and each client. The KDC generated a master key for A and another master key for B, then securely delivered them using RSA-based encryption and signatures. This showed how public-key cryptography can be used to bootstrap trust and establish longer-term symmetric keys.

In Phase 2, the KDC generated a session key shared between A and B. The server then separately encrypted and sent this session key to each client using their respective master keys. The goal was to demonstrate that both clients could receive the same session key from the KDC and then use it for secure communication.

This lab helped explain why key distribution is one of the hardest parts of security. It also required analyzing the protocol for vulnerabilities and explaining how the design could be improved. The work connected directly to real-world security systems where servers issue session keys or tokens so clients can communicate securely.

### Lab 4 — Secure Chat System
Lab 4 extended the key distribution idea into a secure group chat system. The system used Java socket communication with a KDC server and three clients: A, B, and C.

The KDC distributed a group session key shared by all clients. This group key allowed any client to send an encrypted chat message that the other clients could decrypt. Each message also included a digital signature so that receivers could verify who sent the message and confirm that it was not modified.

The secure message format followed the idea of encrypting the sender ID and message with the group key, then appending the sender’s digital signature. For example, if client A sent a message, the KDC forwarded it only to clients B and C. Those clients decrypted the message using the shared session key and verified A’s signature.

A major part of the lab was replay attack prevention. Even if a message is encrypted and signed, an attacker could capture a valid message and resend it many times. The lab required improving the protocol so replayed messages could be detected and rejected, using freshness mechanisms such as nonces, timestamps, or message identifiers.

## Projects / Deliverables
The final project was a secure banking application that simulated protected communication between a central bank server and multiple ATM clients. The project brought together many of the course’s main ideas: client-server networking, authenticated key distribution, AES encryption, HMAC-based integrity checking, replay attack prevention, secure transaction processing, and encrypted auditing.

The system followed a client-server architecture. The server listened for ATM client connections and created a separate client handler thread for each connection. This allowed multiple clients to interact with the banking system at the same time. The client side provided a banking interface where users could sign up, log in, deposit money, withdraw money, check their balance, and log out.

Before normal banking operations could happen, the client and server performed an authenticated key distribution protocol. A pre-shared secret was used to bootstrap the session. The server generated a master secret for the session, and both sides derived two operational keys from it: one encryption key and one MAC key. Separating the encryption key from the MAC key helped enforce a cleaner security design, since confidentiality and integrity were handled by separate cryptographic operations.

All protected communication used AES encryption for confidentiality and HMAC-SHA256 for message integrity. Each secure message also included a unique nonce so that replayed messages could be detected. If a nonce had already been seen, the system could reject the message as a replay attempt. This showed how encryption, MACs, and freshness checks work together to protect sensitive client-server communication.

The server handled user records through a persistent user file and processed banking commands such as `SIGNUP`, `LOGIN`, `DEPOSIT`, `WITHDRAW`, and balance inquiries. The application also maintained an encrypted audit log. Each audit log entry recorded information such as the username, action performed, timestamp, and execution time. The entries were encrypted before being written to the audit log, supporting accountability while still protecting sensitive information.

For my contribution, I worked on the transaction and login logic and implemented the authenticated key distribution protocol and MAC-based message authentication. This included helping ensure that banking requests were protected against tampering and replay attacks before being processed by the server.

## Tools / Technologies
- Java
- Java Socket Programming
- TCP client-server communication
- Multithreading
- NetBeans IDE
- Java Cryptography Architecture
- Java Crypto Extensions
- `java.security.*`
- `javax.crypto.*`
- AES encryption
- DES encryption concepts
- RSA public/private key cryptography
- Digital signatures
- HMAC-SHA256
- Nonces for replay attack prevention
- Key Distribution Center design
- Symmetric session keys
- Master keys and derived keys
- Localhost testing using `127.0.0.1`
- File-based user storage
- Encrypted audit logs

## Skills Demonstrated
- Designed and implemented secure client-server applications
- Applied symmetric-key and public-key cryptography in Java
- Used Java socket programming for network communication
- Built multithreaded servers capable of handling multiple clients
- Implemented challenge-response authentication protocols
- Generated and used RSA public/private key pairs
- Applied AES encryption to protect message confidentiality
- Used HMAC-SHA256 to verify message integrity and authenticity
- Implemented nonce-based replay attack prevention
- Designed key distribution protocols using a KDC
- Built a secure group chat system using shared session keys and digital signatures
- Developed a secure banking simulation with login, signup, deposit, withdrawal, and balance inquiry functionality
- Created encrypted audit logs for transaction accountability
- Analyzed protocol weaknesses and proposed improvements
- Connected theoretical security concepts to practical software implementations
- Worked in a team to design, implement, test, and demo a secure networked system

## Key Takeaways
COE817 showed that network security is not just about choosing an encryption algorithm. A secure system also needs authentication, integrity protection, freshness checks, key management, and careful protocol design. Even a message that is encrypted and signed can still be vulnerable if an attacker can replay it or if the keys are distributed insecurely.

The labs made it clear that cryptographic protocols need to be designed step by step. Each message in a protocol has a purpose, whether it is proving identity, exchanging a nonce, distributing a session key, or confirming that a message has not been modified. Small design mistakes can create serious vulnerabilities.

The final banking project was the most practical part of the course because it combined multiple concepts into one system. It showed how secure communication can be applied to a realistic financial application where clients need to authenticate, send protected requests, and trust that transactions are processed safely. The project also reinforced the importance of logging, auditing, and designing systems that can handle multiple users at the same time.

Overall, this course strengthened my understanding of how secure networked applications are built, how attacks such as replay and tampering can be prevented, and how cryptography is used in real software systems.

## Related Portfolio Topics
- Secure Banking Application using Java, AES, HMAC-SHA256, and nonce-based replay protection
- Secure Chat System using KDC-based group key distribution and digital signatures
- Java Socket Programming and Multithreaded Client-Server Systems
- Authentication Protocol Implementations using Symmetric Keys, RSA, and Digital Signatures
- Key Distribution Protocols and Session Key Management
- Cybersecurity Protocol Design and Attack Analysis
- Secure Audit Logging for Transaction-Based Systems
- Network Security Fundamentals for Distributed Applications
- Cryptography Applied to Real-Time Client-Server Communication
- Software Engineering Projects Involving Secure System Design