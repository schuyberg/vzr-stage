# VZR - a music visualization platform

VZR is designed to provide a base layer for creating vizualizations based on audio input in JavaScript

* processes audio input with the JS web audio API
  * set listeners for specific frequency bands
* runs an animation loop and propagates audio data to registered trigger functions
  * set triggers to receive and run actions based audio data
  
  
## Usage

### Basic setup:

    import vzr from 'vzr.js'
    
    // set initial parameters (optional)
    const initParams = {
       smoothingConstant: 0.85,
       listeners: ['average', 'pentaBand'],
       customLoop : false
     }  
    
    // initialize vzr and start loop
    vzr.init(initParams)
    
    // add a trigger
    const testTrigger = function(data){
      if (data.pentaBand.lowMid > 10) {
        console.log('kick!')
      }
    }
    vzr.addTrigger('triggerGroup', [testTrigger])
    
### Listeners

Listeners take a snapshot of the current audio spectrum and return _byte frequency data_, a normalized a normalized array of values between 0 and 255, for a range of frequencies. Listener data is passed into the 'data' object of each registered trigger.

#### Defaults: Average

Returns the average byte frequency data across the audio spectrum.

    data.average  // => 130.5
    
#### Defaults: pentaBand

Returns a five band array of frequency byte data.

    data.pentaBand // => {
                   //       bass : 150.02
                   //       lowMid : 100
                   //       mid : 10
                   //       highMid : 24
                   //       high : 3
                   //   }

#### Creating Listeners

New frequency band listeners can be created with
    
    vzrListen.newFrequencyBand('triBand', {
      bass: [20, 300],
      mid: [300, 2600],
      high: [2600, 14000]
    })
    
Frequencies should be specified in Hz.

The new listener can then be included in the 'listeners' array parameter that is passed into vzr.init().

    vzr.init({ listeners : ['average', triBand'] })


### Triggers

Triggers are functions that are fired on each frame of the animation loop to act on the frequency data. Every trigger function must pass the 'data' object as its first argument. Output from listeners will be attached to this object.

    function trigger(data){
      // do something with data
    }
    
#### Registering Triggers

Triggers must be registered using vzr.registerTrigger() before they will be fired in the vzr animation loop. Triggers are registered into a named group to more easily manage multiple triggers:

      vzr.registerTrigger('groupName', [trigger])

Multiple triggers can be registered into the group simultaneously by passing an array of triggers.

#### Removing Triggers

Specific triggers or groups of triggers can be removed with: 
   
    vzr.removeTrigger('groupName', [trigger])