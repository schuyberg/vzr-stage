<template>
  <div class="#squares">
    <div v-for="s in squares" v-bind:style="s.styleObj"></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import vzr from '../vzr/vzr'
  export default {
    name: 'vzrDebug',
    data () {
      return {
        hidden : false,
        squares: [{
          styleObj: {
            height: '50px',
            width: '50px',

          }
        }]
      }
    },
    created () {
      let self = this;
      vzr.init();
//      vzr.addTrigger('dbg', [testTrigger, testTrigger2])
      // test trigger
      function testTrigger(data) {
        if(data){
          self.freqData = data.pentaBand;
          self.avg = data.avg;
        } else {
          console.log('no data!')
        }
      }
      function testTrigger2(data){
        if (data.average > 20) {
          self.avg = data.average + 100
        } else {
          self.avg = data.average;
        }
      }
//      self.draw()
      // some things are just way easier with jquery..
      $('body').on('keyup', function (e) {
//        if(e.which == 68) {
//          self.hidden = !self.hidden;
//        }
      })
    },
    calculated: {
    },
    methods: {
//      draw : function () {
//        vzr.step();
//        window.requestAnimationFrame(this.draw);
//      }
    }
  }
</script>

<style scoped>

</style>
