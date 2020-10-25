## Overview

This express project provides a REST API for a frontend application. The data model represents a note. Notes are persited to a sqlite database, and accessed using the node.js ORM package sequelize. A note has the following properties:

* title (required)
* message (required)
* tags (optional)

## Getting Started

To start the node server:

*  clone this repository
*  `npm install` to install dependencies
*  make sure you have [sqlite](https://www.sqlite.org/index.html) installed
* `npm run dev`

## API Overview

All API endpoints can be accessed at the path `/api/notes`. The following HTTP methods are supported: 

* GET 
    * the desired note id can be provided as a path parameter to display a particular note
    * without path parameters all notes will be returned
* POST
    * the note will be created, invalid JSON will return a 400 Bad Request response
* PUT
    * the note will be updated, invalid JSON will return a 400 Bad Request response
* DELETE
    * one or more notes can be deleted at once by providing note ids as query string parameters. For example `?id=1&id=2` will delete notes with id 1 and 2.

## Tests

This project uses [jest](https://jestjs.io/) and [supertest](https://www.npmjs.com/package/supertest) to test the behavior of api endpoints. Tests are executed with the `npm test` command.