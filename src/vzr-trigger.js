/////////////////////////////
// VZR TRIGGERS
// maintains a list of 'triggerObservers' that, in turn
////////////////////////////
import listener from './listener.js'

const vzrTrigger = {}
const triggers = []
// TriggerObserver
class TriggerObserver {
  constructor() {
    this.observers = [];
    this.add = (fn) => {
      if (Array.isArray(fn)) {
        this.observers = this.observers.concat(fn)
      } else {
        this.observers.push(fn);
      }
    }
    this.remove = (fn) => {
      this.observers = this.observers.filter((subscriber) => subscriber !== fn);
    }
    this.broadcast = (data) => {
      this.observers.forEach((subscriber) => subscriber(data));
    }
  }
}
// create new triggerObserver
vzrTrigger.newTriggerObserver = function (t) {
    vzrTrigger[t] = new TriggerObserver()
    triggers.push(vzrTrigger[t])
}
// remove triggerObserver


// fire triggers on each animation frame AFTER listener.name.update() is called
vzrTrigger.step = (data) => {
  triggers.forEach((v, i) => {
    v.broadcast(data);
  })
}

// example / test
// (typically in view:)
// vzrTrigger.newTriggerObserver('triggerGrp');
// vzrTrigger.triggerGrp.add(example_trigger);
// function example_trigger(data) {
//   if(data){
//     console.log(data)
//   } else {
//     console.log('no data!')
//   }
// }
// listener.pentaBand.update()
// vzrTrigger.step(listener.pentaBand.freqData)


export default vzrTrigger
