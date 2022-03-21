/* console.log("moi");
document.addEventListener("scroll", changeNumber);
var img = document.getElementById("product");
console.log(img);
var currentImg = img.getAttribute("src")
var currentNumber = parseInt(currentImg.substring(8, 12));
var nextNumber = currentNumber + 1;
nextNumber = ("0000" + nextNumber).slice(-4);
var nextImg = "/assets/" + nextNumber + ".jpg";
console.log(nextImg); */

const html = document.documentElement;
const canvas = document.querySelector(".product-slide");
const context = canvas.getContext('2d');
const frameCount = 239;

// takes index of img as parameter, returns src of img
const currentFrame = index => (
    `/assets/1080/${index.toString().padStart(4, '0')}.jpg`
  )

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const img = new Image();
img.src = currentFrame(1);
const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
const centerShift_x = (canvas.width - img.width * scale) / 2;
const centerShift_y = (canvas.height - img.height * scale) / 2; 
//console.log(scale);

img.onload = function() {
    context.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * scale, img.height * scale);
}

const updateImage = index => {
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * scale, img.height * scale);
  }

window.addEventListener('scroll', () => {  
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(scrollFraction * frameCount)
    );
    requestAnimationFrame(() => updateImage(frameIndex + 1))
  });

const preloadImages = () => {
    for(let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
    }
};

preloadImages();

/* function changeNumber() {
    console.log("Heipä hei");
} */