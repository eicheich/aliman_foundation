// This script adds components.js to all HTML files in the project
const fs = require('fs');
const path = require('path');

// Define the root directory
const rootDir = __dirname;

// Function to add components.js to an HTML file
function addComponentsScript(filePath) {
    // Read the file
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if components.js is already included
    if (content.includes('src="js/components.js"')) {
        console.log(`${filePath} already includes components.js`);
        return;
    }

    // Find the closing body tag
    const bodyCloseIndex = content.lastIndexOf('</body>');

    if (bodyCloseIndex !== -1) {
        // Insert the script tag before the closing body tag
        const updatedContent =
            content.slice(0, bodyCloseIndex) +
            '\n<script src="js/components.js"></script>\n' +
            content.slice(bodyCloseIndex);

        // Write the updated content back to the file
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Added components.js to ${filePath}`);
    } else {
        console.log(`Could not find </body> tag in ${filePath}`);
    }
}

// Function to process all HTML files in a directory
function processDirectory(dir) {
    const entries = fs.readdirSync(dir, {
        withFileTypes: true
    });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            // Skip the components directory
            if (entry.name !== 'components') {
                processDirectory(fullPath);
            }
        } else if (entry.name.endsWith('.html')) {
            addComponentsScript(fullPath);
        }
    }
}

// Start processing from the root directory
processDirectory(rootDir);
console.log('Script execution completed');
