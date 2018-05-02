<template>
  <div class="full-page">
    <template :v-if="show">
      <div id="tjs2" class="draw-into"></div>
    </template>
  </div>
</template>

<script>
  import Vue from 'vue'
  import vzr from '../vzr/vzr'
  import util from '../vzr/vzr-util'
  import Two from 'two.js'
  import Tween from '@tweenjs/tween.js'

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
      let elem = document.getElementById('tjs2');
      var two = new Two({
        fullscreen: true
      }).appendTo(elem);

      let gridPoints = [], center
      setPoints()
      window.addEventListener('resize', function(){
        setPoints()
      })
      function setPoints(){
        let w = window.innerWidth
        let h = window.innerHeight
        // centerpoint
        center = new Two.Vector(w/2, h/2)
        // grid
        let resolution = 30
        for (let i = 0; i < resolution; i++) {
          let x = i * w / resolution;
          x = x +  w / resolution / 2;
          for (let ii = 0; ii < resolution; ii++) {
            let y = ii * h / resolution;
            y = y + h / resolution / 2;
            gridPoints.push(new Two.Vector(x,y))
          }
        }
      }

      function randIdx(arr, notIn=[]) {
        let idx = Math.floor(Math.random() * arr.length)
        for (let i of notIn){
          if (idx === i) {
            randIdx(arr)
          }
        }
        return idx
      }

      function randPath(size=1) {
        let points = []
        let vIndices = []
        while (size > 0) {
          let idx = randIdx(gridPoints, vIndices)
          vIndices.push(idx)
          let pt = gridPoints[idx]
//          points.push(new Two.Anchor())
          points = points.concat(pt.x, pt.y)
          size--;
        }
        let path = two.makePath(...points)
        path.stroke = 'rgb(' + rgbVals[randIdx(rgbVals)].toString() + ')'
        path.fill = 'rgba('+rgbVals[randIdx(rgbVals)].toString()+',0.03)'
        path.vIndices = vIndices
        return path;
      }

      // two render
      two.render()
      two.bind('update', function(frameCount) {
        Tween.update(frameCount)
      }).play();

      class ShapesGroup {
        constructor(maxPoints) {
          this.maxPoints = maxPoints
          this.shapes = []
          this.maxShapes = 100
          this.addShape = _.throttle(function(){
            this.shapes.push(randPath(_.random(2, this.maxPoints)))
            if (this.shapes.length > this.maxShapes) {
              let rs = this.shapes.splice(0, this.shapes.length - this.maxShapes)
              two.remove(rs)
            } else {
              //          two.remove(this.shapes[0])
              //          shapes.shift()
            }
          }, 50)
        }
      }

      let shapes1 = new ShapesGroup(6)
      let bassBump = util.newBumpDetector(40)
      let midBump = util.newBumpDetector(40)

      // triggers
      const shape1 = function(data) {
        let amt = midBump.test(data.pentaBand.lowMid, 20);
        if (amt) {
          let rTgt = shapes1.shapes[randIdx(shapes1.shapes)]
          if(!rTgt) return;
//          rTgt.rotation = rTgt.rotation + amt;
          rTgt.rTween = new Tween.Tween(rTgt).to({rotation : 1.6}, 300).start()
        }
        shapes1.maxShapes = Math.floor(data.average * 1.2)
        if(data.pentaBand.lowMid > 90){
          shapes1.addShape();
        }
      }

      vzr.addTrigger('patterns2', [shape1])
    },
    calculated: {},
    methods: {
    }
  }
</script>

<style scoped>
  .full-page {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    /*transition: background-color 0.2s;*/
  }
  /*.draw-into svg g path {*/
    /*mix-blend-mode: difference;*/
  /*}*/
</style>