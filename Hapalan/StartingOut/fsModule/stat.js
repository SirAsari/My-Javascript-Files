const fs = require('fs')

let filePath = 'storage.js';
    
fs.stat(filePath, (err, stats) => {
    if (err) {
        console.error('Error getting file stats:', err);
        return;
    }

    // Accessing different properties of the file stats
    console.log('File size:', stats.size); // Size of the file in bytes
    console.log('Is it a file?', stats.isFile()); // Boolean indicating if it's a file
    console.log('Is it a directory?', stats.isDirectory()); // Boolean indicating if it's a directory
    console.log('File permissions:', stats.mode); // Permissions of the file
    console.log('Last modified:', stats.mtime); // Last modified timestamp
    console.log('Last accessed:', stats.atime); // Last accessed timestamp
});