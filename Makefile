.PHONY: cleardb dist install mocks/article server tests tests/server

NPM_BIN=$(shell npm bin)

astroturf:
	node --harmony ./bin/astroturf

cleardb:
	node --harmony ./bin/clear-db

dist:
	mkdir -p public/dist
ifeq ($(NODE_ENV), production)
	$(MAKE) dist/production
else
	$(MAKE) dist/development
endif

dist/development:
	node $(NPM_BIN)/browserify -t envify ./node_modules/article-comments/javascripts/main.js > ./public/dist/app.js
	du -h ./public/dist/app.js
	node $(NPM_BIN)/lessc ./node_modules/article-comments/styles/style.less > ./public/dist/style.css
	du -h ./public/dist/style.css
	node $(NPM_BIN)/lessc ./node_modules/article-comments/styles/user-comments.less > ./public/dist/user-comments.css
	du -h ./public/dist/user-comments.css

dist/production: dist/development
	$(NPM_BIN)/uglifyjs ./public/dist/app.js -o ./public/dist/app.js -m toplevel -c
	du -h ./public/dist/app.js


install:
	npm install

server: dist
	node --harmony ./node_modules/server

# TODO: the tap test runner doesn't spawn child processes with node flags(?)
tests:
	node --harmony $(NPM_BIN)/tap tests/services/*.js tests/ui/*.js tests/transforms/*.js tests/schemas/*.js tests/views/*.js

tests/server:
	node --harmony tests/server/index.js

# TODO: clean
# for package in `npm ls`; do npm uninstall $package; done;
