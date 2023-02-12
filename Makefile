IMAGE_NAME ?= react-chess

all: build-docker

build-docker:
	docker build . -t ${IMAGE_NAME}

run-docker:
	docker run -p 3000:80 -d ${IMAGE_NAME}

.PHONY: build-docker run-docker
