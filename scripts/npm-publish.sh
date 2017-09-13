#!/usr/bin/env bash

(
	cd .. &&
	git checkout master;
	npm publish;
	git checkout develop;
)
