const listener = {}
let audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
  source,
  stream;

let analyser = audioCtx.createAnalyser();
analyser.smoothingTimeConstant = 0.85;

listener.init = () => {
  console.log('listen!');
  if (navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia supported.');
    setTimeout(function(){
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
      )}, 600);
  } else {
    console.log('getUserMedia not supported on your browser!');
  }
}

listener.triBand = () => {
  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  analyser.getByteFrequencyData(dataArray);

  let filteredArr = dataArray.filter(function(val){ return val !== 0; })
  let thirds = Math.floor(filteredArr.length / 3);
  let bands = {
    low : normalize(filteredArr.slice(0, thirds)),
    mid : normalize(filteredArr.slice(thirds, thirds*2)),
    high : normalize(filteredArr.slice(thirds*2, filteredArr.length)),
  };
  function normalize(bufferArr){
    if (bufferArr.length < 1) { return 0; }
    let val = 0;
    for (const n of bufferArr) {
      if(!isNaN(n)){
        val += n;
      }
    }
    return val / bufferArr.length;
  }
  console.log(filteredArr.length, normalize(dataArray))
  console.log(bands);
}

// function

setInterval(function(){
  listener.triBand();
},300)

export default listener