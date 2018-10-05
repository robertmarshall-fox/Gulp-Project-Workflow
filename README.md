# Gulp WordPress Project Workflow
A comprehensive Gulp workflow to allow automated management across all stages for WordPress development.

## Setup

### Config
Make sure ssh details, ect, are stored in the workflow-config.js file. This is ignored by default so will not be pushed to any repository.

## Commands

### Initiate Git

```javascript
gulp git-init
```

This task sets up the essential git bits and pieces

1. Set up git in project root folder
2. Add all current files
3. Commits "Initial Commit" message
4. Sets up 2 branches - "build" & "stage"
5. Add the git origin location from package.json
6. Pushes files to cloud
7. Moves current branch to "build"

## Staging Server Git

```javascript
gulp git-stage
```

This task pulls all the project files from the "prod" git branch to the staging server.
It uses the Gulp git-ssh package to hook into the staging server to run the git command.

## Staging Database & Uploads

```javascript
gulp stage-database-uploads
```

This task uses WP-CLI to fire a push command from the local install to pass data to the staging server.
