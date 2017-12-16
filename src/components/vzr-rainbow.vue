<template>
    <div id="rainbow" v-bind:style="bgGradient"></div>
</template>

<script>
  import Vue from 'vue'
  import vzr from '../vzr/vzr'
  import util from '../vzr/vzr-util'
  export default {
    name: 'vzrRainbow',
    data() {
      return {
        title : 'rainbow',
        bgGradient: ''
      }
    },
    created() {
      let self = this;
      // hipster muted rainbow
      const rgbVals = [
        [248, 12, 18],
        [254, 174, 45],
        [105, 208, 37],
        [18, 189, 185],
        [68, 34, 153]
      ]

      vzr.init();
      vzr.addTrigger('rainbow', [rainbowBGhsl])
      // triggers
      function rainbowBGhsl(data) {
        if(!data) { return }
        let frameGradient = []
        // modulate saturation
        data.pentaBand.high = util.weightVal(data.pentaBand.high, 3, 255)
        data.pentaBand.highMid = util.weightVal(data.pentaBand.highMid, 2, 255)
        data.pentaBand.mid = util.weightVal(data.pentaBand.mid, 1.5, 255)
        let pbArr = Object.values(data.pentaBand)
        rgbVals.forEach((v, i) => {
          let hsl = util.colorConverter.rgbToHsl(v);
          hsl[1] = pbArr[i] / 255
          hsl[2] = hsl[2] * pbArr[i] / 255
          if (data.average > 15) {
            hsl[1] = hsl[1] + 0.2
            hsl[2] = hsl[2] * data.average / 15
          }
          frameGradient.push(util.colorConverter.hslToRgb(hsl))
        });
        self.setGradient(makeGradient(frameGradient));
      }

      rgbVals.forEach((v, i) => { console.log( v) })

      function makeGradient(vals){
        let g = 'linear-gradient(to top,';
        let rgb = vals.map(c=>
          'rgb(' + c.toString() + ')'
        )
        g += rgb.toString()
        g += ')'
        return g;
      }
      // self.setGradient(makeGradient(rgbVals));
      self.draw()
    },
    calculated: {},
    methods: {
      // freqColor: function (data) {
      //   let i = (Math.round(data) / 2) + 10;
      //   let styleObj = {"background-color": "hsla(124," + i + "%, 45%, 1)"}
      //   return styleObj;
      // },
      setGradient : function(gradient) {
        let styleObj = {
          'background' : gradient
        }
        // console.log(styleObj)
        this.bgGradient = styleObj
      },
      draw: function () {
        vzr.step();
        window.requestAnimationFrame(this.draw);
      }
    }
  }
</script>

<style scoped>
    #rainbow {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        /*transition: background-color 0.2s;*/
    }
</style>