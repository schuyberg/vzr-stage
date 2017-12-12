<template>
    <div class="#debugger">
      <table class="debugtable" v-if="showDebugger">
        <tr>
          <th>avg</th>
          <td v-bind:style="freqColor(avg)">{{ avg }}</td>
        </tr>
        <tr v-for="v, k in freqData">
          <th>{{ k }}</th>
          <td v-bind:style="freqColor(v)">{{ v }}</td>
        </tr>
      </table>
      <!--<p v-for="v, k in freqData">{{ k }} : {{ v }}</p>-->
    </div>
</template>

<script>
  import li from '../listener.js'
  import Vue from 'vue'
  export default {
    name: 'vzrDebug',
    data () {
      return {
        freqData: {},
        avg: '',
        showDebugger: true
      }
    },
    created () {
      let self = this;
      li.init()
      self.draw();
      // some things are just easier this way..
//      self.showDebugger = (NODE_ENV && NODE_ENV === 'dev') ? true : false;
        $('body').on('keyup', function (e) {
        if(e.which == 68) {
          self.showDebugger = !self.showDebugger;
        }
      })
    },
    calculated: {
    },
    methods: {
      freqColor : function (data){
        let i = (Math.round(data) / 2) + 10;
        let styleObj = { "background-color" : "hsla(124,"+i+"%, 45%, 1)" }
        return styleObj;
      },
      draw : function () {
        li.pentaBand.update()
        this.freqData = li.pentaBand.freqData;
        this.avg = li.average();
        window.requestAnimationFrame(this.draw);
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
