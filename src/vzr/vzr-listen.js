/////////////////////////////
// VZR-LISTEN
// listens to audio source input and provides FFT output
////////////////////////////

const vzrListen = {}

let audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
  source,
  stream;
vzrListen.analyser = audioCtx.createAnalyser();
vzrListen.analyser.smoothingTimeConstant = 0.85;

vzrListen.init = () => {
  console.log('listen!');
  if (navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia supported.');
    setTimeout(function () {
      navigator.mediaDevices.getUserMedia(
        {
          audio: true
        }).then(
        function (stream) {
          source = audioCtx.createMediaStreamSource(stream);
          source.connect(vzrListen.analyser);
          console.log("connected to:", stream);
        }).catch(
        function (err) {
          console.log('The following gUM error occured: ' + err);
        }
      )
    }, 600);
  } else {
    console.log('getUserMedia not supported. Try a different browser.');
  }
}

/////////////////////////////
// frequency band analysis (getByteFrequencyData)
////////////////////////////
class FrequencyBand  {
  constructor(freqRanges) {
    this.freqRanges = (freqRanges) ? freqRanges : {
      audibleSpectrum : [20, 14000]
    }
    this.freqData = {}
    this.data = () => {
        let dataArray = byteAnalysis();
        for (const f in this.freqRanges) {
          this.freqData[f] = getEnergy(dataArray, this.freqRanges[f]);
        }
        return this.freqData;
    }
  }
}
// byte analysis (spectrum band analyzer)
// get byteFrequencyData
const byteAnalysis = () => {
  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteFrequencyData(dataArray);
  return dataArray;
}
// get snapshot of waveform energy (0-255).
// input: byteFrequencyData, [frequencyLowerLimit, frequencyUpperLimit]
const getEnergy = function (freqDomain, range) { ///// thanks p5.js-Audio..
  if (!range || !Array.isArray(range)) {
    range = false;
  }
  const nyquist = audioCtx.sampleRate / 2;  // ..for this, specifically.
  const lowIndex = range ? Math.round(range[0] / nyquist * freqDomain.length) : 0;
  const highIndex = range ? Math.round(range[1] / nyquist * freqDomain.length) : freqDomain.length - 1;
  let total = 0;
  let numFrequencies = 0;
  for (let i = lowIndex; i <= highIndex; i++) {
    total += freqDomain[i];
    numFrequencies += 1;
  }
  const toReturn = total / numFrequencies;
  return toReturn;
}

//TODO: add support for getTimeFrequencyData type listeners


/////////////////
// listeners
////////////////
vzrListen.listeners = ['pentaBand', 'triBand', 'average']
// create new listener
//TODO: make a general purpose listener constructor that works for all types of listeners
vzrListen.newFrequencyBand = function (name, freqObj) {
  vzrListen[name] = new FrequencyBand(freqObj);
  vzrListen.listeners.push(name);
}

// defaults
// vzrListen.fullSpectrum = new FrequencyBand({});
vzrListen.pentaBand = new FrequencyBand({
  bass : [20, 100],
  lowMid : [100, 300],
  mid : [300, 2500],
  highMid : [2500, 5200],
  high : [5200, 14000]
});
vzrListen.triBand = new FrequencyBand({
  bass: [20, 300],
  mid: [300, 2600],
  high: [2600, 14000]
});
vzrListen.average = {
  data : () => {
    let avg = getEnergy(byteAnalysis())
    return avg;
  }
}
export default vzrListen
