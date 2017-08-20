# SIMCAQ
[![build status](https://gitlab.c3sl.ufpr.br/simcaq/simcaq-node/badges/development/build.svg)](https://gitlab.c3sl.ufpr.br/simcaq/simcaq-node/commits/development)
[![coverage report](https://gitlab.c3sl.ufpr.br/simcaq/simcaq-node/badges/development/coverage.svg)](https://gitlab.c3sl.ufpr.br/simcaq/simcaq-node/commits/development)

# Dependencies

Previous versions of Node.js do not support ECMAScript6, it is recommended to use **at least** version 4.5.0LTS.

1) Install [NVM (Node Version Manager)](https://github.com/creationix/nvm)

2) Install Node.js via NVM

> source ~/.bashrc

> nvm install v4.5.0

3) Enable Node.js

> nvm use v4.5.0

4) Install the global dependencies

> npm install --global gulp gulp-cli babel babel-cli babel-core babel-register mocha gulp-mocha gulp-eslint istanbul

5) Install project dependencies

> npm install

6) Copy `config.json.example` to `config.json`

> cp config.json.example config.json
