.PHONY: cleardb install mocks/article test server

NPM_BIN=$(shell npm bin)

cleardb:
	node --harmony ./bin/clear-articles

install:
	npm install

mocks/article:
	node --harmony ./bin/bacon-article

server:
	node --harmony node_modules/server

# TODO(jj): the tap runner doesn't work with node's harmony flag
# node --harmony tests/server/*.js
test:
	node --harmony $(NPM_BIN)/tap tests/services/*.js tests/ui/*.js
