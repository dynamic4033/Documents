var img = null;
var copyImg = null;
var v = 0;
var mainimg = null;
var copymainimg = null;
var copyhideimg = null;
var hideimg = null;

function upload(){
  var finput = input.files[0];
  var fr = new FileReader();
  var fileInput = document.getElementById("finput");
  img = new SimpleImage(fileInput);
  img.src = fr.result;
  copyImg = new SimpleImage(fileInput);
  var can = document.getElementById("filtercan");
  var ctx = can.getContext("2d");
  img.drawTo(can);
}
function DoGreyScale(){
  if(img == null || !img.complete()){
    alert('Image not loaded');
  }
  DoReset();
  for(var pix of img.values()){
    var avg = (pix.getGreen()+pix.getRed()+pix.getBlue())/3;
    pix.setRed(avg);
    pix.setGreen(avg);
    pix.setBlue(avg);
  }
  var can = document.getElementById("filtercan");
  var ctx = can.getContext("2d");
  img.drawTo(can);
}
function DoReset(){
  if(img == null || !img.complete()){
    alert('Image not Loaded');
  }
  img =new SimpleImage(copyImg);
  var can = document.getElementById("filtercan");
  var ctx = can.getContext("2d");
  img.drawTo(can);
}
function DoRainbow(){
  DoReset();
  var w = img.getWidth();
  var h = img.getHeight();
  for(var pix of img.values()){
    var x = pix.getX();
    var y = pix.getY();
    if(x < w/7){
      pix.setRed(255);
    }
  else if(x >= w/7 && x < 2*w/7){
      pix.setRed(255);
      pix.setGreen(127);
  }
    else if(x >= 2*w/7 && x < 3*w/7){
      pix.setRed(255);
      pix.setGreen(255);
  }
    else if(x >= 3*w/7 && x < 4*w/7){
      pix.setGreen(255);
    } 
    else if(x >= 4*w/7 && x < 5*w/7){
      pix.setBlue(255);
    }
    else if(x >= 5*w/7 && x < 6*w/7){
      pix.setRed(75);
      pix.setBlue(130);
    }
    else if(x >= 6*w/7 && x < w){
      pix.setRed(148);
      pix.setBlue(211);
    }
  }
  var can = document.getElementById("filtercan");
  var ctx = can.getContext("2d");
  img.drawTo(can);
}

function redFilter(){
  DoReset();
  for(var pix of img.values()){
    var avg = (pix.getRed()+pix.getGreen()+pix.getBlue())/3;
    if(avg < 128){
      pix.setRed(2*avg);
      pix.setBlue(0);
      pix.setGreen(0);
    }
    else{
      pix.setRed(255);
      pix.setGreen(255-2*avg);
      pix.setBlue(255-2*avg);
    }
  }
  var can = document.getElementById("filtercan");
  var ctx = can.getContext("2d");
  img.drawTo(can);
}
function DoCircle(){
  DoReset();
  var hw = img.getWidth()/2;
  var hh = img.getHeight()/2;
  for(var pix of img.values()){
    var x = hw-pix.getX();
    var y = hh-pix.getY();
    var threshold = (hh*hh*Math.PI)/4;
    if(Math.pow(x,2)+Math.pow(y,2) > threshold){
      var avg = (pix.getGreen()+pix.getRed()+pix.getBlue())/3;
      pix.setRed(avg);
      pix.setGreen(avg);
      pix.setBlue(avg);
    }
  }
  var can = document.getElementById("filtercan");
  var ctx = can.getContext("2d");
  img.drawTo(can);
}

function generateXY(){
  xco = generateX();
  yco =generateY();
}

function validXY(x,y){
if(x+xco<img.getWidth() && y+yco <img.getHeight() && x+xco>=0 && y+yco>=0){
    return true;
  }
  else {return false;}
}

function DoBlur(){
  DoReset();
  var dd7 = document.getElementById("div7");
  dd7.innerHTML = '<input type= "range" Id = "sldr" min ="0" max ="50" value ="min" onchange = "valuechange()">';
  var opimg = new SimpleImage(img.getWidth(),img.getHeight());
  for(var pixel of img.values())
    {
      var x = pixel.getX();
      var x1 = pixel.getX();
      var y1 = pixel.getY();
      var y = pixel.getY();
      var r = Math.random();
      if(r< 0.5){
        opimg.setPixel(x,y,pixel);
      }
      else{
        generateXY();
        if(validXY(x,y,xco,yco)== true){
            x = x+xco;
            y = y+yco;
          var newpixel = img.getPixel(x,y);
             opimg.setPixel(x1,y1,newpixel);
         }
        else generateXY();
      }
    }
  var can = document.getElementById("filtercan");
  var ctx = can.getContext("2d");
  opimg.drawTo(can);
}
function generateX(){
    xco = 0;
    var r = Math.random();
    var s = Math.ceil(Math.random()*v);
    if(r>0.5){
        xco = -s;
    }
    else{
        xco = s;
    }
    return xco;
}
function generateY(){
    yco = 0;
    var r = Math.random();
    var s = Math.ceil(Math.random()*v);
    if(r>0.5){
        yco = -s;
    }
    else{
        yco = s;
    }
    return yco;
}
function valuechange(){
  var dd8 = document.getElementById("sldr");
  v = dd8.value;
  DoBlur();
}

  var canvas = document.getElementById("can");
  var ctx2 = canvas.getContext("2d");
  var gnimg = new Image();
