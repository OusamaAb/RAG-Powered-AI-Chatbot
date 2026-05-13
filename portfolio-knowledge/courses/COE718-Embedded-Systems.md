# COE718 — Embedded Systems

## Course Overview
Embedded Systems Design introduced the design, programming, testing, and integration of embedded computer systems, with a strong focus on ARM Cortex-M3 based development. The course covered how microcontrollers interact with hardware peripherals, how low-level software controls real-world devices, and how real-time operating systems are used to schedule time-sensitive embedded tasks.

The course combined embedded processor architecture, real-time software design, interrupts, peripheral control, multitasking, scheduling algorithms, and hardware-software co-design. A major part of the course involved using the ARM Cortex-M3 as a representative embedded processor and applying embedded C programming on the LPC17xx / MCB1700 development platform.

## Institution / Program
Toronto Metropolitan University, Software Engineering, Electrical and Computer Engineering Department

## Term / Date
Fourth Year, Fall Semester

## Main Topics
- Embedded systems and real-time systems
- ARM7 and ARM Cortex-M3 / Cortex-M4 processor architecture
- ARMv7-M programming model
- Memory-mapped I/O and peripheral control
- GPIO, LEDs, joystick input, ADC, DAC, LCD, timers, and USB
- Keil µVision embedded development workflow
- ARM Cortex-M3 performance features such as bit-banding, conditional execution, and barrel shifting
- Interrupt-driven programming and timer-based control
- CMSIS-RTOS / Keil RTX real-time operating system
- Multithreaded embedded applications
- Preemptive, non-preemptive, round-robin, and cooperative scheduling
- Rate Monotonic Scheduling and Earliest Deadline First scheduling
- Task priorities, context switching, signals, mutexes, and thread synchronization
- Priority inversion and priority elevation
- Hardware-software co-design
- System-on-programmable-chip concepts
- Accelerator-based embedded systems
- Fault-tolerant embedded systems
- Embedded project design, demo, presentation, and technical reporting

## Theory Learned
This course focused on how embedded systems are designed when software must interact directly with constrained hardware. Unlike general-purpose software, embedded software has to consider timing, memory, processor limitations, I/O devices, and real-time correctness. A key idea from the course was that an embedded system is not only judged by whether it produces the correct output, but also by whether it produces that output at the correct time.

A major theoretical component was ARM Cortex-M3 architecture. This included the ARM programming model, registers, memory-mapped peripherals, instruction execution, interrupts, exception handling, bit-level operations, and performance-oriented CPU features. Concepts like bit-banding showed how individual bits in memory or peripheral registers can be accessed efficiently, which is important when controlling hardware pins. Barrel shifting and conditional execution showed how processor-level features can reduce instruction count and improve performance.

The course also covered real-time operating systems, especially the RTX environment. This included how embedded tasks are created, scheduled, paused, resumed, synchronized, and terminated. Different scheduling models were studied, including preemptive scheduling, non-preemptive scheduling, round-robin scheduling, and cooperative multitasking. The course emphasized how task priority affects responsiveness and how a higher-priority task can interrupt a lower-priority one.

Real-time scheduling theory was another important part of the course. Rate Monotonic Scheduling was studied as a fixed-priority approach where shorter-period tasks receive higher priority. Earliest Deadline First scheduling was introduced as a dynamic-priority approach where the task with the closest deadline runs first. These concepts were connected to schedulability, timing diagrams, CPU utilization, and response-time reasoning.

The course also covered priority inversion, which happens when a high-priority task is blocked because a lower-priority task is holding a shared resource. This was connected to practical embedded system problems where resource sharing, mutexes, and task priorities can cause unexpected delays. Priority elevation was used as a solution, where the lower-priority task temporarily receives a higher priority so it can finish its critical section and release the resource.

Another major theory area was hardware-software co-design. The course introduced how embedded systems are partitioned between hardware and software, how peripherals and processors work together, and how design decisions affect performance, timing, complexity, and reliability. This also connected to system-on-programmable-chip ideas and the use of modeling or specification tools to represent embedded systems before implementation.

## Lab Work
The lab work gave hands-on experience with embedded C programming, ARM Cortex-M3 development, peripheral control, debugging, and real-time operating system behavior.

