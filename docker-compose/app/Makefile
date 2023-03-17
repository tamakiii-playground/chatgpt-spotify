include ../../docker-compose.mk

.PHONY: run

run:
	docker compose run --rm -it --service-ports $(notdir $(CURDIR)) node main.js '$(NAME)' '$(TITLE)'
