// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get references to various DOM elements
    const mainTitle = document.getElementById('main-title');
    const description = document.getElementById('description');
    const colorBox = document.getElementById('color-box');
    const itemList = document.getElementById('item-list');
    
    // Text change button
    const changeTextBtn = document.getElementById('change-text');
    changeTextBtn.addEventListener('click', function() {
        // Change the main title text
        mainTitle.textContent = 'Text Changed Dynamically!';
        
        // Change the description text
        description.textContent = 'This text was updated using JavaScript at ' + new Date().toLocaleTimeString();
        
        // Change the text inside the color box
        colorBox.textContent = 'Text Updated!';
    });
    
    // Color change button
    const changeColorBtn = document.getElementById('change-color');
    changeColorBtn.addEventListener('click', function() {
        // Generate a random color
        const randomColor = getRandomColor();
        
        // Change the background color of the box
        colorBox.style.backgroundColor = randomColor;
        
        // Change the text to show the current color
        colorBox.textContent = randomColor;
        
        // Change text color for better contrast
        const brightness = calculateBrightness(randomColor);
        colorBox.style.color = brightness < 128 ? 'white' : 'black';
    });
    
    // Adding items
    let itemCount = 0;
    const addItemBtn = document.getElementById('add-item');
    addItemBtn.addEventListener('click', function() {
        // Clear the initial instruction text if it's the first item
        if (itemCount === 0) {
            itemList.innerHTML = '';
        }
        
        // Increment the item counter
        itemCount++;
        
        // Create a new item element
        const newItem = document.createElement('div');
        newItem.className = 'list-item';
        newItem.textContent = `Item ${itemCount} - Added at ${new Date().toLocaleTimeString()}`;
        
        // Add an event to the new item to highlight when clicked
        newItem.addEventListener('click', function() {
            // Toggle a highlighted class
            this.style.backgroundColor = this.style.backgroundColor === 'yellow' ? '#f8f8f8' : 'yellow';
        });
        
        // Add the new item to the list
        itemList.appendChild(newItem);
    });
    
    // Removing items
    const removeItemBtn = document.getElementById('remove-item');
    removeItemBtn.addEventListener('click', function() {
        // Check if there are items to remove
        const items = itemList.getElementsByClassName('list-item');
        if (items.length > 0) {
            // Remove the last item
            itemList.removeChild(items[items.length - 1]);
            itemCount--;
            
            // If all items are removed, show the instruction text again
            if (items.length === 0) {
                itemList.innerHTML = '<p>Item list will appear here when you add items.</p>';
                itemCount = 0;
            }
        }
    });
    
    // Helper function to generate a random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    // Helper function to calculate brightness of a color (for determining text color)
    function calculateBrightness(hexColor) {
        // Remove the # if present
        hexColor = hexColor.replace('#', '');
        
        // Convert to RGB
        const r = parseInt(hexColor.substr(0, 2), 16);
        const g = parseInt(hexColor.substr(2, 2), 16);
        const b = parseInt(hexColor.substr(4, 2), 16);
        
        // Calculate brightness using a common formula
        return (r * 299 + g * 587 + b * 114) / 1000;
    }
});