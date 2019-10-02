# Overview

This project is a simple express app for demonstrating testing and code coverage. The project is configured to use GCP services (Cloud Build, Container Registry, and GKE) to build, deploy and run the application on the cloud.

[Jest](https://facebook.github.io/jest/) and
[Supertest](https://github.com/visionmedia/supertest) are used for testing.
Jest is also used for mocking functions and measuring code coverage.
Note that this app only focuses on server-side JavaScript testing.

## Requirements

1. Install [Node.js](https://nodejs.org/en/).
2. Install [git](https://git-scm.com/).
3. Create a [Google Cloud Platform project](https://console.cloud.google.com).
4. Install the [Google Cloud SDK](https://cloud.google.com/sdk/).
   - After downloading the SDK, initialize it:
   ```
   gcloud init
   ```
5. Create a [billing account](https://console.cloud.google.com/billing) in GCP to use any of the services/APIs.

## Getting Started

- Clone the repo
- Install dependencies with `npm install`
- Run server with `npm start` and go here:
[http://localhost:3000/](http://localhost:3000/)

## Running Tests

- Run unit and integration tests: `npm test`
- Run end-to-end tests: `npm run test:e2e`

## Code Coverage Report

A new code coverage report is generated every time `npm test` runs.
The coverage report can be viewed in the demo app:
[http://localhost:3000/coverage/lcov-report/index.html](http://localhost:3000/coverage/lcov-report/index.html)

---

## Configure the repo and build settings for GCP
- Update the **package.json** and **cloudbuild.yaml** file to have the same parameters
- Update at least the `PROJECT_ID` value for **package.json** using one of the methods below
   - Go to the console [dashboard page](https://console.cloud.google.com/home) and open the projects drop-down on the top bar to list all your projects
   - Run `gcloud projects list` and copy the project id value for your desired project.
```json
"config": {
  "PROJECT_ID": "[my-project]",
  "APP_NAME": "node-hn-app",
  "APP_NAMESPACE": "default",
  "CLUSTER_NAME": "hn-app-demo",
  "COMPUTE_REGION": "us-central1",
  "COMPUTE_ZONE": "us-central1-a"
}
```
- Update the default values in the substitution block for **cloudbuild.yaml**
```yaml
substitutions:
  _APP_NAME: node-hn-app
  _CLUSTER_NAME: hn-app-demo
  _CLUSTER_LOCATION: us-central1-a
```

## Helper scripts to enable GCP functionality

**NOTE**: Use `npm run` to execute any of the scripts below.

- Run `init-defaults` to configure docker and set project and location defaults
- Run `gcp:enable-apis` to enable all the GCP APIs needed for building and deploying this application
- Run `gcp:create-cluster` to create a GKE cluster
- Run `gcp:enable-cluster-access` to give Cloud Build access to the GKE cluster
- Run `gcp:delete-cluster` to delete the cluster created by `gcp:create-cluster`

## Containerize the application

- Run `docker:build-container` to build the docker image locally
- Run `gcp:build-container-dockerfile` to build and store the image remotely
- Run `gcp:build-container-cloudbuild` to remotely build the image after successfully executing the steps defined in cloudbuild.yaml

## Running the container

- Run `docker:run-container` to run the container locally
- Run `gcp:deploy-latest-image` to deploy and run the latest image remotely on the GKE cluster
