<template>
    <div v-if="show" id="rainbow" v-bind:style="bgGradient"></div>
</template>

<script>
  import Vue from 'vue'
  import vzr from '../vzr/vzr'
  import util from '../vzr/vzr-util'

  export default {
    name: 'vzrRainbow',
    props: ['show'],
    data() {
      return {
        title : 'rainbow',
        bgGradient: ''
      }
    },
    created() {
        vzr.init();
    },
    mounted() {
        let self = this;
        // hipster muted rainbow
        const rgbVals = [
            [248, 12, 18], // red
            [254, 174, 45], // orange
            [105, 208, 37], // green
            [18, 189, 185], // blue
            [68, 34, 153] // violet
        ]
        function rainbowBGhsl(data) {
            if(!data) { return }
            let frameGradient = []
            // modulate saturation
            data.pentaBand.high = util.weightVal(data.pentaBand.high, 2, 255)
            data.pentaBand.highMid = util.weightVal(data.pentaBand.highMid, 1.5, 255)
            data.pentaBand.mid = util.weightVal(data.pentaBand.mid, 1.2, 255)
            let pbArr = Object.values(data.pentaBand)
            rgbVals.forEach((v, i) => {  // TODO: messing up the color order? looks fine anyway..
                let hsl = util.colorConverter.rgbToHsl(v);
                hsl[1] = pbArr[i] / 255
                hsl[2] = util.limiter(hsl[2] * pbArr[i] / 255, 0, 230)

                if (data.average > 15) {
                    hsl[1] = hsl[1] + 0.2
                    util.limiter(hsl[2] = hsl[2] * data.average / 22, 0, 250)
                } else if (data.average > 18) {
                    hsl[1] = hsl[1] + 0.2
                    hsl[2] = hsl[2] * data.average / 10
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
        vzr.addTrigger('rainbow', [rainbowBGhsl])
    },
    destroyed() {
        // this doesn't work..
        console.log('no rainbows')
        vzr.removeTrigger('rainbow')
    },
    calculated: {},
    methods: {
      setGradient : function(gradient) {
        let styleObj = {
          'background' : gradient
        }
        // console.log(styleObj)
        this.bgGradient = styleObj
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