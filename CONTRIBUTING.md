# Contributing to SimCAQ API

## Before you get started

### Code of Conduct

By participating of this project you are expected to hold the [Code of Conduct](https://gitlab.c3sl.ufpr.br/simcaq/simcaq-node/blob/development/CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs
Bugs are reported and tracked at [simcaq/SCRUM](https://gitlab.c3sl.ufpr.br/simcaq/SCRUM/board) repository. As you determinate which repository your bug is related to, create an issue and label it with the appropriate tags.

## Branch structure

* **master**: protected branch and contains the stable version
* **development**: default branch
* **issue/??**: issue branch - a branch created to solve a issue
* **feature_????**: feature branch - a branch created to add a feature
* **hotfix_????**: hotfix branch - a branch created to fix a problem or error
* **release_vM.m.f**: release branch - a branch created to merge with master and set a release. The verion follows the [semantic versioning](http://semver.org)

## Styleguide

### Commit messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally
* When only changing documentation, include [ci skip] in the commit description
* Consider starting the commit message with an applicable emoji:
  * :art: `:art:` when improving the format/structure of the code
  * :racehorse: `:racehorse:` when improving performance
  * :memo: `:memo:` when writing docs
  * :bug: `:bug:` when fixing a bug
  * :fire: `:fire:` when removing code or files
  * :green_heart: `:green_heart:` when fixing the CI build
  * :white_check_mark: `:white_check_mark:` when adding tests
  * :lock: `:lock:` when dealing with security
  * :arrow_up: `:arrow_up:` when upgrading dependencies
  * :arrow_down: `:arrow_down:` when downgrading dependencies

### JavaScript Styleguide

All JavaScript follows the [AirBnB styleguide](https://github.com/airbnb/javascript) with the following modifications:
* 4 spaces of identation
* No unused vars
* Allow param reassign
