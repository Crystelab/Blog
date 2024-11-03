---
layout: ../layouts/BlogPost.astro
title: My Git Commands Cheat Sheet
slug: gitcheatsheet
description: >-
  Configurations, repository setup, cloning, committing changes, managing
  branches, and handling pushes and pulls
tags:
  - technical
added: 2024-09-07T18:23:53.959Z
---

Welcome to my personal Git cheat sheet. Although we often use shortcuts in tools like Visual Studio or GitHub Desktop, for work I’ve had to learn some of the more fundamental Git commands. Below are the ones I've used or might need in the future, with explanations.
<br /><br />

## Git Configuration

First, make sure Git is installed by checking the version:
```plaintext
git --version 
```

Then, configure your username and email so that other developers know who committed the changes:
```plaintext
git config --global user.name "Your Name"
git config --global user.email "youremail@example.com"
```

To verify the configuration:
```plaintext
git config --global user.name
git config --global user.email
```
Once set, these commands won't be needed often unless you're setting up Git on a new machine.
<br /><br />
## Setting up a Repository 

To create a new Git repository in an existing project, use:
```plaintext
git init
```

<br /><br />
## Cloning a Repository
To clone an existing repository to your local machine:
```plaintext
git clone [url]
```
- `[url]` is the URL of the remote repository (e.g., `https://github.com/username/repository.git`).
This command creates a copy of the repository on your local machine and sets up the default remote to the original repository.

<br /><br />
## .gitignore File
Don't forget to create the `.gitignore` file! Before learning about Git, I didn’t realize how important this file is. It’s crucial for every project, so make sure it’s always up to date.

The `.gitignore` file tells Git which files or directories to ignore. For example, if you use Node.js, it's common to ignore the `/node_modules` folder, as it's large and doesn't need to be pushed with your code. Other developers can run the `npm install` command to install the necessary dependencies.

Also, it helps prevent sensitive files, like those containing local variables (e.g., `.env`), from being exposed. Accidentally committing API keys or tokens can lead to security risks, such as unexpected charges if an API's usage limit is exceeded.

Here's an example
```plaintext
node_modules/
.env
```

<br /><br />
## Committing Changes

To commit all your changes at once, use:
```plaintext
git commit -a -m "commit message"
```

- `-a` stages all modified tracked files, so they are ready for the commit.
- `-m "commit message"` allows you to add a commit message directly, bypassing the editor.

Alternatively, you can manually stage changes with:
```plaintext
git add .
```

This stages all changes, or you can stage individual files by specifying their paths:
```plaintext
git add [file-path]
```
It's important to note that only staged files will be committed.

<br /><br />
## Pushing and Pulling Changes
To push your commits to a remote repository (such as GitHub or GitLab):
```plaintext
git push origin [branch]
```
- `origin` refers to the default name of your remote repository.
- `[branch]` is the name of the branch you want to push to (e.g., main or master).

To pull changes from a remote repository into your local branch:
```plaintext
git pull origin [branch]
```
- This fetches changes from the remote repository and merges them into your local branch.


<br /><br />
## Restoring Changes

To discard changes and restore files to their previous state:

- For modified but unstaged files:
```plaintext
git restore .
```

- For staged files:
```plaintext
git restore --staged .
```

- For both:
```plaintext
git reset --hard
```

<br /><br />
## Viewing Commit History

To see the full commit history, use:
```plaintext
git log
```

This shows detailed information like the author’s name, email, date, and commit message. If this is too verbose, you can use a more concise view:
```plaintext
git log --oneline
```
This provides a simplified commit history, displaying only the commit hash and message.


<br /><br />
## Working with Branches

Branching is essential for managing features and versions. Here are the most common branch-related commands:

- See all branches:
```plaintext
git branch --list
```

- Check which branch you're currently on:
```plaintext
git branch --show-current
```

- Create a new branch:
```plaintext
git branch [newBranch]
```

- Switch to another branch:
```plaintext
git checkout [otherBranch]
```

- Merge another branch into the current branch:
```plaintext
git merge [otherBranch]
```