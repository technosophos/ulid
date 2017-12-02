const { events, Job , Group} = require("brigadier");
const dest = "$GOPATH/src/github.com/technosophos/ulid";

events.on("push", (e, p) => {
  console.log(e.payload)
  var gh = JSON.parse(e.payload)
  var test = new Job("test", "golang:1.9")
  test.tasks = [
    "mkdir -p " + dest,
    "cp -a /src/* " + dest,
    "cd " + dest,
    "go get -u github.com/golang/dep/cmd/dep",
    "dep ensure",
    "make test"
  ];

  // Run tests. Then, if this was a tagged release, run the release.
  test.run().then( () => {
    if (gh.ref.startsWith("refs/tags/")) {
      runRelease(e, p, gh)
    }
  })
});

events.on("error", (e, p) =>{
  console.log(e)
})

function runRelease(e, p, gh) {
  var parts = gh.ref.split("/", 3)
  if (parts.length != 3) {
    throw "this is not a release"
  }
  const tag = parts[2]
  var env = {
    GITHUB_REPO: "ulid",
    GITHUB_USER: "technosophos",
    GITHUB_TOKEN: p.secrets.ghToken
  }

  var release = new Job("release", "golang:1.9")
  release.env = env
  release.tasks = [
    "go get -u github.com/aktau/github-release",
    `github-release release -t ${ tag } -n "ulid ${ tag }"`
  ]

  var build = new Job("build", "golang:1.9")
  build.env = env
  build.tasks = [
    "mkdir -p " + dest,
    "cp -a /src/* " + dest,
    "cd " + dest,
    "go get -u github.com/aktau/github-release",
    "go get -u github.com/golang/dep/cmd/dep",
    "dep ensure",
    "make build",
    "github-release upload -R -f bin/ulid -n ulid-linux -t " + tag,
    "echo release " + tag
  ]

  var g = new Group()
  g.add(release)
  g.add(build)
  return g.runEach()
}

