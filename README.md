# Gulp WordPress Project Workflow
A comprehensive Gulp workflow to allow automated management across all stages for WordPress development.

Once the environment is set up, push files as you usually would (to the build branch) and use your console to run "gulp git-stage", and "gulp git-master" when required.

## Setup

### Config
Make sure ssh details, ect, are stored in the "workflow-config.json" file. This is ignored by default so will not be pushed to any repository. Rename the "workflow-config-default.json" file to this name, and enter your projects details.

## Commands

### Initiate Git

```javascript
gulp setup-local-enviro
```

This task sets up the following:

#### Setup Git

1. Set up git in project root folder
2. Add all current files
3. Commits "Initial Commit" message
4. Sets up 2 branches - "build" & "stage"
5. Add the git origin location from package.json
6. Publishes files to cloud
7. Moves current branch to "build"

#### Setup WP-CLI on Local Environment

1. Downloads WP-CLI and saves in the root of the build


### Setup Project on Staging Site

```javascript
gulp git-clone-stage
```

This task logs into the staging server and clones the current staging repository to it. Should only be needed once.


### Setup Project on Live Site

```javascript
gulp git-clone-master
```

This task logs into the live server and clones the master repository to it. Should only be needed once.


### Stage Project

```javascript
gulp stage-project
```

This task does the following:

#### Git Stage

1. Confirm ready to push to stage branch
2. Move branch to stage
3. Merge built branch to stage
4. Publishes Git
5. Moves current branch to build

#### Git Pull Stage

1. Logs into the staging server
2. Pulls the most recent staging branch

#### WP Migrate WP-CLI

1. Connects to the staging server using WP Migrate through the WP-CLI shell
2. Overwrites the current staging media and database with the local enviroment setup


### Live Project

```javascript
gulp live-project
```

This task does the following:

#### Git Stage

1. Confirm ready to push to live branch
2. Move branch to master
3. Merge staging branch to master
4. Publishes Git
5. Moves current branch to build

#### Git Pull Stage

1. Logs into the live server
2. Pulls the most recent master branch

### Get Live Database and Media to local

```javascript
gulp get-live-database-media
```

Logs into the live site and using WP-CLI alongside wp-migrate pulls the media and database to local
