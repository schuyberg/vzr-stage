<template>
    <div class="#debugger">
      <template v-if="show">
        <table class="debugtable">
          <tr>
            <th>avg</th>
            <td v-bind:style="freqColor(avg)">{{ avg }}</td>
          </tr>
          <tr v-for="v, k in freqData">
            <th>{{ k }}</th>
            <td v-bind:style="freqColor(v)">{{ v }}</td>
          </tr>
        </table>
      </template>
    </div>
</template>

<script>
  import Vue from 'vue'
  import vzr from '../vzr/vzr'
  export default {
    name: 'vzrDebug',
    props: ['show'],
    data () {
      return {
        freqData: {},
        avg: '',
//        showDebugger: false
//        show: true
      }
    },
    created () {
      console.log(this.show)
      let self = this;
      vzr.init();
      vzr.addTrigger('dbg', [testTrigger, testTrigger2])
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
        // if (data.average > 20) {
        //   self.avg = data.average + 100
        // } else {
          self.avg = data.average;
        // }
      }
//      self.draw()
    },
    watch: {
    },
    calculated: {
    },
    methods: {
      freqColor : function (data){
        let i = (Math.round(data) / 2) + 10;
        let styleObj = { "background-color" : "hsla(124,"+i+"%, 45%, 1)" }
        return styleObj;
      }
    }
  }
</script>

<style scoped>
  .debugtable {
    font-family: monospace;
    background-color: rgba(1,1,1,0.4);
    color: #96c1e6;
    padding: 3px;
    position: fixed;
    top: 10px;
    left: 10px;
  }
  .debugtable th {
    text-align: right;
    width: 100px;
  }
  .debugtable td {
    text-align: left;
    color:black;
    width: 170px;
  }
  .hidden {
    display: none
  }
</style>
