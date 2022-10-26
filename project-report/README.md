# PeerPrep

- [PeerPrep](#peerprep)
- [Introduction](#introduction)
  - [Background](#background)
  - [Purpose](#purpose)
- [Functional Requirements](#functional-requirements)
  - [User Service](#user-service)
  - [Matching Service](#matching-service)
  - [Question Service](#question-service)
  - [Collaboration Service](#collaboration-service)
  - [Execution Service](#execution-service)
  - [Frontend](#frontend)
- [Non-Functional Requirements](#non-functional-requirements)
  - [Availability Requirements](#availability-requirements)
  - [Performance Requirements](#performance-requirements)
  - [Robustness Requirements](#robustness-requirements)
  - [Security Requirements](#security-requirements)
  - [Scalability Requirements](#scalability-requirements)
  - [Usability Requirements](#usability-requirements)
  - [Integrity Requirements](#integrity-requirements)
  - [Trade-Offs](#trade-offs)
    - [Security vs Performance](#security-vs-performance)
    - [Security vs Usability](#security-vs-usability)
- [Solution Architecture](#solution-architecture)
  - [Overview](#overview)
  - [Service Instance per Container](#service-instance-per-container)
- [Development Process](#development-process)
  - [Continuous Integration](#continuous-integration)
  - [Manual Re-Deployment](#manual-re-deployment)
    - [Partial Re-Deployment](#partial-re-deployment)
  - [Full Re-Deployment](#full-re-deployment)
  - [Infrastructure as Code](#infrastructure-as-code)
  - [Design Decisions](#design-decisions)
    - [API Gateway as Reverse Proxy](#api-gateway-as-reverse-proxy)
      - [Better security for microservices](#better-security-for-microservices)
      - [Increased cohesion](#increased-cohesion)
    - [Firebase as authenticator for user-service](#firebase-as-authenticator-for-user-service)
      - [Easy sign-in with any platform](#easy-sign-in-with-any-platform)
      - [Comprehensive security](#comprehensive-security)
      - [In-built features](#in-built-features)
      - [Fast implementation](#fast-implementation)
      - [Realtime database](#realtime-database)
      - [Enforcing email verification](#enforcing-email-verification)
    - [Socket.IO for matching-service](#socketio-for-matching-service)
      - [Receiving acknowledgment](#receiving-acknowledgment)
      - [Socket.IO broadcasting and rooms](#socketio-broadcasting-and-rooms)
      - [Sticky Load balancing](#sticky-load-balancing)
      - [Tradeoffs](#tradeoffs)
- [Design Patterns](#design-patterns)
  - [Observer](#observer)
- [Possible Enhancements](#possible-enhancements)
  - [Code compilation and execution](#code-compilation-and-execution)
  - [History service](#history-service)
    - [Using Firebase's realtime database to store history](#using-firebases-realtime-database-to-store-history)
    - [Reading and writing data](#reading-and-writing-data)
    - [Using React for the frontend](#using-react-for-the-frontend)
- [Reflections and Learning Points](#reflections-and-learning-points)
- [Individual Contributions](#individual-contributions)
  - [Ong Kim Lai](#ong-kim-lai)
    - [Technical Contributions](#technical-contributions)
    - [Non-Technical Contributions](#non-technical-contributions)
  - [Ryan Low Bing Heng](#ryan-low-bing-heng)
    - [Technical Contributions](#technical-contributions-1)
    - [Non-Technical Contributions](#non-technical-contributions-1)
  - [Tang Wei Teck Frederick](#tang-wei-teck-frederick)
    - [Technical Contributions](#technical-contributions-2)
    - [Non-Technical Contributions](#non-technical-contributions-2)
  - [Yeap Yi Sheng James](#yeap-yi-sheng-james)
    - [Technical Contributions](#technical-contributions-3)
    - [Non-Technical Contributions](#non-technical-contributions-3)

# Introduction

## Background

Increasingly, students face challenging technical interviews when applying for jobs which many have difficulty dealing with. Issues range from a lack of communication skills to articulate their thought process out loud to an outright inability to understand and solve the given problem. Moreover, grinding practice questions can be tedious and monotonous.

## Purpose

To tackle these issues, our team is working on PeerPrep: a peer learning system where students can find peers to practice whiteboard-style interview questions together.

In building PeerPrep, we seek to achieve the following objectives:

- Give students an effective way to improve their ability to articulate key technical concepts
- Serve as a platform for students to learn from one another
- Expose students to practice questions that can materially improve their understanding of relevant technical concepts

# Functional Requirements

## User Service

| ID     | Description                                                                            | Priority |
| ------ | -------------------------------------------------------------------------------------- | -------- |
| F-US-1 | The system should allow users to create an account with a username and password.       | High     |
| F-US-2 | The system should ensure that every account created has a unique username.             | High     |
| F-US-3 | The system should allow users to log into their accounts with a username and password. | High     |
| F-US-4 | The system should allow users to log out of their account.                             | High     |
| F-US-5 | The system should allow users to delete their account.                                 | High     |
| F-US-6 | The system should allow users to change their password.                                | Medium   |

## Matching Service

| ID     | Description                                                                                                        | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------------ | -------- |
| F-MA-1 | The system should allow users to select the difficulty level of the questions they wish to attempt.                | High     |
| F-MA-2 | The system should be able to match two waiting users with similar difficulty levels and put them in the same room. | High     |
| F-MA-3 | If there is a valid match, the system should match the users within a reasonable amount of time.                   | High     |
| F-MA-4 | The system should provide a means for the user to leave a room once matched.                                       | Medium   |

## Question Service

| ID     | Description                                                         | Priority |
| ------ | ------------------------------------------------------------------- | -------- |
| F-QU-1 | The system should store a list of questions, indexed by difficulty. | High     |
| F-QU-2 | The system should allow users to retrieve a question by difficulty. | High     |
| F-QU-3 | The system should allow administrators to add additional questions. | High     |

## Collaboration Service

| ID     | Description                                                                             | Priority |
| ------ | --------------------------------------------------------------------------------------- | -------- |
| F-CO-1 | The system should provide a text-editor that is synced between users in the same match. | High     |
| F-CO-2 | The system should allow peers to see each other's cursors and highlights.               | Low      |

## Execution Service

| ID     | Description                                                                    | Priority |
| ------ | ------------------------------------------------------------------------------ | -------- |
| F-EX-1 | The system should provide a compiler for Java and C programs.                  | Medium   |
| F-EX-2 | The system should provide the execution output of Java, C and Python programs. | Medium   |

## Frontend

| ID      | Description                                                                                                        | Priority |
| ------- | ------------------------------------------------------------------------------------------------------------------ | -------- |
| F-FR-1  | The system should provide the user with a login page.                                                              | High     |
| F-FR-2  | The system should provide the user with a registration page.                                                       | High     |
| F-FR-3  | The system should restrict access for unauthorized users to only login and registration pages.                     | High     |
| F-FR-4  | The system should allow toggling between light and dark mode for all pages.                                        | Low      |
| F-FR-5  | The chat box should provide a list of prompts for the "interviewer" to ask the "interviewee".                      | High     |
| F-FR-6  | The system should provide a chat box that allows users in the same match to communicate via text messages.         | High     |
| F-FR-7  | The system should provide the user with a text editor.                                                             | High     |
| F-FR-8  | The text editor should handle syntax highlight for programming language of choice.                                 | Medium   |
| F-FR-9  | The text editor should handle syntax formatting for programming language of choice.                                | Medium   |
| F-FR-10 | The text editor should allow the user to choose between Java, C and Python as their programming language of choice | High     |
| F-FR-11 | The system should provide a non-interactive terminal to display the output of the executed program.                | Medium   |
| F-FR-12 | The system should inform the users that no match is available if a match cannot be found within 30 seconds.        | High     |

# Non-Functional Requirements

## Availability Requirements

| ID     | Description s                                                                   | Priority |
| ------ | ------------------------------------------------------------------------------- | -------- |
| N-AV-1 | The system shall be at least 95% available between 6am and 12am Singapore time. | High     |

## Performance Requirements

| ID     | Description                                                                                                              | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------------------ | -------- |
| N-PE-1 | The collaborative text editor should display changes made by a user to other users in the same match in below 5 seconds. | High     |
| N-PE-2 | Messages sent through the chat box should be received by users in below 5 seconds.                                       | High     |
| N-PE-3 | The system should display the output of the executed programs in under 10 seconds.                                       | Medium   |
| N-PE-4 | If there is a valid match, the system should match the users within 30s.                                                 | High     |

## Robustness Requirements

| ID     | Description                                                                              | Priority |
| ------ | ---------------------------------------------------------------------------------------- | -------- |
| N-RO-1 | The system should not evict the user from the match when the user refreshes the browser. | High     |

## Security Requirements

| ID     | Description                                                            | Priority |
| ------ | ---------------------------------------------------------------------- | -------- |
| N-SE-1 | Users' passwords should be hashed and salted before storing in the DB. | Medium   |
| N-SE-2 | The system should only grant authorized users access to all pages.     | High     |
| N-SE-3 | The system should expire access tokens after 1 hour.                   | High     |

## Scalability Requirements

| ID     | Description                                                     | Priority |
| ------ | --------------------------------------------------------------- | -------- |
| N-SC-1 | The system should be able to handle at least 100 users at once. | Low      |

## Usability Requirements

| ID     | Description                                                                                                     | Priority |
| ------ | --------------------------------------------------------------------------------------------------------------- | -------- |
| N-US-1 | The application should be intuitive enough such that the user does not have to refer to a user guide to use it. | Medium   |

## Integrity Requirements

| ID     | Description                                                                                                                              | Priority |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| N-IN-1 | The collaborative text editor should preserve the work done by the user when the browser is refreshed when the user is still in a match. | High     |

## Trade-Offs

![Non-Functional-Requirements-Prioritisation-Table](https://github.com/CS3219-AY2223S1/cs3219-project-ay2223s1-g22/blob/main/project-report/images/requirement_prioritisation_table.PNG?raw=true)

### Security vs Performance

Our team had to decide whether to authenticate incoming requests for microservices. On one hand, if we didn't authenticate these requests, the response time for these requests would be faster because no checks needed to be done. On the other, not authenticating incoming requests would make the system vulnerable to attacks such as Denial-of-Service (DOS), where bots can flood the microservices with numerous requests and cause slower response times for our users.

We eventually decided to enforce authentication for a select number of endpoints by using an [API Gateway](#api-gateway-as-reverse-proxy) to increase the security and stability of our system, which in our view was worth the slight decrease in performance.

### Security vs Usability

Another issue that we had to consider was whether it was important to [verify the email addresses used for creating accounts](#enforcing-email-verification).

Requiring our users to verify their emails before giving them full access to our application may lead to a tedious user experience. This being the case however, we felt that the inconvenience caused to our users was necessary in order to ensure the security and availability of PeerPrep, as doing so can prevent bots from performing DOS attacks on our web application and causing performance issues for our users.

# Solution Architecture

## Overview

![PeerPrep-Solution-Architecture](https://github.com/CS3219-AY2223S1/cs3219-project-ay2223s1-g22/blob/main/project-report/images/PeerPrep-Architecture-V2.png?raw=true)

## Service Instance per Container

Each microservice is packaged into a Docker container image and deployed in a distinct container using Cloud Run on Google Cloud Platform.

By deploying service instances in separate containers, each microservice can be scaled up or down separately as needed as demand fluctuates, leading to better cost efficiency.

Also, by deploying the service instances in containers instead of virtual machines, start up time is reduced.

# Development Process

## Continuous Integration

The project uses a workflow script to perform testing using GitHub Actions.

When a pull-request to the `main` branch is created, the workflow will run unit tests for each of the services by:

- building a Docker image from the `test` stage of the service's Dockerfile
- starting a container from the image
- invoking the command to execute the unit tests for the service

When all unit tests have been executed without any failures, the workflow ends with a `completed` status.

- If at least one unit test from any service fails, the workflow ends with a `failed` status.
- The completion status of the workflow is reflected in the page of the pull-request on GitHub.

## Manual Re-Deployment

### Partial Re-Deployment

For Milestone 1, the team decided to deploy updates manually to the production environment with Github Actions and Terraform.

When a new feature is introduced to a service, and the code has been merged into the `main` branch, the team would invoke a deployment workflow and specify the service to be updated. This would trigger the deployment workflow to run.

When the deployment workflow runs, the following steps are taken:

- A Docker image is built from the `build` stage of the target service's Dockerfile.
  - The image is tagged with the a unique hash value, which is associated with the current run of the workflow.
- After creation, the image is uploaded to the Google Container Repository.
- The tag of the latest image is passed to the next phase of the workflow, which updates the production environment with Terraform, which:
  - Shuts down all containers in the production environment that are currently running the service
  - Creates new containers using the new Docker image

![partial-redeployment-process](https://github.com/CS3219-AY2223S1/cs3219-project-ay2223s1-g22/blob/main/project-report/images/partial-redeployment-process.png?raw=true)

## Full Re-Deployment

In Milestone 2, we added a workflow to trigger the complete re-deployment of all services.

This workflow would re-deploy all services using the `main` branch in the following order:

1. Frontend
2. API gateway
3. Matching service
4. User service
5. Collaboration service
6. Questions service

## Infrastructure as Code

To better manage the production environment, the team has defined the infrastructure components required for each service in Terraform module configuration files.

This makes updating infrastructure easier:

- to add, modify or remove a component for a service, the team would modify the Terraform configuration file for the service
- A request would then be made to Terraform to automatically update the infrastructure with the updated configuration file in the following manner:
  - deploy component(s) added to the configuration file.
  - re-deploy any component(s) whose configurations have been modified
    - eg: the target Docker image of the container
  - shut down component(s) removed from the configuration file

Managing infrastructure in a declarative manner using Terraform configuration files also allows the team to keep track of changes made to the infrastructure over time.

## Design Decisions

### API Gateway as Reverse Proxy

Instead of interacting with the microservices directly, the frontend sends requests to an API gateway, which forwards requests to the relevant microservices.

Our team decided on this approach for two main reasons:

- Better security for microservices
- Increased cohesion

#### Better security for microservices

Access to microservices is protected by an API gateway in the following manner:

- if the requested endpoint is unprotected, the API gateway will forward it to the microservice(s) that are responsible for fulfilling the request
- however, if the requested endpoint is protected, the request must provide some credentials for authentication:
  - when the user successfully logs in, an `access token` and `refresh token` will be provided:
    - the `access token` is valid for an hour
    - the `refresh token` will remain valid for an indefinite period of time until either of the following occur:
      - the user logs out
      - the user deletes the account
  - to access protected endpoint, the `access token` must be included in the `Authorization` header as a `bearer token`
    - upon receiving the request, the API gateway will send the `access token` to the User service to verify that the `access token`:
      - has not been tampered with
      - has not expired
    - once the `access token` has been authenticated by the User service, the request will be forwarded to the relevant microservice(s)
      - otherwise, the request will be refused by the API gateway

![api-gateway-authentication](https://github.com/CS3219-AY2223S1/cs3219-project-ay2223s1-g22/blob/main/project-report/images/api-gateway-authentication.png?raw=true)

#### Increased cohesion

Implementing the authentication logic in the API gateway removes this responsibility from the microservices.

This reduces the need for each microservice to implement its own authentication logic and allows it to focus on fulfilling its core function, increasing cohesion and reducing duplication of code.

---

### Firebase as authenticator for user-service

#### Easy sign-in with any platform

Provides end-to-end identity solution supporting different methods of authentication such as the basic email and password accounts, Google, Twitter, Facebook, Github login etc.

#### Comprehensive security

Firebase uses a modified Firebase version of the scrypt hashing algorithm to store passwords. This version is more secure against hardware brute-force attacks than alternative functions such as PBKDF2 or bcrypt. Also, scrypt automatically does password salting on top of password hashing.

#### In-built features

Firebase has many in-built features for their authentication system. Some of these useful features that we used were the email address verification and password reset. These allowed us to easily implement an authentication system with all the necessary in-built features that are essential to us.

#### Fast implementation

We figured that it can take quite a long time to develop our own authentication system that is reasonably secure and not to mention the need to maintain it in future. Hence, we decided to use Firebase Authentication that is already developed by Google which will allow us to implement a secure auth system quickly and without much hassle.

#### Realtime database

In Firebase, here is an in-built realtime database that we can use to store our essential user data. With the integration of Firebase Authentication, it helps to deal with security concerns of users. Also, with Firebase's realtime database, we have the ability to set data permissions as well.

#### Enforcing email verification

For every new user, we made use of Firebase's email verification to ensure every user verifies their account. If the user's email account is left unverified, he/she would not be able to use the matching service of PeerPrep.

---

### Socket.IO for matching-service

Socket.IO is built on top of the WebSocket protocol and provides additional guarantees like fallback to HTTP long-polling or automatic reconnection.

#### Receiving acknowledgment

Socket.IO provides a very convenient way to send an event and receive a response. This feature allows us to send acknowledgement to the client that the server as added them to the queue and have/are looking for a match for them.

#### Socket.IO broadcasting and rooms

Rooms are arbitrary channels that sockets can join and leave. We used this in conjunction with the broadcasting feature that is also another functionality provided by Socket.IO. When 2 clients have been matched, they are added to the same room. This feature was used to implement our chat service, as messages from the server/another client in the room can easily be broadcast to all sockets in the room.

#### Sticky Load balancing

Socket.IO allows us to scale to multiple servers if we need to by using sticky-sessions.

#### Tradeoffs

https://itnext.io/differences-between-websockets-and-socket-io-a9e5fa29d3dc

# Design Patterns

## Observer

Our team used the WebSocket protocol extensively for asynchronous communication between the frontend and microservices.

Some examples include:

- receiving chat messages from the other user in the match [F-FR-6](#frontend)
- moving a user to the match room page once a match has been found [F-MA-3](#matching-service)

These features are implemented using the Observer pattern in the frontend and matching service in the following manner:

- a WebSocket object that receives messages from a microservice is instantiated
  - this object is the `Observable`
- a component that is responsible for performing a certain action received registers interest in a particular type of message
  - the component acts as the `Observer` of the WebSocket object

For example, in the page where the user submits requests for a match, we want to look out for notifications from the matching service when a match has been found so that the user can be redirected to the match room page to begin the match.

A code snippet from the frontend that implements this feature is included below:

```javascript
/* code snippet from MatchRoomPage.js */

socket.on("room-number", (roomNumber, question, opponent) => {
  // ... code omitted for brevity

  showMatchFoundToast();
  navigate("/matchroom", {
    state: {
      roomNumber,
      question,
      opponentUid,
    },
  });
});
```

Within the match selection page component, we listen for any incoming messages containing the `room-number`, which the matching service will send to the frontend once a match has been found.

When this message is received, two actions are performed:

- a popup notification is displayed to inform the user that a match has been found
  - done using the `showMatchFoundToast()` method call
- the user is redirected to the match room page
  - done using the `navigate("/matchroom", ...)` method call

# Possible Enhancements

## Code compilation and execution

Currently, users cannot compile and run the solution that they have worked on during a match.

To make this possible, an [Execution Service](#execution-service) can be set up. This microservice would receive the source code from the frontend, compile it using a suitable compiler, and execute the compiled program with a list of inputs from the user.

Once the execution is complete, the results output by the compiled program will be sent to the frontend; along with any compilation or runtime errors.

## History service

Currently, users are unable to see their past collaborations with other matched users.

Below is the architecture diagram to illustrate the implementation of a history service.

[Insert architecture diagram]

### Using Firebase's realtime database to store history

Since we used Firebase as our authenticator, the most efficient and effective way to keep history records of respective users would be to use Firebase's realtime database. Whenever a user creates a new account, their user details would be automatically stored in the realtime database. Each user is stored with their respective uid as the child under the parent "users/".

### Reading and writing data

We can create api requests to write and read data from the realtime database.
At the end of every collaboration session, the details that would be recorded are:

1. Matched user's details
2. Question
3. Collaborated code on code editor
4. Chat log

### Using React for the frontend

The frontend for history service would display the 50 most recent collaborations of the user. The user would be able to see the details of the other matched user, question, chat log and collaborated code. There is also a filter feature where the user would be able to filter based on the following:

1. Difficulty of the question
2. Matched user
3. Keywords of the question

# Reflections and Learning Points

TODO

# Individual Contributions

## Ong Kim Lai

### Technical Contributions

TODO

### Non-Technical Contributions

TODO

## Ryan Low Bing Heng

### Technical Contributions

TODO

### Non-Technical Contributions

TODO

## Tang Wei Teck Frederick

### Technical Contributions

- Implemented user-service
  - created the api calls for user authentication (login, signup, logout etc)
  - created middleware to check for user's access token
- Implemented email verification for each new user signup
  - unverified users are unable to use matching service
- Implemented reset password functionality
- Used firebase realtime database to store basic user information
- Implemented form validation for the frontend of signup page
- Worked on the frontend ui and logic

### Non-Technical Contributions

- Documented the design decisions for firebase
  - included the tradeoffs
- Documented the possible enhancements for match history
  - created an architectural diagram
- Helped to create the sequence diagrams
  - Question service
  - Matching service
- Create user-service and frontend issues

## Yeap Yi Sheng James

### Technical Contributions

- Implemented collaborative editor component on frontend
- Set up collaboration service to sync editors of users in the same match
- Developed API gateway
- Wrote GitHub Actions workflow scripts
  - for continuous-integration:
    - to run unit tests on all services for pull-requests to `main` branch
  - for manual deployment:
    - to dockerize services and upload docker images to Google Container Repository (GCR)
    - to trigger re-deployment of selected service on Google Cloud Platform
- Set up deployment environment
  - Wrote Terraform configuration files to define the deployment environment for each service

### Non-Technical Contributions

- Created solution architecture diagrams for project documentation
- Documented the following aspects of the development process:
  - Continuous Integration
  - Manual Deployment
  - Infrastructure as Code
- Documented design decisions made:
  - API Gateway as Reverse Proxy
    - Created a sequence diagram that shows the interactions between the user, API Gateway, and microservices
- Documented prioritisation of non-functional requirements in a table
  - justified the use of an API gateway and the trade-off between Security and Performance
- Documented the use of the Observer design pattern
