SHELL := /bin/bash
SCRIPT_DIR := $(shell cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
TIMESTAMP = `date +'%H:%M:%S'`
ECHO_PREFIX = "[$(TIMESTAMP)]:"

NODE_BIN_PATH := $(realpath ./node_modules/.bin)
# If this is being run in a npm install, the bin path will be above us
ifeq ("$(wildcard $(NODE_BIN_PATH))","")
NODE_BIN_PATH := $(realpath ../.bin)
endif

.PHONY: clean all

all: out/main.js out/main.d.ts

clean:
	@echo $(ECHO_PREFIX) "Cleaning..."
	@rm -rf out

out/main%js out/main%d.ts: main.ts tsconfig.json
	@echo $(ECHO_PREFIX) "Building..."
	@${NODE_BIN_PATH}/tsc
