// JavaScript Array Functions:
// 1. forEach() - Iterates through an array and applies a function to each element.
array.forEach(function(value, index) {
    // Your code here
  });
  
  // 2. map() - Creates a new array by applying a function to each element of the original array.
  const newArray = array.map(function(item) {
    return transformedItem;
  });
  
  // 3. reduce() - Reduces an array to a single value by applying a function to each element.
  const result = array.reduce(function(accumulator, item) {
    // Your code here
    return newAccumulatorValue;
  }, initialValue);
  
  // 4. filter() - Creates a new array with elements that pass a provided test.
  const filteredArray = array.filter(function(item) {
    return shouldIncludeItem;
  });
  
  // 5. indexOf() - Returns the first index at which a given element can be found in the array.
  const index = array.indexOf(element);
  
  // 6. lastIndexOf() - Returns the last index at which a given element can be found in the array.
  const lastIndex = array.lastIndexOf(element);
  
  // 7. find() - Returns the first element in an array that satisfies a provided test.
  const foundElement = array.find(function(item) {
    return condition;
  });
  
  // 8. findIndex() - Returns the index of the first element in an array that satisfies a provided test.
  const foundIndex = array.findIndex(function(item) {
    return condition;
  });
  
  // 9. includes() - Checks if an array includes a particular element and returns true or false.
  const isIncluded = array.includes(element);
  