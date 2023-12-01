try {
    const item = '{"name: "foo", "Age": 15}';
    const json = JSON.parse(item);
} catch (err) {
    console.log(err.name);
    console.log(err.message);
}   

