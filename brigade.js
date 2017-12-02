const { events, Job } = require("brigadier");

events.on("push", (e, p) => {
  console.log(e.payload)
  runTests(e, p)
});

events.on("exec", (e, p) => {
  runTests(e, p)
});

events.on("error", (e, p) =>{
  console.log(e)
})

function runTests(e, p) {
  var test = new Job("test", "golang:1.9")
  var dest = "$GOPATH/src/github.com/technosophos/ulid";
  test.tasks = [
    "mkdir -p " + dest,
    "cp -a /src/* " + dest,
    "cd " + dest,
    "go get -u github.com/golang/dep/cmd/dep",
    "dep ensure",
    "make test"
  ];

  test.run().then( (r) => console.log(r.toString()));
}
