.PHONY: test server

NPM_BIN=$(shell npm bin)

server:
	node --harmony server.js

test:
	node --harmony $(NPM_BIN)/tap tests/**/*.js
