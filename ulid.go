package main

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/oklog/ulid"
)

func main() {
	t := time.Now()
	u := newULID(t)
	fmt.Println(u.String())
}

func newULID(t time.Time) ulid.ULID {
	r := rand.New(rand.NewSource(t.UnixNano()))
	return ulid.MustNew(ulid.Timestamp(t), r)
}
