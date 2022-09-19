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
- [Solution Architecture](#solution-architecture)
- [Development Process](#development-process)
  - [Continuous Integration](#continuous-integration)
  - [Manual Deployment](#manual-deployment)
  - [Infrastructure as Code](#infrastructure-as-code)
- [Design Patterns](#design-patterns)
- [Possible Enhancements](#possible-enhancements)
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

| ID     | Description                                                                            | Priority | Tasks                                                                                                                            |
| ------ | -------------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| F-US-1 | The system should allow users to create an account with a username and password.       | High     | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-US-1%22) |
| F-US-2 | The system should ensure that every account created has a unique username.             | High     | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-US-2%22) |
| F-US-3 | The system should allow users to log into their accounts with a username and password. | High     | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-US-3%22) |
| F-US-4 | The system should allow users to log out of their account.                             | High     | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-US-4%22) |
| F-US-5 | The system should allow users to delete their account.                                 | High     | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-US-5%22) |
| F-US-6 | The system should allow users to change their password.                                | Medium   | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-US-6%22) |

## Matching Service

| ID     | Description                                                                                                        | Priority | Tasks                                                                                                                            |
| ------ | ------------------------------------------------------------------------------------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| F-MA-1 | The system should allow users to select the difficulty level of the questions they wish to attempt.                | High     | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-MA-1%22) |
| F-MA-2 | The system should be able to match two waiting users with similar difficulty levels and put them in the same room. | High     | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-MA-2%22) |
| F-MA-3 | If there is a valid match, the system should match the users within a reasonable amount of time.                   | High     | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-MA-3%22) |
| F-MA-4 | The system should provide a means for the user to leave a room once matched.                                       | Medium   | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-MA-4%22) |

## Question Service

| ID     | Description                                                         | Priority | Tasks                                                                                                                            |
| ------ | ------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| F-QU-1 | The system should store a list of questions, indexed by difficulty. | High     | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-QU-1%22) |
| F-QU-2 | The system should allow users to retrieve a question by difficulty. | High     | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-QU-2%22) |
| F-QU-3 | The system should allow administrators to add additional questions. | High     | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-QU-3%22) |

## Collaboration Service

| ID     | Description                                                                             | Priority | Tasks                                                                                                                            |
| ------ | --------------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| F-CO-1 | The system should provide a text-editor that is synced between users in the same match. | High     | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-CO-1%22) |
| F-CO-2 | The system should allow peers to see each other's cursors and highlights.               | Low      | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-CO-2%22) |

## Execution Service

| ID     | Description                                                                    | Priority | Tasks                                                                                                                            |
| ------ | ------------------------------------------------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| F-EX-1 | The system should provide a compiler for Java and C programs.                  | Medium   | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-EX-1%22) |
| F-EX-2 | The system should provide the execution output of Java, C and Python programs. | Medium   | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-EX-2%22) |

## Frontend

| ID      | Description                                                                                                        | Priority | Tasks                                                                                                                             |
| ------- | ------------------------------------------------------------------------------------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| F-FR-1  | The system should provide the user with a login page.                                                              | High     | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-FR-1%22)  |
| F-FR-2  | The system should provide the user with a registration page.                                                       | High     | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-FR-2%22)  |
| F-FR-3  | The system should not allow unauthorized users to only access login and registration page.                         | High     | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-FR-3%22)  |
| F-FR-4  | The system should allow toggling between light and dark mode for all pages.                                        | Low      | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-FR-4%22)  |
| F-FR-5  | The chat box should provide a list of prompts for the "interviewer" to ask the "interviewee".                      | High     | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-FR-5%22)  |
| F-FR-6  | The system should provide a chat box that allows users in the same match to communicate via text messages.         | High     | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-FR-6%22)  |
| F-FR-7  | The system should provide the user with a text editor.                                                             | High     | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-FR-7%22)  |
| F-FR-8  | The text editor should handle syntax highlight for programming language of choice.                                 | Medium   | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-FR-8%22)  |
| F-FR-9  | The text editor should handle syntax formatting for programming language of choice.                                | Medium   | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-FR-9%22)  |
| F-FR-10 | The text editor should allow the user to choose between Java, C and Python as their programming language of choice | High     | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-FR-10%22) |
| F-FR-11 | The system should provide a non-interactive terminal to display the output of the executed program.                | Medium   | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-FR-11%22) |
| F-FR-12 | The system should inform the users that no match is available if a match cannot be found within 30 seconds.        | High     | [link](https://github.com/orgs/CS3219-AY2223S1/projects/18/views/4?filterQuery=is%3Aissue+functional-requirement%3A%22F-FR-12%22) |

# Non-Functional Requirements

TODO - Requirement Prioritization table (refer to slide 42 of Lecture 2)

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

# Solution Architecture

![PeerPrep-Solution-Architecture](https://github.com/CS3219-AY2223S1/cs3219-project-ay2223s1-g22/blob/main/project-report/images/PeerPrep-Architecture-V1.png?raw=true)

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

## Manual Deployment

For Milestone 1, the team decided to deploy updates manually to the production environment with Github Actions and Terraform.

When a new feature is introduced to a service, and the code has been merged into the `main` branch, the team would invoke a deployment workflow and specify the service to be updated. This would trigger the deployment workflow to run.

When the deployment workflow runs, the following steps are taken:

- A Docker image is built from the `build` stage of the target service's Dockerfile.
  - The image is tagged with the a unique hash value, which is associated with the current run of the workflow.
- After creation, the image is uploaded to the Google Container Repository.
- The tag of the latest image is passed to the next phase of the workflow, which updates the production environment with Terraform, which:
  - Shuts down all containers in the production environment that are currently running the service
  - Creates new containers using the new Docker image

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

# Design Patterns

TODO

# Possible Enhancements

TODO

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

TODO

### Non-Technical Contributions

TODO

## Yeap Yi Sheng James

### Technical Contributions

TODO

### Non-Technical Contributions

TODO
