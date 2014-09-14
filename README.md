# Thredd

## About

Thredd is a minimalistic web app that stores and displays articles and their comment sections. Articles consist of a title and body. Comment sections consist of comments and their nested replies. Replies can be nested *ad infinitum*! Check it out on heroku [here](http://thredd.herokuapp.com/).

For the good times, press cmd + enter when entering a comment to post it quickly!

## Running Locally

- Thredd uses MongoDB as a datastore, so you will need to run a [mongod](http://docs.mongodb.org/manual/reference/program/mongod/).
- Thredd makes use of some environment variables as configuration. Run `source config.sh` to load the necessary variables into your shell.
- `make tests` run the tests.
- `make astroturf` seed the database with a randomly generated article and its randomly generated comment section. (repeat as necessary for more articles).
- `make server` start the server and navigate to the index page.

## Code overview

Thredd is implemented with some fun tech. The server is built with [Koa](http://koajs.com/) and the UI is built with [React](http://facebook.github.io/react/). Articles and comment sections are rendered server-side for speed.

The entrypoint for the server is `node_modules/server/index`. Data modeling and persistence is handled by the services found in `node_modules/services`. There are indexes set on the `user` and `article` properties of comments for faster querying. Indexes are declared when the Mongo collections are loaded into the app, i.e., `node_modules/services/collections/index`. The web views are found in `node_modules/views`.

The entrypoint for the client is `node_modules/article-comments/main`. The front-end app favors a functional reactive style. Code is organized into a `store` for data management and a `view` that rerenders when the store signals an update.

[less](http://lesscss.org/) is used as the CSS compiler. The JavaScript and CSS are built for distribution by running `make dist`.

Most key business logic is implemented by functions. For example, the code that computes the thread structure of comment sections operates on an array of comments and returns an array of the top level comments (see `node_modules/transforms/index`).

## TODOS

- [x] Astroturf
- [x] Store/View
- [x] Post
- [x] Reply
- [x] View user comments
- [x] View articles
- [x] Comment timestamps/hash fragments
- [x] moar tests
- [x] Add License
- [x] Production Build
- [ ] Thread naming
- [x] no awkward koa views
- [ ] error handling
- [ ] logging
- [ ] Optimistic post
- [ ] Animations
- [ ] User login/logout
- [ ] pretty URLs
- [ ] Stream
- [ ] Markdown support
- [x] Commit Monk changes
- [ ] Debug tap & monk db.close()
- [ ] Debug tap & node --harmony
