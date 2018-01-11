<template v-if="showSquares">
  <div id="squares" v-bind:style="sp.styleObj">
    <div v-if="show" v-for="s in squares" v-bind:style="s.styleObj">{{ s.text }}</div>
  </div>
</template>

<script>
  // yeah, so the squares are usually actually rectangles. i know, i know..

  import Vue from 'vue'
  import vzr from '../vzr/vzr'
  class Square {
    constructor(styleObj) {
      if(styleObj) {
        this.styleObj = styleObj
      } else {
        this.styleObj = {
          height: '50px',
          width: '50px',
          color: 'black',
//          'background-color': 'white',
          background: 'none',
          border: '1px solid white',
        }
      }
    }
  }
  export default {
    name: 'vzrSquares',
    props: ['show'],
    data () {
      return {
        squares: [],
        sp: {}
      }
    },
    created () {
      let self = this;
      vzr.init();
      self.squares = []
      let i = 5
      while (i > 0) {
        self.squares.push(new Square())
        i--
      }

      self.sp.styleObj = {
        'mix-blend-mode': 'overlay'
      }

      vzr.addTrigger('squares', [sTrigger1])
      function sTrigger1(data) {

        self.squares[1].styleObj.height = data.pentaBand.bass * 1 + 'px'
        self.squares[1].styleObj.width = data.pentaBand.bass * 10 + 'px'

        self.squares[2].styleObj.height = data.pentaBand.lowMid * 1.5 + 'px'
        self.squares[2].styleObj.width = data.pentaBand.lowMid * 1 + 'px'

        self.squares[3].styleObj.height = data.pentaBand.mid * 2 + 'px'
        self.squares[3].styleObj.width = data.pentaBand.mid * 8 + 'px'

        self.squares[4].styleObj.height = data.pentaBand.highMid * 2.5 + 'px'
        self.squares[4].styleObj.width = data.pentaBand.highMid * 5 + 'px'

        self.squares[0].styleObj.height = data.pentaBand.high * 6 + 'px'
        self.squares[0].styleObj.width = data.pentaBand.high * 2 + 'px'

      }
      // some things are just way easier with jquery..
      $('body').on('keyup', function (e) {
        if(e.which == 87) { // w
          self.sp.styleObj = {
            'mix-blend-mode': 'overlay'
          }
          for (let s of self.squares) {
            s.styleObj['background'] = 'none'
          }
        }
        if (e.which == 83) { // s
          self.sp.styleObj = {
            'mix-blend-mode': 'exclusion'
          }
          for (let s of self.squares) {
            s.styleObj['background'] = 'white'
          }
        }
        if (e.which == 88) { // x
          self.sp.styleObj = {
            'mix-blend-mode': 'normal'
          }
        }
        // TODO: add style switcher
        // 'blocks mode':
        // #squares: mix-blend-mode: exclusion / soft-light / difference
        // #squares div: background-color: white;
        // 'lines mode'
        // #squares: mix-blend-mode: overlay;
        //
      })
    },
    calculated: {
    },
    methods: {
    }
  }
</script>

<style scoped>
  #squares {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
 #squares div {
   transition: width 0.2s, height 2ms;
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translateX(-50%) translateY(-50%);
   display: block;

 }
</style>
