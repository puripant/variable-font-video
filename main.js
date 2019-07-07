let canvas;
let context;
let video;

const font_size = 20;

window.addEventListener('load', init);

function init() {
  video = document.getElementById('video');
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');

  video.addEventListener('play', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // video.play();
  
    drawFrame(video);
  });
}

function drawFrame(video) {
  context.drawImage(video, 0, 0);
  // let imageData = context.getImageData(0, 0, video.videoWidth, video.videoHeight);
  // for (let i = 0; i < imageData.data.length; i+= 4) {
  //   imageData.data[i] ^= 255;
  //   imageData.data[i+1] ^= 255;
  //   imageData.data[i+2] ^= 255;
  // }
  // context.putImageData(imageData, 0, 0);

  // context.fillStyle = 'white';
  // context.fillRect(0, 0, video.videoWidth, video.videoHeight);
  
  context.fillStyle = 'rgba(255, 255, 255, 0.5)';
  fillTextAsLines(context, 53, 18, "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. \"What's happened to me?\" he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather.".toUpperCase());
  
  setTimeout(() => { drawFrame(video); }, 10);
}

function fillTextAsLines(context, line_width, line_height, text) { //line_width as characters & line_height as pixels
  for (let i = 0; i < text.length/line_width + 1; i++) {
    context.font = `${(i+3)*20 + 300} ${font_size}px "Fira Code"`;
    context.fillText(text.substring(i*line_width, (i+1)*line_width), 0, (i+1)*line_height);
  }
}