gnimg.src = 'https://clipartart.com/images/greninja-clipart-1.png';
  gnimg.onload = function(){
 canvas.width = gnimg.width;
canvas.height = gnimg.height;   ctx2.drawImage(gnimg,0,0,canvas.width,canvas.height);
};
function megaEvolve(){
var I = new Image();
  I.src = 'https://img.pokemondb.net/artwork/large/greninja-ash.jpg';
  var canvas10 = document.getElementById("can");
  canvas10.className= "megaevolved";
  var ctx3 = canvas.getContext("2d");
  canvas10.width = I.width; 
  ctx3.drawImage(I,0,0,canvas10.width,canvas10.height);
}
var fgimg = null;
var bgimg = null;
var outimg = null;
function uploadbgimage(){
  var dd1 = document.getElementById("bgimage");
  bgimg = new SimpleImage(dd1);
  var canvas = document.getElementById("greenbgcan");
  bgimg.drawTo(canvas);
}
function uploadfgimage(){
  var dd1 = document.getElementById("fgimage");
  fgimg = new SimpleImage(dd1);
  var canvas = document.getElementById("greenfgcan");
  fgimg.drawTo(canvas);
}
function greenScreenFunction(){
  if(bgimg == null || !bgimg.complete()){
    alert('Background image not Loaded');
  }
  if(fgimg == null || !fgimg.complete()){
    alert('Foreground image not Loaded');
  }
  outimg = new SimpleImage(bgimg.getWidth(),bgimg.getHeight());
  for(var pixel of bgimg.values()){
    var green = pixel.getGreen();
    var blue = pixel.getBlue();
    var red = pixel.getRed();
    var x = pixel.getX();
      var y = pixel.getY();
    if(green > red + blue){
      var newPixel = fgimg.getPixel(x, y);
      outimg.setPixel(x, y, newPixel);
    }
    else{
      outimg.setPixel(x,y, pixel);
    }
  }
    clearCanvas();
  var Canvas = document.getElementById("greenbgcan");
  outimg.drawTo(Canvas);
}
function clearCanvas(){
  var canvas1 = document.getElementById("greenfgcan");
  var ctx1 = canvas1.getContext("2d");
  var canvas2 = document.getElementById("greenbgcan");
  var ctx2 = canvas2.getContext("2d");
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
}
function mainImageUpload(){
  var file = document.getElementById("mainimage");
  var canvas6 = document.getElementById("mainimagecanvas");
  mainimg = new SimpleImage(file);
  copymainimg = new SimpleImage(file);
  mainimg.drawTo(canvas6)
}
function hideImageUpload(){
var file = document.getElementById("hideimage");
var canvas6 = document.getElementById("hideimagecanvas");
  hideimg = new SimpleImage(file);
  copyhideimg = new SimpleImage(file);
  hideimg.drawTo(canvas6);
}
function resetStega(){
  if(mainimg == null || !mainimg.complete()){
    alert('Main Image not Loaded');
  }
  if(hideimg == null || !hideimg.complete()){
    alert('Hide Image not Loaded');
  }
  
  var canvas6 = document.getElementById("hideimagecanvas");
  var canvas7 = document.getElementById("mainimagecanvas");
  hideimg = new SimpleImage(copyhideimg);
  mainimg = new SimpleImage(copymainimg);
  hideimg.drawTo(canvas6);
  mainimg.drawTo(canvas7);
}
function Hide(){
  resetStega();
  if(mainimg.getWidth()< hideimg.getWidth()){
    alert('Main Image is smaller than hide image. Cannot Hide! Please Reupload Different Main Image');
    return;
  }
  else if(mainimg.getWidth()> hideimg.getWidth()){
    var newhideimage = new SimpleImage(mainimg.getWidth(),mainimg.getHeight());
    for(var pix of hideimg.values()){
 newhideimage.setPixel(pix.getX(),pix.getY(),pix);
    }
    hideimg = new SimpleImage(newhideimage);
  }
  var outimg = new SimpleImage(hideimg.getWidth(),hideimg.getHeight());
  for(var pxA of hideimg.values()){
    var pxB = mainimg.getPixel(pxA.getX(),pxA.getY());
    var red = Math.floor(pxB.getRed()/16)*16 + Math.floor(pxA.getRed()%16);
    var green = Math.floor(pxB.getGreen()/16)*16 + Math.floor(pxA.getGreen()%16);
    var blue = Math.floor(pxB.getBlue()/16)*16 + Math.floor(pxA.getBlue()%16);
    var pixO = outimg.getPixel(pxA.getX(),pxA.getY());
    pixO.setRed(red);
    pixO.setGreen(green);
    pixO.setBlue(blue);
  }
    var canvas9 = document.getElementById("hideimagecanvas");
  outimg.drawTo(canvas9);
}
