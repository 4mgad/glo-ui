#!/usr/bin/env bash

(
	cd .. &&
	npm version major -m "release v%s";
	git add -A && git commit -m "release files";
	git push origin develop;
	git push --tags;
	git checkout master;
	git merge develop;
	git push origin master;
	git checkout develop;
)
