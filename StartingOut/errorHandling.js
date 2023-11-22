// custom error handling using specific instance
// There are 7 types of JavaScript errors:
// Syntax error, Reference Error, Type Error, Evaluation Error, RangeError, URI Error and Internal Error. 

try {
    const fileName = 'myfile.txt';
    const fileContents = fs.readFileSync(fileName);
    console.log(fileContents);
  } catch (error) {
    if (error instanceof FileNotFoundError) {
      console.error(`Error: ${error.message}`);
    } else {
      throw error; // Rethrow other errors
    }
}

try {
    const item = '{"name: "foo", "Age": 15}';
    const json = JSON.parse(item);
} catch (err) {
    console.log(err.name);
    console.log(err.message);
}   

try {

} catch {

}