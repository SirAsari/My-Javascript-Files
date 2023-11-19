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
const boxesWithContent = document.querySelectorAll('.boxContainer .box:not(:empty)');

// Loop through each box with content
boxesWithContent.forEach(box => {
    // Add a class or apply styling to boxes with content
    box.classList.add('highlight');
});