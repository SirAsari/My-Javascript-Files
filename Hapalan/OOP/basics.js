// OOP biasanya diterapkan di Class Based language: C++, C#, Java

const car = {
    constructor: function(brand, color, maxSpeed, chassisNumber) {
        this.brand = brand,
        this.color = color,
        this.maxSpeed = maxSpeed,
        this.chassisNumber = chassisNumber
    },
    drive: () => {
      console.log('driving');
    },
    reverse: () => {
      console.log('reversing');
    },
    turn: () => {
      console.log('turning');
    }
}

let car1 = Object.create(car);
car1.constructor('Toyota', 'black', 100, '123456789');  
console.log(car1.brand);

// Private field
class Circle {
    #radius;

    constructor(value) {
      this.#radius = value;
    }
}