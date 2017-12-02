package main

import (
	"testing"
	"time"
)

func TestNewULID(t *testing.T) {
	expect := "00000000Z8DA3N3G2B1ZR7YGWW"
	tt := time.Unix(1, 0)
	u := newULID(tt)
	if u.String() != expect {
		t.Fatalf("Expected %s got %s", expect, u.String())
	}
}
