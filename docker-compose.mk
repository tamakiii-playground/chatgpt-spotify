.PHONY: help setup build teardown clean

help:
	@cat $(firstword $(MAKEFILE_LIST))

setup: \
	.env

build: ../docker-compose.yaml
	docker compose build

bash:
	docker compose run --rm -it $(notdir $(CURDIR)) $@

teardown:
	rm -rf .env

clean:
	docker compose down --volumes --rmi all

.env:
	echo 'SPOTIFY_CLIENT_ID=$(SPOTIFY_CLIENT_ID)' > $@
	@echo 'SPOTIFY_CLIENT_SECRET=$(SPOTIFY_CLIENT_SECRET)' >> $@
	@echo "echo 'SPOTIFY_CLIENT_SECRET=*******' >> $@"
