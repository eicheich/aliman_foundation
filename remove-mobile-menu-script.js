// This script removes the mobile menu JavaScript code from all HTML files
const fs = require('fs');
const path = require('path');

// Define the root directory
const rootDir = __dirname;

// Function to remove mobile menu script from an HTML file
function removeMobileMenuScript(filePath) {
    // Read the file
    let content = fs.readFileSync(filePath, 'utf8');

    // Define the pattern to match the mobile menu script section
    const scriptPattern = /\/\/ Mobile Menu Toggle[\s\S]*?mobileNavMenu\.classList\.contains\("active"\)\s*\)\s*{[\s\S]*?}\s*}\);/;

    // Check if the pattern exists in the file
    if (scriptPattern.test(content)) {
        // Remove the script section
        const updatedContent = content.replace(scriptPattern, '// Mobile menu functionality moved to components.js');

        // Write the updated content back to the file
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Removed mobile menu script from ${filePath}`);
    } else {
        console.log(`Could not find mobile menu script in ${filePath}`);
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
            removeMobileMenuScript(fullPath);
        }
    }
}

// Start processing from the root directory
processDirectory(rootDir);
console.log('Script execution completed');
