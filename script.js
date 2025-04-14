
document.addEventListener("DOMContentLoaded", function() {
    const uploadInput = document.getElementById('upload');
    const userImage = document.getElementById('userImage');
    const resizeSlider = document.getElementById('resizeSlider');
    const xSlider = document.getElementById('xSlider');
    const ySlider = document.getElementById('ySlider');
    const downloadBtn = document.getElementById('downloadBtn');
    const editorContainer = document.getElementById('img-container');
    const downloadCanvas = document.getElementById('downloadCanvas');
    const ctx = downloadCanvas.getContext('2d');
    

    let baseWidth = 0, baseHeight = 0;
    

    let originalImage = new Image();

    uploadInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = function(event) {
        originalImage.src = event.target.result;
        originalImage.onload = function() {
          userImage.src = originalImage.src;
          userImage.style.display = 'block';
          baseWidth = editorContainer.clientWidth;
          baseHeight = originalImage.height * (baseWidth / originalImage.width);
          userImage.style.width = baseWidth + "px";
          userImage.style.height = "auto";
          userImage.style.left = "0px";
          userImage.style.top = "0px";
       
          resizeSlider.value = 1;
          xSlider.value = 0;
          ySlider.value = 0;
        }
      }
      reader.readAsDataURL(file);
    });
    
  
    resizeSlider.addEventListener('input', function(e) {
      if (userImage.style.display === "none") return;
      
      const scale = parseFloat(e.target.value);
      const newWidth = baseWidth * scale;
      const newHeight = baseHeight * scale;
      userImage.style.width = newWidth + "px";
      userImage.style.height = newHeight + "px";
    });
    
   
    xSlider.addEventListener('input', function(e) {
      if (userImage.style.display === "none") return;
      
      const xOffset = parseInt(e.target.value, 10);
      userImage.style.left = xOffset + "px";
    });
    
 
    ySlider.addEventListener('input', function(e) {
      if (userImage.style.display === "none") return;
      
      const yOffset = parseInt(e.target.value, 10);
      userImage.style.top = yOffset + "px";
    });
    

    downloadBtn.addEventListener('click', function() {
      if (userImage.style.display === "none") {
        alert("Please upload an image first.");
        return;
      }
      
  
      const containerRect = editorContainer.getBoundingClientRect();
      const scaleX = downloadCanvas.width / containerRect.width;
      const scaleY = downloadCanvas.height / containerRect.height;
      
 
      ctx.clearRect(0, 0, downloadCanvas.width, downloadCanvas.height);
      
    
      const imgLeft = parseFloat(userImage.style.left) || 0;
      const imgTop = parseFloat(userImage.style.top) || 0;
      const imgWidth = userImage.clientWidth;
      const imgHeight = userImage.clientHeight;
   
      const tempImg = new Image();
      tempImg.src = userImage.src;
      tempImg.onload = function() {

        ctx.drawImage(
          tempImg,
          imgLeft * scaleX,
          imgTop * scaleY,
          imgWidth * scaleX,
          imgHeight * scaleY
        );
        
       
        const frameImg = new Image();
        frameImg.src = document.getElementById('frame').src;
        frameImg.onload = function() {
          ctx.drawImage(frameImg, 0, 0, downloadCanvas.width, downloadCanvas.height);
          
     
          const link = document.createElement('a');
          link.download = "framed_image.png";
          link.href = downloadCanvas.toDataURL("image/png");
          link.click();
        }
      };
    });
  });
  