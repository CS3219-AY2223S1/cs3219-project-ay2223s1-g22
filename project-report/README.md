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

| ID     | Description                                                                                       | Priority |
| ------ | ------------------------------------------------------------------------------------------------- | -------- |
| F-US-1 | The system should allow users to create an account with username and password.                    | High     |
| F-US-2 | The system should ensure that every account created has a unique username.                        | High     |
| F-US-3 | The system should allow users to log into their accounts by entering their username and password. | High     |
| F-US-4 | The system should allow users to log out of their account.                                        | High     |
| F-US-5 | The system should allow users to delete their account.                                            | High     |
| F-US-6 | The system should allow users to change their password.                                           | Medium   |

## Matching Service

| ID     | Description                                                                                                        | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------------ | -------- |
| F-MA-1 | The system should allow users to select the difficulty level of the questions they wish to attempt.                | High     |
| F-MA-2 | The system should be able to match two waiting users with similar difficulty levels and put them in the same room. | High     |
| F-MA-3 | If there is a valid match, the system should match the users within 30s.                                           | High     |
| F-MA-4 | The system should inform the users that no match is available if a match cannot be found within 30 seconds.        | High     |
| F-MA-5 | The system should provide a means for the user to leave a room once matched.                                       | Medium   |

## Question Service

| ID     | Description                                                         | Priority |
| ------ | ------------------------------------------------------------------- | -------- |
| F-QU-1 | The system should store a list of questions, indexed by difficulty. | High     |
| F-QU-2 | The system should allow users to retrieve a question by difficulty. | High     |
| F-QU-3 | The system should allow administrators to add additional questions. | High     |

## Collaboration Service

| ID     | Description                                                                                               | Priority |
| ------ | --------------------------------------------------------------------------------------------------------- | -------- |
| F-CO-1 | The system should provide a text-editor that is synced in near real-time between users in the same match. | High     |

## Chat Service

| ID     | Description                                                                                                | Priority |
| ------ | ---------------------------------------------------------------------------------------------------------- | -------- |
| F-CH-1 | The system should provide a chat box that allows users in the same match to communicate via text messages. | High     |

## Frontend Service

| ID     | Description                                                                                     | Priority |
| ------ | ----------------------------------------------------------------------------------------------- | -------- |
| F-AP-1 | The system should provide the user with the files necessary to run the client in a web browser. | High     |

# Non-Functional Requirements

TODO - Requirement Prioritization table (refer to slide 42 of Lecture 2)

## Availability Requirements

| ID     | Description | Priority |
| ------ | ----------- | -------- |
| N-AV-1 | TODO        | TODO     |

## Integrity Requirements

| ID     | Description | Priority |
| ------ | ----------- | -------- |
| N-IN-1 | TODO        | TODO     |

## Performance Requirements

| ID     | Description                                                                                                              | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------------------ | -------- |
| N-PE-1 | The collaborative text editor should display changes made by a user to other users in the same match in below 5 seconds. | High     |
| N-PE-2 | Messages sent through the chat box should be received by users in below 5 seconds.                                       | High     |

## Robustness Requirements

| ID     | Description | Priority |
| ------ | ----------- | -------- |
| N-RO-1 | TODO        | TODO     |

## Security Requirements

| ID     | Description                                                            | Priority |
| ------ | ---------------------------------------------------------------------- | -------- |
| N-SE-1 | Users' passwords should be hashed and salted before storing in the DB. | Medium   |

## Usability Requirements

| ID     | Description | Priority |
| ------ | ----------- | -------- |
| N-US-1 | TODO        | TODO     |

## Scalability Requirements

| ID     | Description | Priority |
| ------ | ----------- | -------- |
| N-SC-1 | TODO        | TODO     |

# Solution Architecture

![PeerPrep-Solution-Architecture](https://github.com/CS3219-AY2223S1/cs3219-project-ay2223s1-g22/blob/main/project-report/images/PeerPrep-Architecture-V1.png?raw=true)

# Development Process

## Continuous Integration

The project uses a workflow script to perform testing using Github Actions.

When a pull-request to the `main` branch is created, the workflow will run unit tests for each of the services by:

- building a Docker image from the `test` stage of the service's Dockerfile
- starting a container from the image
- invoking the command to execute the unit tests for the service

When all unit tests have been executed without any failures, the workflow ends with a `completed` status.

- If at least one unit test from any service fails, the workflow ends with a `failed` status.
- The completion status of the workflow is reflected in the page of the pull-request on GitHub.

## Deployment

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
