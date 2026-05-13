# COE768 — Computer Networks

## Course Overview
COE768 introduced the foundations of modern computer networking with a focus on Internet technologies, layered architectures, protocol design, and network application development. The course covered how data moves through the OSI and TCP/IP models, how protocols at each layer support communication, and how real systems use TCP, UDP, IP, Ethernet, ARP, DNS, and socket programming to exchange data.

A major focus of the course was understanding networks both theoretically and practically. On the theory side, the course explored network architecture, encapsulation, framing, error detection, LAN technologies, switching, IP addressing, routing-related protocols, and transport-layer reliability. On the lab and project side, the course applied these ideas through Linux virtual machines, Wireshark packet captures, TCP/UDP client-server programs, and a final peer-to-peer file sharing application built using BSD sockets in C.

## Institution / Program
Toronto Metropolitan University, Software Engineering, Electrical and Computer Engineering Department

## Term / Date
Fourth Year, Fall Semester

## Main Topics
The main topics covered in COE768 included:

- OSI and TCP/IP layered architecture models
- Network encapsulation and decapsulation
- Client-server architecture
- BSD socket programming
- TCP and UDP transport protocols
- TCP connection establishment and termination
- UDP datagram-based communication
- Network ports, sockets, IP addresses, and MAC addresses
- Data-link layer framing
- Error detection and correction
- Checksums, frame check sequence, and CRC concepts
- Stop-and-wait protocol
- Sliding window protocols
- Go-Back-N and Selective Repeat
- Ethernet and LAN technologies
- CSMA/CD and shared-medium access
- Wireless LANs and VLANs
- LAN switching and Spanning Tree Protocol
- IP packet format and IP addressing
- ARP, DNS, and IPv6
- Application-layer protocol behavior
- Network debugging and packet analysis using Wireshark
- Peer-to-peer application design

## Theory Learned
This course built a strong theoretical understanding of how computer networks are structured and how different protocol layers work together.

A major concept was layered network design. The course explained how each layer has a specific responsibility, such as physical transmission, local delivery, routing, transport reliability, and application-level communication. The OSI model was used as a conceptual framework, while the TCP/IP model was emphasized as the practical model used by the Internet.

Encapsulation was another important topic. I learned how application data is wrapped with headers as it moves down the network stack. For example, an application message becomes a TCP segment, then an IP packet, then an Ethernet frame before being sent over the physical medium. In Wireshark, this was visible through Ethernet headers, IP headers, TCP/UDP headers, ICMP fields, port numbers, and protocol numbers.

The course also covered the difference between TCP and UDP. TCP was studied as a reliable, connection-oriented protocol that uses connection setup, acknowledgments, ordered delivery, and connection termination. UDP was studied as a lightweight, connectionless protocol where each datagram is sent independently without reliability, ordering, or congestion-control guarantees from the transport layer.

At the data-link layer, I learned about framing, error detection, retransmission, and collision handling. Framing explains how a receiver identifies where a frame begins and ends in a continuous stream of bits. Error detection concepts included frame check sequences, checksums, CRC-style checking, and how a receiver can detect corrupted frames. Retransmission was studied through ACKs, timeouts, and stop-and-wait style communication.

The course also introduced LAN and Ethernet concepts, including CSMA/CD, collision detection, switching, VLANs, wireless LANs, and the Spanning Tree Protocol. These topics showed how devices share media, avoid loops, and forward frames efficiently within local networks.

At the network layer, the course covered IP addressing, IP packet structure, ARP, DNS, IPv6, and the role of routers in forwarding packets across networks. These topics helped connect lower-level frame delivery to end-to-end Internet communication.

## Lab Work
The lab work gave hands-on experience with real network traffic, Linux virtual machines, packet captures, and socket programming.

### Lab 1: Network Layer Architecture and Encapsulation
In Lab 1, I explored layered network architecture and encapsulation using Linux virtual machines and Wireshark. The lab involved configuring two virtual machines, assigning IP addresses, connecting them through the lab network, and generating traffic using `ping` and an Echo client-server application.

The first part of the lab used ICMP traffic. I sent ping requests from a client VM to a server VM and captured the packets in Wireshark. This allowed me to inspect Ethernet addresses, Ethernet type fields, source and destination IP addresses, IP protocol fields, and ICMP request/reply fields. This helped me understand how even a simple ping travels through multiple protocol layers.

