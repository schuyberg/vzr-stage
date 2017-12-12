const listener = {}
let audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
  source,
  stream;


/////////////////////////////
// init
////////////////////////////
let analyser = audioCtx.createAnalyser();
analyser.smoothingTimeConstant = 0.85;
listener.init = () => {
  console.log('listen!');
  if (navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia supported.');
    setTimeout(function () {
      navigator.mediaDevices.getUserMedia(
        // constraints - only audio needed for this app
        {
          audio: true
        }).then(
        // Success callback
        function (stream) {
          source = audioCtx.createMediaStreamSource(stream);
          source.connect(analyser);
          console.log("connected to:", stream);
        }).catch(
        // Error callback
        function (err) {
          console.log('The following gUM error occured: ' + err);
        }
      )
    }, 600);
  } else {
    console.log('getUserMedia not supported. Try a different browser.');
  }
}

/////////////////
// analyze bytes (spectrum band analyzer)
////////////////
let byteAnalysis = () => {
  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteFrequencyData(dataArray);
  return dataArray;
}
let getEnergy = function(freqDomain, range) { ///// thanks p5.js-Audio!
  if (!range || !Array.isArray(range)) {
    range = false;
  }
  let nyquist = audioCtx.sampleRate / 2;  // this is clutch..
  let lowIndex = range ? Math.round(range[0] / nyquist * freqDomain.length) : 0;
  let highIndex = range ? Math.round(range[1] / nyquist * freqDomain.length) : freqDomain.length - 1;
  let total = 0;
  let numFrequencies = 0;
  // add up all of the values for the frequencies
  for (let i = lowIndex; i <= highIndex; i++) {
    total += freqDomain[i];
    numFrequencies += 1;
  }
  let toReturn = total / numFrequencies;
  return toReturn;
};

/////////////////////////////
// frequency band listeners
////////////////////////////
class FrequencyBand  {
  constructor(freqRanges) {
    this.freqRanges = (freqRanges) ? freqRanges : {
      audibleSpectrum : [20, 1400]
    }
    this.freqData = {}
    this.update = () => {
      let dataArray = byteAnalysis();
      for (const f in this.freqRanges) {
        this.freqData[f] = getEnergy(dataArray, this.freqRanges[f]);
      }
    }
  }
}

listener.pentaBand = new FrequencyBand({
  bass : [20, 100],
  lowMid : [100, 300],
  mid : [300, 2500],
  highMid : [2500, 5200],
  high : [5200, 14000]
});

listener.average = () => {
  let avg =getEnergy(byteAnalysis())
  return avg;
}


//////


// test
// setInterval(function(){
//   listener.pentaBand.update();
  // console.log(listener.pentaBand.freqData);
// },300)

export default listener
