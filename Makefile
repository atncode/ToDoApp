install:
	npm ci

develop:
	npm run dev

build:
	rm -rf dist
	npm run build

start:
	npm run preview

lint:
	npx eslint .