The second part used a TCP-based Echo application. I ran an Echo server on one VM and an Echo client on another VM. After sending a test message such as `hello`, I captured the traffic and analyzed TCP source/destination ports, the IP protocol field, and the packets involved in connection setup, data transfer, and connection termination.

A key observation from this lab was that even if the application only sends a simple message, TCP produces extra packets because it must establish and close a connection. I observed the TCP three-way handshake, data exchange, and connection termination sequence. This reinforced the difference between application-level communication and the actual network traffic generated underneath.

### Lab 2: Servers Running on TCP
Lab 2 focused on TCP server behavior, connection handling, and concurrency. The lab was divided into three main parts: analyzing TCP connection setup/termination, studying concurrent servers, and implementing a simple Hello application.

In the first part, I used Wireshark to observe the TCP three-way handshake and termination sequence. This included SYN, SYN-ACK, and ACK packets for connection setup, followed by FIN/ACK packets when closing the connection. This helped me understand how TCP creates a reliable logical connection before application data is exchanged.

In the second part, I studied how a TCP server handles multiple clients. I used process commands such as `ps -a` and network commands such as `netstat -t` to observe server and child processes. When multiple clients connected, the server created child processes using `fork()`, allowing each client to be handled separately while the parent server continued listening for new connections.

In the third part, I modified a basic TCP client and server. The server accepted a connection, sent a `Hello` message, and then closed the connection. The client connected to the server, waited for the message, printed it to the terminal, and exited. This lab helped connect the theory of TCP sockets to actual C code using system calls such as `socket()`, `bind()`, `listen()`, `accept()`, `connect()`, `read()`, `write()`, and `close()`.

### Lab 3: TCP File Download Application
The COE768 course outline lists Lab 3 as a TCP-based file download application. In this lab topic, the goal was to build a client-server application where a client requests a file from a server and receives the file over a reliable TCP connection.

This lab connected directly to the course’s focus on socket programming and transport-layer reliability. The client would connect to the server using TCP, request a filename, and receive the file contents through the socket. The server would open the requested file, read its contents, and send the data back to the client.

The main concepts demonstrated in this lab were reliable stream-based communication, file I/O, buffering, application-level protocols, and error handling. Since TCP provides ordered and reliable byte-stream delivery, it is well suited for file transfer applications where corrupted, missing, or out-of-order data would be unacceptable.

### Lab 4: Iterative UDP Server
Lab 4 explored UDP through a simple iterative UDP server and time service. Unlike TCP, UDP does not establish a connection before sending data. Instead, the client sends a datagram to the server, and the server responds with another datagram.

In the first part of the lab, I implemented and tested a UDP time service. The client sent a request datagram to the server, and the server replied with the current date and time. Wireshark was used to confirm that there was no TCP-style connection setup, no three-way handshake, and no connection termination sequence. Each request and response was simply a separate UDP datagram.

The lab also helped show why UDP can be useful for simple request-response applications. For a small time query, UDP has less overhead than TCP because it does not need connection setup or reliability mechanisms. This makes it faster and simpler when the application can tolerate the lack of built-in delivery guarantees.

Another part of the lab involved UDP file transfer using custom PDUs. The client sent a C-type PDU containing the requested filename. The server opened the file and sent it back in chunks using D-type PDUs. The final chunk was marked with an F-type PDU, and errors were represented with an E-type PDU. This helped show how applications can build their own structure and reliability behavior on top of UDP when needed.

## Projects / Deliverables
The main course project was a Peer-to-Peer Application built using socket programming in C.

The objective of the project was to create a P2P file sharing system where multiple peers could register content, search for content, list available files, download files from other peers, and deregister content when leaving the network. The system used an index server to coordinate peer discovery, while the actual file transfers occurred directly between peers.

The project used both UDP and TCP. UDP was used for lightweight communication between peers and the index server, such as registration, deregistration, searching, and listing online content. TCP was used for the actual file transfers between peers because TCP provides reliable and ordered delivery.

The application was designed around Protocol Data Units (PDUs). Different PDU types represented different operations:

- R-type PDU for content registration
- D-type PDU for download requests
- T-type PDU for deregistration
- O-type PDU for listing online content
- S-type PDU for searching content
- C-type PDU for content data
- A-type PDU for acknowledgments
- E-type PDU for errors
- F-type PDU for final transfer completion

The peer program acted as both a client and a content server. A peer could register a file with the index server, listen for TCP download requests, and serve file data to other peers. When a peer downloaded a file, it could then become a content server for that file as well, supporting the P2P model where downloaded content can be redistributed by additional peers.

