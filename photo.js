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

// for easy future referencing
const canvas = document.querySelector(".product-slide");
const context = canvas.getContext('2d');
const frameCount = 238;
console.log("hi");

const loader = document.querySelector(".loader-bg");

// Stores the images for fast access
const images = []

// takes index of img as parameter, returns src of img
const currentFrame = index => (
    // `assets/1080_50/${index.toString().padStart(4, '0')}.jpg`
    `assets/1080_50_webp/${index.toString().padStart(4, '0')}.webp`
)

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let img = new Image();

// Set source to 1st frame
img.src = currentFrame(1);

// Calculate scale and img draw position
const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
const centerShift_x = (canvas.width - img.width * scale) / 2;
const centerShift_y = (canvas.height - img.height * scale) / 2;

// Load first image on page load
img.onload = function() {
  context.drawImage(img, 0,0, img.width, img.height, 0,0,img.width*scale, img.height*scale);
}

// Updates img path and draws updated image
const updateImage = index => {
        img.src = currentFrame(index);
        context.drawImage(images[index], 0,0, img.width, img.height, 0,0,img.width*scale, img.height*scale);
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

// Loads images into memory for faster access
const preloadImages = () => {
    for(let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images[i] = img
    }
    loader.style.display = "none"
};

preloadImages();