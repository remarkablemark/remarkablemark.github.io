// The MIT License (MIT)

// VisualNarrator.js | Copyright (c) 2015 Menglin "Mark" Xu | mark@remarkablemark.org

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

(function(){
    // Regular expressions for html tags
    var htmlTags = /<\/?([a-zA-Z]+[0-9]*?)>/i;
    var longestTag = "</blockquote>";
    // Regular expressions for html entities
    var htmlEntities = /&.+;/;
    
    // Checks if a tag name is valid html
    function isHTMLTag(tagName) {
        var el = document.createElement(tagName);
        return el.constructor.name !== "HTMLUnknownElement";
    }
    
    // Prints a message to container letter-by-letter
    function visualNarrator() {
        // Return error if function parameters are invalid
        if (!arguments.length || typeof arguments !== "object") {
            console.log("Error: function argument is invalid or not found");
            return;
        }
        
        // Cache and initialize all parameters
        var message = arguments[0].message;
        var container = arguments[0].container;
        var elements = arguments[0].elements || [];
        // Default display delay is 50 milliseconds
        var delay = arguments[0].delay || 50;
        var callback = arguments[0].callback;
        
        // Return error if message or container is invalid
        if (typeof message !== "string") {
            console.log("Error: message is either invalid or not found");
            return false;
        }
        if (typeof container !== "object") {
            console.log("Error: container is either invalid or not found");
            return false;
        }
        
        // If message is empty
        if (!message.length) {
            // Execute callback if it exists
            if (typeof callback === "function") {
                callback();
            }
            // Otherwise end the recursion
            else {
                return;
            }
        }
        
        // Display after delay
        setTimeout(function() {
            // Retrieve the first letter of message
            var letter = message.substring(0, 1);
            // Slice the beginning of the message
            var messagePart = message.substring(0, longestTag.length);
            // Find matches based on regular expressions
            var foundTags = messagePart.match(htmlTags) || [];
            var foundEntities = messagePart.match(htmlEntities) || [];
            // Set the node to either the element or the container
            var node = (elements.length > 0) ? elements[elements.length - 1] : container;
            
            // If tag is found in beginning of string
            if (letter === "<" && foundTags.length) {
                // If tag is valid html
                if (isHTMLTag(foundTags[1])) {
                    // Left trim tag from message string
                    message = message.substring(message.indexOf(">") + 1);
                    // If the tag is a closing tag
                    if (foundTags[1].toLowerCase() === node.tagName.toLowerCase()) {
                        // Remove the last element in elements array
                        elements.pop(1);
                    }
                    // If tag is an opening tag, then create and append the new element within the current node
                    else {
                        var childElement = document.createElement(foundTags[1]);
                        node.appendChild(childElement);
                        // Add element to the elements array
                        elements.push(childElement);
                    }
                }
                // If tag is not valid html
                else {
                    // Check if it is a special delay tag
                    if (foundTags[1] === "delay") {
                        // Extract and format the number in between the tags
                        var specialDelay = Number(message.substring(0, message.indexOf("</delay>") + "</delay>".length).match("<delay>(.*)</delay>")[1]);
                        // Use default delay time if not a number
                        specialDelay = specialDelay || delay;
                        // Trim out the delay tag from the message string
                        message = message.substring(message.indexOf("</delay") + "</delay>".length);
                        // Execute special delay function
                        return setTimeout(function() {
                            visualNarrator({
                                message: message,
                                container: container,
                                delay: delay,
                                elements: elements,
                                callback: callback
                            });
                        }, specialDelay);
                    }
                }
            }
            // If html entity is found in the beginning of the string
            else if (letter === "&" && foundEntities.length) {
                // Update display output and trim the entity from the message string
                letter = foundEntities[0];
                message = message.substring(letter.length);
                // Display letter within current node
                node.innerHTML += letter;
            }
            // If the tag is not found in the beginning of the string
            else {
                // Display letter within current node
                node.innerHTML += letter;
                // Remove the first letter from the message
                message = message.substring(1);
            }
            
            // Continue the recursion synchronously
            visualNarrator({
                message: message,
                container: container,
                delay: delay,
                elements: elements,
                callback: callback
            });
        }, delay);
    }
    
    window.visualNarrator = visualNarrator;
})();