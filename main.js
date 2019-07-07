let canvas;
let context;
let video;

const font_size = 20;
const char_w = 12; // 640 / 53
const char_h = 18;
const char_cols = 53;
const char_rows = 20;
const width = 640;

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
  let imageData = context.getImageData(0, 0, video.videoWidth, video.videoHeight);
  // for (let i = 0; i < imageData.data.length; i+= 4) {
  //   imageData.data[i] ^= 255;
  //   imageData.data[i+1] ^= 255;
  //   imageData.data[i+2] ^= 255;
  // }
  // context.putImageData(imageData, 0, 0);

  let blockData = [];
  for (let i = 0; i < char_cols; i++) {
    for (let j = 0; j < char_rows; j++) {
      let sum = 0;
      for (let a = 0; a < char_w; a++) {
      for (let b = 0; b < char_h; b++) {
        let idx = ((j*char_h + b)*width + i*char_w + a)*4; // NOTE array size = pixels * 4 (rgba)
        sum += imageData.data[idx] + imageData.data[idx + 1] + imageData.data[idx + 2]; // TODO should average by brightness
      }
      }
      blockData.push(sum);
    }
  }

  // context.fillStyle = 'white';
  // context.fillRect(0, 0, video.videoWidth, video.videoHeight);
  
  context.fillStyle = 'rgba(255, 255, 255, 0.5)';
  fillTextAsLines(context, blockData, "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. \"What's happened to me?\" he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather.".toUpperCase());
  
  setTimeout(() => { drawFrame(video); }, 10);
}

function fillTextAsLines(context, weights, text) { //line_width as characters & line_height as pixels
  for (let i = 0; i < text.length; i++) {
    context.font = `${(weights[i] / 255 / 4 / char_w / char_h)*400 + 300} ${font_size}px "Fira Code"`; // NOTE font weights: 300-700
    context.fillText(text.charAt(i), (i % char_cols)*char_w, Math.floor(i/char_cols)*char_h);
  }
}