{exec} = require "child_process"

source = "src/config.coffee src/state.coffee src/elements.coffee src/canvas.coffee"

task "build", "Build project from src/*.coffee to lib/*.js", ->
  exec " coffee -j lib/logics.js -c " + source, (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr
