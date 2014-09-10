.PHONY: cleardb dist install mocks/article server tests tests/server

NPM_BIN=$(shell npm bin)

cleardb:
	node --harmony ./bin/clear-articles

dist:
	node $(NPM_BIN)/browserify ./node_modules/app/javascripts/main.js > ./public/dist/app.js
	node $(NPM_BIN)/lessc ./node_modules/app/styles/style.less > ./public/dist/style.css

install:
	npm install

mocks/article:
	node --harmony ./bin/bacon-article

server: dist
	node --harmony node_modules/server

# TODO: the tap test runner doesn't spawn child processes with node flags(?)
tests:
	node --harmony $(NPM_BIN)/tap tests/services/*.js tests/ui/*.js

tests/server:
	node --harmony tests/server/*.js

# TODO: clean
# for package in `npm ls`; do npm uninstall $package; done;