### Lab 1: Introduction to Keil µVision and ARM Cortex-M3
The first lab introduced the Keil µVision environment and basic embedded programming on the ARM Cortex-M3 platform. The focus was on connecting input and output devices to a microcontroller and controlling them through software.

The joystick was used as the main input device. The program detected joystick directions such as up, down, left, right, and center/select. Each joystick direction was connected to a different LED output, so moving the joystick turned on the LED associated with that direction. This gave practical experience with GPIO input, GPIO output, bitmasks, and direct hardware control.

The lab also used the GLCD display to show the current joystick direction and used ADC-related code to read analog values. This helped connect multiple embedded peripherals in one program, including joystick input, LED output, LCD display output, and ADC input. The main takeaway from this lab was understanding how embedded software reads hardware state and updates physical output devices through low-level register-based control.

### Lab 2: Exploring ARM Cortex-M3 Features for Performance Efficiency
The second lab explored Cortex-M3 processor features that improve embedded software performance. The main focus was comparing different ways to control LEDs using masking, function-based bit-banding, and direct bit-banding.

The lab demonstrated how masking changes a bit by reading and modifying a full register value, while bit-banding allows individual bits to be addressed more directly. Direct bit-banding required manually calculating alias addresses using the bit-band formula. This helped show the difference between writing readable code and writing highly optimized low-level embedded code.

The lab also explored conditional execution and barrel shifting. Barrel shifting was used to perform operations like `2^n` through left shifts, then use the result to light different LEDs. This connected a processor-level concept to a visible hardware output.

Performance was measured in debug and target modes using different optimization levels. The debug version focused on measuring execution time, while the target version added LCD output and delays so the behavior could be physically observed on the board. This lab showed how small implementation choices can affect timing, especially in resource-constrained embedded systems.

### Lab 3b: Preemptive Scheduling with RTX
The third lab focused on preemptive scheduling using the RTX real-time operating system on the ARM Cortex-M3. The purpose was to understand how multiple tasks run under an RTOS and how priority affects execution order.

Several tasks were created with different priorities. The event viewer was used to observe which task was running at different points in time. Higher-priority tasks were shown to preempt lower-priority tasks, which reinforced how preemptive scheduling works in real-time systems.

The lab also used thread yielding, signals, delays, and task termination. In one part, tasks sent signals to each other to coordinate execution, such as Task 1 signaling Task 2 and Task 3 signaling Task 4. A string logger was updated using synchronization logic, which introduced the importance of protecting shared resources in multithreaded embedded software.

This lab connected theory to implementation by showing task states such as running, ready, waiting, and terminated inside the debugger. It helped explain why RTOS task management is useful in embedded systems where multiple activities must be coordinated with predictable timing.

### Lab 4: Real-Time Scheduling and Priority Inversion
The fourth lab focused on real-time scheduling, Rate Monotonic Scheduling, virtual timers, signal/wait flags, and priority inversion.

In the first part, periodic threads were scheduled using Rate Monotonic Scheduling. Tasks with shorter periods received higher priorities, and the debugger was used to observe the scheduling timeline. The lab showed how a high-priority task with a shorter period could preempt lower-priority tasks when its timer triggered.

The second part demonstrated priority inversion. A high-priority task needed a resource or service from a lower-priority task, but an intermediate-priority task could prevent the lower-priority task from running. This caused the high-priority task to be indirectly blocked, which is dangerous in a real-time system.

The solution used priority elevation. The lower-priority task was temporarily raised to a higher priority so it could finish its critical work and allow the high-priority task to continue. This lab was important because it showed that real-time systems are not only about assigning priorities, but also about carefully managing shared resources and avoiding scheduling problems.

## Projects / Deliverables
The main course project was a Media Centre application built on the LPC17xx / MCB1700 embedded platform. The project combined multiple embedded-system concepts into one integrated system.

The Media Centre included three main applications:

1. A Photo Gallery that displayed multiple images on the 320×240 GLCD screen.
2. An Audio Player that streamed audio from a host computer through USB and output it using timer-driven DAC playback.
3. A Game Centre that launched an interactive T-Rex Run style game rendered on the LCD.

The project was organized using a state-machine architecture. The system started in the main menu, where the joystick was used to select between the photo gallery, audio player, and game center. Each feature had its own state and module, and the program transitioned between states based on joystick input. This made the code easier to manage because each application had a clear responsibility.

