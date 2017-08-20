# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased
- Query middleware throws a 404 when the result is empty
- Change filters and dimensions names! No more `_id`. **Breaks compability**
- Parse Params middleware removed
- `ReqQueryFields` middleware added to substitute parseParams and do SQL building automagically with the URL params
- Upgrade to database v2
- config.json.example now has values for development, test and production environments
- Min Node version is 6.8.1
- Cache is now defined per route
- Errors from MonetDB are now returned by the query_exec and query middlewares
- Added user model
- Passport.js added for user authentication
- Added routes to create and authenticate a user
- Added simulation model
- Added routes to save and retrieve simulations in `/simulation`
- Tests are now in different files

## 0.1.0 - 2016-10-10
### Added
**Database**
- MonetDB connection middleware
- MongoDB connection middleware
- query_exec custom middleware (promise that executes an SQL query with optional parameters)
- This version depends on the version 0.1.0 of [MonetDB schema](https://gitlab.c3sl.ufpr.br/simcaq/monetdb)

**Enrollments**
- Enrollments route with all sub dependencies

**Middlewares**
- parseParams middleware to parse HTTP GET params
- query middleware that serves as an interface between squel generated sql and the query execution
- response middleware that gives a standard response (json, csv or xml)
