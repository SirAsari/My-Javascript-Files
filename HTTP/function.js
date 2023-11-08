const testFunction = () => {
    console.log("Function in function.js")
}

const secondFunction = (message) => {
    console.log(`Second function, ${message}`)
}

module.exports = {
    testFunction,
    secondFunction
}