const listener = {}

listener.init = () => {
  console.log('listen!');
  let audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
      source,
      stream;

  let analyser = audioCtx.createAnalyser();
  analyser.minDecibels = -90;
  analyser.maxDecibels = -10;
  analyser.smoothingTimeConstant = 0.85;

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
          analyser.connect(distortion);
          // visualize();
          console.log(stream);
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

export default listener