<template>
  <div id="app">
    <vzr-rainbow></vzr-rainbow>
    <vzr-debug></vzr-debug>
    <div id="viz">
    </div>
  </div>
</template>

<script>
  import vzrDebug from './components/vzr-debug.vue';
  import vzrRainbow from './components/vzr-rainbow.vue';
  export default {
    name: 'app',
    components: { vzrDebug, vzrRainbow }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #59758e;
  margin-top: 60px;
}
.debugtable {
  font-family: monospace;
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
body {
  background-color: gray;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
