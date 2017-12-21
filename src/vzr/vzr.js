/////////////////////////////
// VZR base
/////////////////////////////
import vzrListen from './vzr-listen'
import vzrTrigger from './vzr-trigger'

const vzr = {}

// globals can be changed downstream during playback
vzr.globals = {
  sensitivity : 1
}

// init params are set on visualization load
const initParams = {
  smoothingConstant: 0.85,
  listeners: ['average', 'pentaBand'],
  customLoop : false
}

vzr.init = function(params){  // REQUIRED
  params = params ? params : initParams;
  vzrListen.init(params);
  if (!params.customLoop && !drawing) {
    draw();
  }
}

// animation loop
let drawing = false;
let draw = function() {
  drawing = true;
  vzr.step();
  window.requestAnimationFrame(draw);
}

// step (call on animation frame if using a custom loop, otherwise handled by init())
vzr.step = () => {
  const data = vzr.listen(vzrListen.listeners);
  vzrTrigger.step(data);
}

// add / remove triggers
vzr.addTrigger = (group, trigger) => { // REQUIRED
  if(!vzrTrigger[group]) {
    vzrTrigger.newTriggerObserver(group)
  }
  vzrTrigger[group].add(trigger)
}
vzr.removeTrigger = (group, trigger) => {
  if (!trigger) {
    vzrTrigger.removeTriggerObserver(group)
  } else {
   vzrTrigger[group]
  }
}

// get audio data and apply global mods
// called in step(), exposed just in case
vzr.listen = (names) => {
  const data = {}
  if(Array.isArray(names)){
    names.forEach((n) => {
      process(n)
    } )
  } else {
    process(names)
  }
  function process(n){
    data[n] = vzrListen[n].data();
    if (typeof(data[n]) == 'object') {
      for (const key in data[n]) {
        data[n][key] = data[n][key] * vzr.globals.sensitivity
      }
    } else {
      data[n] = data[n] * vzr.globals.sensitivity
    }
  }
  return data;
}
// note: use methods in vzr-listen to create new listeners

export default vzr