The Photo Gallery used image data converted into C arrays and displayed them through GLCD bitmap functions. The joystick allowed the user to scroll through images and return to the menu.

The Audio Player used USB audio streaming, ADC-based volume control, DAC output, circular buffering, and timer interrupts. Timer0 was configured to output samples at a steady audio rate, while the ADC potentiometer adjusted volume in real time. This part of the project required careful timing because audio playback depends on consistent sample output.

The Game Centre launched a T-Rex Run game. The game used real-time movement, simple gravity-based jumping physics, obstacle spawning, collision detection, score tracking, and increasing difficulty. The game loop updated the screen, read joystick input, moved obstacles, checked collisions, and displayed a game-over screen.

The project demonstrated hardware-software co-design because it combined GLCD/SPI graphics, GPIO joystick input, USB communication, ADC input, DAC output, timer interrupts, and modular embedded C software. The final deliverables included the implemented application, project demo/presentation, and final technical project report.

## Tools / Technologies
- C programming
- Embedded C
- ARM Cortex-M3
- NXP LPC17xx / LPC1768 microcontroller platform
- MCB1700 development board
- Keil µVision IDE
- CMSIS libraries
- CMSIS-RTOS / Keil RTX
- LPC17xx hardware libraries
- GLCD display library
- KBD joystick library
- LED driver library
- ADC and DAC peripherals
- GPIO programming
- SPI-based LCD communication
- USB audio device stack
- Timer interrupts
- Interrupt service routines
- Event Viewer
- RTX Task Viewer
- Performance Analyzer
- Debug mode and target hardware testing
- Bit-banding and memory-mapped register access
- State-machine based embedded application design
- Hardware-software co-design concepts
- SystemC / UML concepts for embedded system co-specification
- Altera Quartus II / SOPC Builder concepts introduced in course theory

## Skills Demonstrated
- Embedded C programming on ARM Cortex-M3 hardware
- Low-level register-based programming
- GPIO input and output control
- Reading joystick inputs and controlling LEDs
- Using ADC and DAC peripherals
- Displaying text and graphics on a GLCD
- Writing interrupt-driven embedded software
- Configuring timers for periodic behavior
- Understanding ARM Cortex-M3 processor features
- Applying bit-banding, masking, and barrel shifting
- Measuring and comparing embedded code performance
- Designing real-time applications using RTX
- Creating and managing RTOS threads
- Using task priorities, delays, signals, and mutexes
- Analyzing task execution using Event Viewer and RTX Task Viewer
- Implementing Rate Monotonic Scheduling
- Understanding and resolving priority inversion
- Designing modular embedded applications
- Building a state-machine architecture for menu-driven software
- Integrating multiple peripherals into one embedded system
- Debugging hardware-software interaction issues
- Writing technical lab reports and project documentation
- Presenting and demonstrating an embedded system project

## Key Takeaways
This course showed that embedded systems require a different mindset than normal application development. The software is much closer to the hardware, so timing, memory usage, register access, peripherals, interrupts, and hardware limitations all matter.

A major takeaway was that real-time correctness depends on both logic and timing. A program can produce the correct result but still fail if it produces that result too late. This became clear through the scheduling labs, where task priorities, preemption, signal waiting, and priority inversion affected system behavior.

Another important takeaway was the value of modular design. The final Media Centre project would have been difficult to manage without separating the menu, photo gallery, audio player, and game center into different modules. The state-machine structure made the application easier to test, debug, and expand.

The labs also showed that small low-level choices can have a real performance impact. For example, masking, function-based bit-banding, and direct bit-banding all achieved similar visible LED behavior, but they differed in execution time and implementation style.

The project tied the course together by showing how an embedded system can combine user input, display output, audio streaming, interrupts, timers, and real-time control into one working application.

## Related Portfolio Topics
- Embedded systems programming
- ARM Cortex-M3 development
- Real-time operating systems
- RTOS scheduling and task synchronization
- Low-level C programming
- Hardware-software integration
- Microcontroller-based application development
- Peripheral control with GPIO, ADC, DAC, SPI, USB, and timers
- Interrupt-driven software design
- State-machine based application architecture
- Multimedia embedded systems
- Game development on constrained hardware
- Real-time audio streaming
- Hardware debugging and performance analysis
- Technical documentation and project reporting