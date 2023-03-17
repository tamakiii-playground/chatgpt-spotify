.PHONY: help build clean

help:
	@cat $(firstword $(MAKEFILE_LIST))

build: ../docker-compose.yaml
	docker compose build

bash:
	docker compose run --rm -it $(notdir $(CURDIR)) $@

clean:
	docker compose down --volumes --rmi all
