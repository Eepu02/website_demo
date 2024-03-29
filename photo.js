const html = document.documentElement;

// for easy future referencing
const canvas = document.querySelector(".product-slide");
const context = canvas.getContext('2d');
const frameCount = 238;

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
  context.drawImage(img, 0,0, img.width, img.height, centerShift_x, centerShift_y, img.width*scale, img.height*scale);
}

// Updates img path and draws updated image
const updateImage = index => {
    let photo = images[index];
    // img.src = currentFrame(index);
    context.drawImage(images[index], 0,0, photo.width, photo.height, centerShift_x, centerShift_y, photo.width*scale, photo.height*scale);
}

const wrapper = document.querySelector(".canvas-wrapper");
const canvasPos = wrapper.getBoundingClientRect().top;
window.addEventListener('scroll', () => {
  
    const sizes = wrapper.getBoundingClientRect();
    if(window.pageYOffset > canvasPos + sizes.height) {
      wrapper.style.position = 'relative';
      wrapper.style.marginTop = sizes.height + 'px';
    } else {
      wrapper.style.position = 'sticky';
      wrapper.style.marginTop = '0px';
    }

    const scrollFraction = Math.max(0, (window.pageYOffset - canvasPos) / sizes.height);
    
    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(scrollFraction * frameCount)
    );
    requestAnimationFrame(() => updateImage(frameIndex + 1));
  });

// Loads images into memory for faster access
async function preloadImages() {
    for(let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images[i] = img;
    }
    loader.style.display = "none";
    // requestAnimationFrame(() => updateImage(0));
    console.log("images loaded!");
};

preloadImages();