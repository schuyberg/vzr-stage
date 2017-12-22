<template>
  <div id="squares">
    <div v-for="s in squares" v-bind:style="s.styleObj">{{ s.text }}
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import vzr from '../vzr/vzr'
  export default {
    name: 'vzrSquares',
    data () {
      return {
        hidden : false,
        squares: []
      }
    },
    created () {
      let self = this;
      vzr.init();
      let square1 = {
        styleObj: {
          height: '50px',
          width: '50px'
        }
      }
      let square2 = {
        styleObj: {
          height: '50px',
          width: '50px'
        }
      }
      let square3 = {
        styleObj: {
          height: '50px',
          width: '50px',
        }
      }
      let square4 = {
        styleObj: {
          height: '50px',
          width: '50px',
        }
      }
      let square5 = {
        styleObj: {
          height: '50px',
          width: '50px',
        }
      }
      self.squares = [square1, square2, square3, square4, square5]

      vzr.addTrigger('squares', [sTrigger1])
      function sTrigger1(data) {

        square1.styleObj.height = data.pentaBand.bass * 1 + 'px'
        square1.styleObj.width = data.pentaBand.bass * 10 + 'px'

        square2.styleObj.height = data.pentaBand.lowMid * 1.5 + 'px'
        square2.styleObj.width = data.pentaBand.lowMid * 1 + 'px'

        square3.styleObj.height = data.pentaBand.mid * 2 + 'px'
        square3.styleObj.width = data.pentaBand.mid * 8 + 'px'

        square4.styleObj.height = data.pentaBand.highMid * 2.5 + 'px'
        square4.styleObj.width = data.pentaBand.highMid * 5 + 'px'

        square5.styleObj.height = data.pentaBand.high * 6 + 'px'
        square5.styleObj.width = data.pentaBand.high * 2 + 'px'

      }
      // some things are just way easier with jquery..
      $('body').on('keyup', function (e) {
//        if(e.which == 68) {
//          self.hidden = !self.hidden;
//        }
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
    mix-blend-mode: exclusion;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
 #squares div {
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translateX(-50%) translateY(-50%);
   display: block;
   color: black;
   background-color: white;
   border: 1px solid white;
   transition: width 0.2s, height 2ms;
 }
</style>
