function embedSlideChange(leftUrl, rightUrl){
    document.addEventListener("keydown", function(event) {
      // Check if the pressed key is the right arrow key 
      if (event.code === "ArrowRight" && rightUrl) {
        // Navigate to the desired URL.
        window.location.href = rightUrl; // Replace with your desired URL.
      } else if (event.code === "ArrowLeft" && leftUrl) {
        window.location.href = leftUrl;
      }
    });
}