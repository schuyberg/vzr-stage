/////////////////////////////
// VZR base
/////////////////////////////
import vzrListen from './vzr-listen'
import vzrTrigger from './vzr-trigger'

const vzr = {}

vzr.globals = {
  sensitivity : 1
}

const defaultParams = {
  smoothingConstant: 0.85,
  listeners: ['average', 'pentaBand']
}
vzr.init = function(params){
  params = params ? params : defaultParams;
  vzrListen.init(params);
}

// step (call on animation frame)
vzr.step = () => {
  const data = vzr.listen(vzrListen.listeners);
  vzrTrigger.step(data);
}

// add / remove triggers
vzr.addTrigger = (group, trigger) => {
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
