
.PHONY: build
build:
	go build -o bin/ulid ulid.go

.PHONY: test
test:
	go test ./*.go

.PHONY: install
install: build
install:
	install bin/ulid /usr/local/bin

.PHONY: clean
clean:
	rm bin/ulid
