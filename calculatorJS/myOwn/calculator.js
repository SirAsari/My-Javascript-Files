document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
  
    // Add event listeners for buttons
    const buttons = document.querySelectorAll("input[type='button']");
    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        const value = button.value;
  
        switch (value) {
          case "AC":
            display.value = "";
            break;
          case "DE":
            display.value = display.value.slice(0, -1);
            break;
          case "=":
            display.value = eval(display.value);
            try {
            } catch (error) {
              display.value = "Error";
            }
            break;
          default:
            display.value += value;
        }
      });
    });
  });
  