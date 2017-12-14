<template>
    
</template>

<script>
  import Vue from 'vue'
  import vzr from '../vzr/vzr'
  export default {
    name: 'vzrRainbow',
    data() {
      return {
        title : 'rainbow'
      }
    },
    created() {
      let self = this;
      vzr.addTrigger('rainbow', triggers)
      const triggers = [
        function(data){

        }
      ]
      self.draw()
    },
    calculated: {},
    methods: {
      freqColor: function (data) {
        let i = (Math.round(data) / 2) + 10;
        let styleObj = {"background-color": "hsla(124," + i + "%, 45%, 1)"}
        return styleObj;
      },
      draw: function () {
        vzr.step();
        window.requestAnimationFrame(this.draw);
      }
    }
  }
</script>

<style scoped>

</style>