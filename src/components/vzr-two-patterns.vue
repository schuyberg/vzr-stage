<template>
  <div id="patterns">
    <template :v-if="show">
      <div id="twojs"></div>
    </template>
  </div>
</template>

<script>
  import Vue from 'vue'
  import vzr from '../vzr/vzr'
  import util from '../vzr/vzr-util'
  import Two from 'two.js'
  export default {
    name: 'vzr-patterns',
    props: ['show'],
    data() {
      return {
        title : 'patterns'
      }
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
      // setup
      let elem = document.getElementById('twojs');
      var two = new Two({
        fullscreen: true
      }).appendTo(elem);
      let w = window.innerWidth
      let h = window.innerHeight

      let center = new Two.Vector(w/2, h/2)

      // two shapes
      let ctrC = two.makeCircle(w/2, h/2, w/8);
      ctrC.stroke = '#FF8000';
      ctrC.fill = 'none'
      ctrC.targetRadius = 0
      ctrC.incrementAmt = 1

      let ctrPgon = two.makePolygon(0, 0, w/8, 5);
      ctrPgon.stroke = 'none';
      ctrPgon.fill = 'none'
      ctrPgon.targetRadius = 0
      ctrPgon.incrementAmt = 1

      let pgons = two.makeGroup()
      pgons.add(ctrPgon)
      ctrPgon.vertices.forEach(function(v){
        let pgon = two.makePolygon(v._x, v._y, w/20, 5)
        pgon.stroke = '#FF5000';
        pgon.fill = 'none'
        pgon.targetScale = 0
        pgon.incrementAmt = 1
        pgons.add(pgon)
      })
      pgons.translation = center
      console.log(pgons.children)

      let pgon1 = two.makePolygon(w/2, h/2, w/6, 5)
      pgon1.stroke = '#FF5000';
      pgon1.fill = 'none'
      pgon1.targetScale = 0
      pgon1.incrementAmt = 1

      // two render
      two.render()
      two.bind('update', function(frameCount) {

      }).play();

      function increment(val, targetVal, amount=1) {
        if (val < targetVal) {
          val += amount
        } else if (val > targetVal)  {
          val -= amount
        }
        return val;
      }
      function spin(val, amount=1){
        val = (val > 2 || val < 0) ? 0 : val;
        val += amount
        val = val
        return val
      }
      function degToRad(deg) {
        return deg / 57.2958
      }

      // triggers
      const layer1triggers = function(data) {
        ctrC.radius = increment(ctrC.radius, data.average * 2, data.average / 10)

        pgon1.scale = increment(pgon1.scale, data.pentaBand.mid / 150, data.pentaBand.mid * 0.0001)
        pgon1.rotation = increment(pgon1.rotation, degToRad(255 - data.pentaBand.highMid), data.pentaBand.highMid / 700)

        pgons.children[1].scale = increment(pgon1.scale, data.pentaBand.bass / 50, data.pentaBand.bass * 0.03)
        pgons.children[1].rotation = increment(pgons.children[1].rotation, degToRad(255 - data.pentaBand.bass), data.pentaBand.bass / 700)

        pgons.children[2].scale = increment(pgon1.scale, data.pentaBand.lowMid / 50, data.pentaBand.lowMid * 0.03)
        pgons.children[2].rotation = increment(pgons.children[2].rotation, degToRad(255 - data.pentaBand.lowMid), data.pentaBand.lowMid / 700)

        pgons.children[3].scale = increment(pgon1.scale, data.pentaBand.mid / 50, data.pentaBand.mid * 0.03)
        pgons.children[3].rotation = increment(pgons.children[3].rotation, degToRad(255 - data.pentaBand.mid), data.pentaBand.mid / 700)

        pgons.children[4].scale = increment(pgon1.scale, data.pentaBand.highMid / 50, data.pentaBand.highMid * 0.03)
        pgons.children[4].rotation = increment(pgons.children[4].rotation, degToRad(255 - data.pentaBand.highMid), data.pentaBand.highMid / 700)

        pgons.children[5].scale = increment(pgon1.scale, data.pentaBand.high / 50, data.pentaBand.high * 0.03)
        pgons.children[5].rotation = increment(pgons.children[5].rotation, degToRad(255 - data.pentaBand.high), data.pentaBand.high / 700)

        pgons.rotation = increment(pgons.rotation, degToRad(255 - data.average),  (0 - Math.cos(data.average)) / 10)
      }

      vzr.addTrigger('patterns', [layer1triggers])
//      function patterns1(data) {
//        pgon1.scale += data.pentaBand.lowMid / 130 - pgon1.scale
//        rot = (rot > 360) ? 0 : rot + data.average / 100
//        if (data.pentaBand.bass > 200) {
//          pgon1.fill = 'rgba(68, 34, 153, 0.6)'
//        } else {
//          pgon1.fill = 'none'
//        }
//        pgon1.rotation = rot
//      }
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
  #patterns {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    /*transition: background-color 0.2s;*/
  }
</style>