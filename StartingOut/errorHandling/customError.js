// ? Throwing Custom Error

function validateInput(input) {
    if (!input) {
        throw new Error("Input cannot be empty");
    }
    // Other validation logic
}

try {
    validateInput(someInput);
} catch (error) {
    console.error(error.message);
}