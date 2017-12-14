/////////////////////////////
// VZR
// vzr base and global parameters
/////////////////////////////
import listen from './vzr-listen'
import trigger from './vzr-trigger'

vzr = {}

vzr.globals = {
  sensitivity : 1,

}

// step (call on animation frame)
vzr.step = (data) => {

}

// add / remove triggers
vzr.addTrigger = (group, trigger) => {


}
vzr.removeTrigger = (group, trigger) => {

}

// get audio data
vzr.listen = (names) => {
  const data = {}
  if(Array.isArray(names)){
    names.forEach((n) => {
      process(n)
    } )
  } else {

  }
  function process(n){
    data[n] = (listen[n].data instanceof Function) ? listen[n].data() : listen[n].data;

  }
}

// create listener
vzr.newListener = (frequencyBandsObj) => {

}



export default vzr
