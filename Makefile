.PHONY: cleardb dist install mocks/article server tests tests/server

NPM_BIN=$(shell npm bin)

astroturf:
	node --harmony ./bin/astroturf

cleardb:
	node --harmony ./bin/clear-db

dist:
	node $(NPM_BIN)/browserify ./node_modules/article-comments/javascripts/main.js > ./public/dist/app.js
	node $(NPM_BIN)/lessc ./node_modules/article-comments/styles/style.less > ./public/dist/style.css
	node $(NPM_BIN)/lessc ./node_modules/article-comments/styles/user-comments.less > ./public/dist/user-comments.css

install:
	npm install

server: dist
	node --harmony ./node_modules/server

# TODO: the tap test runner doesn't spawn child processes with node flags(?)
tests:
	node --harmony $(NPM_BIN)/tap tests/services/*.js tests/ui/*.js tests/transforms/*.js tests/schemas/*.js tests/server/helpers.js

tests/server:
	node --harmony tests/server/index.js

# TODO: clean
# for package in `npm ls`; do npm uninstall $package; done;
