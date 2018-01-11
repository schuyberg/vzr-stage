<template>
  <div id="textcontainer" v-bind:style="container.styleObj">
      <template v-if="show">
          <div class="textbox" :style="textbox.styleObj">
          <!--<span v-for="n in wLength" class="words">-->
            {{ words }}
          <!--</span>-->
        </div>
      </template>
  </div>
</template>

<script>
  import Vue from 'vue'
  import vzr from '../vzr/vzr'
  import utils from '../vzr/vzr-util'
  import _ from 'lodash'

  let vocabulary = [
    'brrat',
    'thump',
    'woooo',
    'barumph',
    "badum tish",
    "blare",
    "blurp",
    "breet",
    "bum brrum brrrumble",
    "bwow-chcka-bwow",
    "cha-cha-cha",
    "chiming",
    "croon",
    "deed-a-reedle",
    "didgeridoo",
    "dirnt",
    "doo-wop",
    "fanfare",
    "fillip",
    "gada, gada, gada",
    "gong",
    "groan",
    "hum",
    "jingle",
    "jug",
    "kra, ka, ka, hi",
    "lilt",
    "neow",
    "oompah",
    "oonse",
    "pah-pa-rah",
    "pickle-pee",
    "plunk",
    "pump-a-rum",
    "rataplan",
    "rinky-dink",
    "rub-a-dub",
    "snap",
    "strum",
    "thrum",
    "tick",
    "tinkling",
    "Tluuck tluck tlawck tlock tlaack tlack tlick!",
    "tom-tom",
    "toot",
    "tootle-too",
    "trill",
    "twang",
    "tweeter",
    "umpa",
    "untz untz untz",
    "wah-wah",
    "whistle",
    "whockah",
    "wlu-wlu-wlu-wlu-wlu-wlu-wlu",
    "woop woop",
    "wub wub",
    "yackety-yak",
    "yodel",
    "zoomba-zoom",
    'Happy Birthday Norah!'
  ]
  let colors = [
    '#1a1334',
    '#26294a',
    '#01545a',
    '#017351',
    '#03c383',
    '#aad962',
    '#fbbf45',
    '#ef6a32',
    '#ed0345',
    '#a12a5e',
    '#710162',
    '#110141'
  ]
  export default {
    name: 'vzrText',
    props: ['show'],
    data () {
      return {
        words: 'test ',
        wLength: 10000,
        textbox: {
          styleObj: {
            width: '100%',
            height: '100%'
          }
        },
        container: {
          styleObj: {}
        }
      }
    },
    created () {
      let self = this;
      const changeWords = _.throttle(function (d) {
        self.words = '';
        let word = vocabulary[Math.floor(Math.random() * vocabulary.length)] + ' '
        for (let i = 0; i < self.wLength; i++) {
          self.words += word
        }
        let rand = _.random(0.6, 1.6)
        let newSize = _.clamp(d.average * rand, 9, 60)
        self.textbox.styleObj["font-size"] = newSize + 'px'

      }, 500)
      const boxSize = _.debounce(function(d) {
        let proportion = 100;
        if (d.average > 15) {
          proportion = 100 - _.clamp(d.pentaBand.high / 2, 0, 15)
        }
        // self.textbox.styleObj.height = proportion + '%'
        self.textbox.styleObj.width = proportion + '%'
      }, 20, true)
      const switchDirections = _.throttle(function(d){
        if (d.average > 25){
          self.textbox.styleObj.transform = "translateX(-50%) translateY(-500%)"
        } else {
          self.textbox.styleObj.transform ="translateX(-50%) translateY(-50%)"
        }
      }, 50)
      let showThreshold = 3;
//      const showText = _.throttle(function(d){
//
//      }, 50)
      let shiftSpeed = 200;
      let currentColor = 0
      let solid = 'black'
      const colorShift = _.throttle(function(d){
        if (solid) {
          self.textbox.styleObj.color = solid
          return;
        }
        shiftSpeed = 200 - d.average * 2;
//        currentColor = (currentColor === colors.length - 1) ? 0 : currentColor + 1;
        currentColor = _.random(0, colors.length -1)
        self.textbox.styleObj.color = colors[currentColor]
      }, shiftSpeed)


      let lastVal = 0;
      const strLength = _.debounce(function (d) {
      })

      vzr.addTrigger('text', [tt1])
      function tt1(data) {
        if (data.average > 20) {
          changeWords(data);
        } else {
        }
//        showText(data)
        if (data.average > showThreshold){
          self.textbox.styleObj.opacity = 1;
        } else {
          self.textbox.styleObj.opacity = 0;
        }
        switchDirections(data)
        boxSize(data)
        colorShift(data)
        if (dToggle && data.pentaBand.high > 30) {
          if (solid === 'white') {
            solid = 'black'
          } else if (solid === 'black') {
            solid = 'white'
          }
        }
      }

      // some things are just way easier with jquery..
      let dToggle = false;
      document.addEventListener('keyup', function (e) {
        if(e.keyCode == 69) { // e
          solid = false
          self.container.styleObj['mix-blend-mode'] = 'normal'
          colorShift()
          dToggle = false
        }
        if(e.keyCode == 68) { // d
          dToggle = !dToggle
          solid = (dToggle) ? 'black' : 'white'
          self.container.styleObj['mix-blend-mode'] = 'normal'
          colorShift()
        }
        if(e.keyCode == 67) { // c
          solid = 'white'
          self.container.styleObj['mix-blend-mode'] = 'overlay'
          colorShift()
          dToggle = false
        }
      })
    },
    calculated: {
    },
    methods: {
    }
  }
</script>

<style scoped>
  #textcontainer {
    position: fixed;
    /*mix-blend-mode: screen;*/
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .textbox {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    display: block;
    color: black;
    border: none;
    transition: width 0.5s, height 0.5s, font-size 0.2s, transform 10s, opacity 1s, color 0.3s;
    word-break: break-all;
      opacity: 0;
  }
  .textbox span {
    display: inline;
  }
</style>
