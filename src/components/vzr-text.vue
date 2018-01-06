<template>
  <div id="textcontainer">
    <div class="textbox" :style="textbox.styleObj">
      <!--<span v-for="n in wLength" class="words">-->
        {{ words }}
      <!--</span>-->
    </div>
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
    'barumph'
  ]
  export default {
    name: 'vzrText',
    data () {
      return {
        words: 'test ',
        wLength: 10000,
        textbox: {
          styleObj: {
            width: '100%',
            height: '100%'
          }
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

      }, 400)
      const boxSize = _.debounce(function(d) {
        let proportion = 100;
        if (d.average > 15) {
          proportion = 100 - _.clamp(d.pentaBand.high / 2, 0, 15)
        }
        // self.textbox.styleObj.height = proportion + '%'
        self.textbox.styleObj.width = proportion + '%'
      }, 20, true)
      // const fontSize = _.debounce(function(d){
      //   // let rand = _.random(0.1, 1.9)
      //   let newSize = _.clamp(d.average * 1.2, 5, 40)
      //   self.textbox.styleObj["font-size"] = newSize + 'px'
      // }, 30, true)

      let lastVal = 0;
      const strLength = _.debounce(function (d) {
      })

      vzr.addTrigger('text', [tt1])
      function tt1(data) {
        if (data.average > 20) {
          changeWords(data);
          self.textbox.styleObj.transform = "translateX(-50%) translateY(-500%)"
        } else {
          self.textbox.styleObj.transform ="translateX(-50%) translateY(-50%)"
        }
        boxSize(data)
      }

      // some things are just way easier with jquery..
      $('body').on('keyup', function (e) {
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
    transition: width 0.5s, height 0.5s, font-size 0.2s, transform 10s;
    word-break: break-all;
  }
  .textbox span {
    display: inline;
  }
</style>
