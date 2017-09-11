#!/usr/bin/env bash

set -e

(
	cd .. &&
	git checkout develop;
	npm version major -m "release v%s";
	git add -A && git commit -m "lock files";
	git push;
	git push --tags;
	git checkout master;
	git merge develop;
	git push;
	git checkout develop;
)
