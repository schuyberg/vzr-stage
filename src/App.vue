<template>
  <div id="app">
    <h1>{{ msg }}</h1>

  </div>
</template>

<script>
  import li from './listener.js'
  export default {
    name: 'app',
    data () {
      return {
        msg: 'Test App'
      }
    }
  }
  li.init();
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

body {
  background-color: black;
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
