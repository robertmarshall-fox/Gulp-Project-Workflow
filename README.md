# Gulp Project Workflow
A comprehensive Gulp workflow to allow automated management across all stages


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
