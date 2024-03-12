.PHONY: *

all:
	npm run start

pretty:
	npx prettier --write .

css:
	npx tailwindcss -i src/input.css -o src/output.css --watch
