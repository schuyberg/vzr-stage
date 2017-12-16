/////////////////////////////
// VZR TRIGGER
// maintains a list of 'triggerObservers' that, in turn
////////////////////////////

const vzrTrigger = {}
const triggers = []
// TriggerObserver
// trigger must be a function that should return data if conditions are met.
class TriggerObserver {
  constructor() {
    this.observers = [];
    this.add = (trigger) => {
      if (Array.isArray(trigger)) {
        this.observers = this.observers.concat(trigger)
      } else {
        this.observers.push(trigger);
      }
    }
    this.remove = (trigger) => {
      this.observers = this.observers.filter((subscriber) => subscriber !== trigger);
    }
    this.broadcast = (data) => {
      this.observers.forEach((subscriber) => subscriber(data));
    }
  }
}

// TriggerObserver Groups
// create new triggerObserver
vzrTrigger.newTriggerObserver = function (group) {
    vzrTrigger[group] = new TriggerObserver()
    triggers.push(vzrTrigger[group])
}
// remove triggerObserver
vzrTrigger.removeTriggerObserver = function(group) {
  delete vzrTrigger[group]
}

// fire triggers on each animation frame AFTER listener.name.update() is called
vzrTrigger.step = (data) => {
  triggers.forEach((v, i) => {
    v.broadcast(data);
  })
}

// example trigger
// function example_trigger(data) {
//   if(data){
//     console.log(data)
//   } else {
//     console.log('no data!')
//   }
// }

export default vzrTrigger
