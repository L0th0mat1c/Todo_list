# Todo list

A fantastic product owner has a wonderful, amazing and revolutionary idea... he wants to build a new Todo application.
He has a good idea of the application behavior and comes with a backlog containing the following user stories :

## 📌 Table of Contents

- [Instructions](#instructions)
- [Members](#members)
- [Project Organisation](#project_organisation)
- [How to develop](#how_to_develop)

## 📄 Instructions <a id="instructions"></a>

Delivery method: Github

Language:

- Typescript (ALL)
- ReactJS (Front)
- NodeJS (API)

## 👥 Members <a id="members"></a>

- _THOMAS Loic_

## 🧱 Project Organisation <a id="project_organisation"></a>

### Github Project

- https://github.com/users/Thomas-L-Dev/projects/1/views/1

### Commits

We are following the [gitmoji convention](https://gitmoji.dev/).

Convention: ${Gitmoji} ${Verb or actions}/${More informations}

Exemple:

- ✨ FEAT(API): ${More Informations}
- 🔥 FIX(UI): ${More Informations}

### Branches

- master: Protected branch, not allowed to push, merge, deploys to production
- development: Protected branch, staging branch to link between other branch and main
- new branches: ${Type of task}-${More Informations}
  Exemple: FEAT-route-for-users, FIX-error-on-route-get-todo, ENV-add-production-environment

### Merge request and review

If you followed all the requirements above, the easier to read and review your merge requests (MR) will be therefore the faster they will be werged.

Once you consider your branch ready to be merged, create a new MR and assign your lead for a review.

If your MR does not meet the requirements above, they will not be merged and comments will be added for you to fix the line/file concerned. The easiest way to fix the issue is to checkout the concerned branch, commit your fix and push.

### Coding style

- 2 spaces for indentation
- LF end of line
- Prettier formatter
- Run `npm run tscheck` to conform to our typescript rules

## How to develop <a id="how_to_develop"></a>

**Before run commands, please install docker and docker compose environment and disable "buildkit" on Docker.json config.**

Following this instructions for setup the development environement:

Go to the directory:

        cd Todo_list

To run environment "development":

        docker-compose up --build

To run environment "production":

        docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

To close environments:

        docker-compose down
