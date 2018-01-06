<template>
  <div id="app">
    <vzr-rainbow :show="rainbow"></vzr-rainbow>
    <vzr-squares :show="squares"></vzr-squares>
    <vzr-debug :show="dbg"></vzr-debug>

    <vzr-text></vzr-text>


    <vzr-debug></vzr-debug>
    <div id="viz">
    </div>
  </div>
</template>

<script>
  import vzr from './vzr/vzr'

  import vzrDebug from './components/vzr-debug.vue'
  import vzrRainbow from './components/vzr-rainbow.vue'
  import vzrSquares from './components/vzr-squares.vue'
  import vzrText from './components/vzr-text.vue'

  export default {
    name: 'app',
  components: {
    vzrDebug,
    vzrSquares,
    vzrRainbow,
    vzrText
  },
  data () {
      return {
        rainbow: true,
        dbg: false,
        squares: true
      }
    },
    created () {
    vzr.init();
    let self = this;
      // some things are just easier this way..
      $('body').on('keyup', function (e) {
        console.log(e.which)
        if(e.which == 66) {
          self.dbg = !self.dbg;
        }
        if(e.which == 49) {
          self.rainbow = !self.rainbow;
        }
        if(e.which == 50) {
          self.squares = !self.squares;
        }
        if (e.which == 61) {
          vzr.globals.sensitivity += 0.05
          console.log(vzr.globals.sensitivity)
        }
        if (e.which == 173) {
          vzr.globals.sensitivity -= 0.05
          console.log(vzr.globals.sensitivity)
        }
      });

      $('body').on('dblclick', function (e) {
          toggleFullScreen();
      });

          function toggleFullScreen() {
          if (
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
          ) {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
              document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
            }
          } else {
            let element = document.getElementById('app');
            if (element.requestFullscreen) {
              element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
              element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
              element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (element.msRequestFullscreen) {
              element.msRequestFullscreen();
            }
          }
        }
    },
    methods: {
    }
  }
</script>==

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #59758e;
  margin-top: 60px;
}
.debugtable {
  font-family: monospace;
}
.debugtable th {
  text-align: right;
  width: 100px;
}
.debugtable td {
  text-align: left;
  color:black;
  width: 170px;
}
body {
  background-color: black;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