The index server maintained a registry of available files, peer names, IP addresses, and ports. It handled requests for registration, deregistration, search, and listing. For file searches, the server could return the location of a peer hosting the requested content. The project also included support for deregistering content when a peer quit and handling error cases such as unavailable files or duplicate/conflicting registrations.

A major implementation detail was socket management. The project used system calls such as `socket()`, `bind()`, `connect()`, `listen()`, `accept()`, `sendto()`, `recvfrom()`, `read()`, `write()`, `fork()`, `getsockname()`, and `select()`. Dynamic port assignment was handled by binding TCP sockets to port `0` and retrieving the assigned port using `getsockname()`.

The final project demonstrated several important networking concepts in one application: client-server communication, peer-to-peer architecture, TCP file transfer, UDP control messages, PDU design, error handling, acknowledgments, concurrency, dynamic port usage, and content registry management.

## Tools / Technologies
- C programming language
- Linux virtual machines
- GCC compiler
- BSD socket API
- TCP sockets
- UDP sockets
- Wireshark
- ICMP / ping
- Echo client-server application
- Linux terminal commands
- `ps`
- `netstat`
- `socket()`
- `bind()`
- `listen()`
- `accept()`
- `connect()`
- `sendto()`
- `recvfrom()`
- `read()`
- `write()`
- `close()`
- `fork()`
- `select()`
- `getsockname()`
- Custom Protocol Data Units
- File I/O in C
- Linux networking configuration
- Virtual networking environment
- Patch panel / hub-based lab setup

## Skills Demonstrated
This course demonstrated both theoretical and practical computer networking skills.

I developed the ability to analyze how data moves through a layered network model, identify the headers added at each protocol layer, and understand the role of Ethernet, IP, TCP, UDP, and application protocols. I also gained experience using Wireshark to inspect real packet captures and connect theory to actual network traffic.

The labs and project demonstrated practical socket programming skills in C. I implemented TCP and UDP client-server programs, worked with connection-oriented and connectionless communication, handled file transfer over sockets, and created custom application-level protocols using PDUs.

The project also demonstrated system design and debugging skills. I had to design a peer-to-peer application with an index server, multiple peers, registration and search functionality, reliable file transfers, error handling, acknowledgments, and cleanup behavior when peers exited.

Other skills demonstrated include:

- Packet capture and traffic analysis
- Network debugging using Wireshark
- Understanding TCP handshakes and connection teardown
- Implementing concurrent servers using child processes
- Designing simple application-layer protocols
- Structuring network messages with PDUs
- Handling TCP stream-based file transfer
- Handling UDP datagram communication
- Managing client/server state
- Debugging Linux socket programs
- Understanding port numbers, IP addresses, and protocol fields
- Explaining network behavior through lab reports and demonstrations

## Key Takeaways
The biggest takeaway from COE768 was understanding how network communication actually happens underneath an application. A simple message sent between two programs involves multiple layers, headers, addresses, ports, protocol fields, and sometimes many packets that the user never sees.

Another important takeaway was the difference between TCP and UDP. TCP is better for reliable communication such as file transfer because it provides ordered delivery and connection management. UDP is better for lightweight request-response applications where speed and low overhead matter more than guaranteed delivery.

The labs showed the value of tools like Wireshark. Instead of only learning networking concepts from diagrams, I was able to see real Ethernet frames, IP packets, TCP segments, UDP datagrams, ICMP messages, port numbers, and protocol fields.

The project connected all of the course concepts together. Building a P2P file-sharing application showed how socket programming, TCP, UDP, custom protocols, file transfer, indexing, and peer coordination can be combined into a real networked system.

Overall, COE768 strengthened my understanding of both network theory and network application development. It helped me become more comfortable with low-level networking concepts that are important for distributed systems, cloud systems, backend engineering, cybersecurity, and performance debugging.

## Related Portfolio Topics
- Socket programming in C
- Peer-to-peer file sharing application
- TCP and UDP client-server programming
- Network traffic analysis using Wireshark
- Custom application-layer protocol design
- Distributed systems communication
- File transfer protocol implementation
- Linux networking and virtual machine labs
- Backend and cloud networking fundamentals
- Debugging networked applications
- Reliable vs unreliable transport protocols
- Computer network architecture
- Protocol design and packet analysis
- Foundations for distributed cloud computing and network security