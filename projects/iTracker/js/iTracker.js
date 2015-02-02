// The MIT License (MIT)

// iTracker Reading App | Copyright (c) 2015 Menglin "Mark" Xu | mark@remarkablemark.org

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
    // Cache all the DOM elements
    var textareaNode = document.getElementsByTagName("textarea")[0];
    var formatButton = document.getElementsByClassName("format")[0];
    var textNode = document.getElementsByClassName("text")[0];
    var readButton = document.getElementsByClassName("read")[0];
    var pauseButton = document.getElementsByClassName("pause")[0];
    var resetButton = document.getElementsByClassName("reset")[0];
    var editableSection = document.getElementsByClassName("editable-section")[0];
    var formattedSection = document.getElementsByClassName("formatted-section")[0];
    var reformatButton = document.getElementsByClassName("reformat")[0];
    
    // Splits text based on pattern
    function splitText(text, pattern) {
        // Do not continue if text is invalid
        if (typeof text !== "string" && text) {
            return [];
        }
        // Split text based on pattern
        var splitText = text.split(pattern);
        // Return array if no instance of pattern was found
        if (splitText.length === 1) {
            return splitText;
        }
        // Clean if at least one instance of pattern was found
        for (var i = splitText.length - 1; i > -1; i--) {
            // Remove empty arrays
            if (!splitText[i]) {
                splitText.splice(i, 1);
            }
        }
        return splitText;
    }
    
    // Formats the text in the textarea when button is clicked
    formatButton.onclick = function() {
        var raw, paragraphs, words, output = [], i, j, n = 0;
        // Extract raw text from textarea
        raw = textareaNode.value;
        paragraphs = splitText(raw, "\n");
        // Iterate over the paragraphs
        for (i = 0; i < paragraphs.length; i++) {
            output[i] = [];
            words = splitText(paragraphs[i], " ");
            // Iterate over the words
            for (j = 0; j < words.length; j++) {
                output[i][j] = "<span class=" + n + ">" + words[j] + "</span>";
                n++;
            }
            // Join the words array
            output[i] = output[i].join(" ");
        }
        // Join the paragraphs array
        textNode.innerHTML = output.join("<br /><br />");
        // Show formatted section and hide editable section
        formattedSection.style.display = "block";
        editableSection.style.display = "none";
        return;
    };
    
    // Declare and initialize globals
    var spanNodes = [], index = 0, operation;
    
    // Executes the reading app's main operation
    readButton.onclick = function() {
        // Disable read button and enable pause button
        readButton.disabled = true;
        pauseButton.disabled = false;
        // Cache input values
        var delay = Number(document.getElementsByClassName("delay")[0].value);
        var chunk = Number(document.getElementsByClassName("chunk")[0].value);
        spanNodes = textNode.getElementsByTagName("span");
        // Clear any highlighted words before the current index
        for (var i = 0; i < index - chunk; i++) {
            spanNodes[i].className = "";
        }
        operation = setInterval(function() {
            // Ensure the unhighlighted words are within range
            for (var i = 0; i < chunk; i++) {
                if (index - i - 1 >= 0) {
                    spanNodes[index - i - 1].className = "";
                }
            }
            // Ensure the highlighted words are within range
            for (var i = 0; i < chunk; i++) {
                if (index + i < spanNodes.length) {
                    spanNodes[index + i].className = "active";
                }
                // If beyond scope, clear the timed interval operation
                else {
                    clearInterval(operation);
                }
            }
            index += chunk;
            return;
        }, delay);
        return;
    };
    
    // Pauses the reading app
    pauseButton.onclick = function() {
        // Disable pause button and enable read button
        readButton.disabled = false;
        pauseButton.disabled = true;
        clearInterval(operation);
        return;
    };
    
    // Resets the reading app
    resetButton.onclick = function() {
        // Enable both read button and pause button
        readButton.disabled = false;
        pauseButton.disabled = false;
        // Clear any operation
        clearInterval(operation);
        if (typeof spanNodes === "object") {
            for (var i = 0; i < spanNodes.length; i++) {
                spanNodes[i].className = "";
            }
        }
        index = 0;
        return;
    };
    
    // Allow the text to be editable again
    reformatButton.onclick = function() {
        // Show editable section and hide formatted section
        editableSection.style.display = "block";
        formattedSection.style.display = "none";
        return;
    };
})();