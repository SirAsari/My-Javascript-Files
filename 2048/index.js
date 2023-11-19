document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp") {
    console.log("Arrow Up pressed");
  } else if (event.key === "ArrowDown") {
    console.log("Arrow Down pressed");
  } else if (event.key === "ArrowLeft") {
    console.log("Arrow Left pressed");
  } else if (event.key === "ArrowRight") {
    console.log("Arrow Right pressed");
  }
});

// Get all the boxes within the boxContainer
const boxes = document.querySelectorAll('.boxContainer .box');

// Loop through each box
boxes.forEach(box => {
    // Check if the box has content
    if (box.textContent.trim().length > 0) {
        // Add a class to change the background color
        box.classList.add('highlight');
    }
});
