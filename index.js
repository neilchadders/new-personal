
function setupTypewriter(t) { // t = html element 
    const HTML = t.innerHTML;

    t.innerHTML = ""; // initialise t to empty string

    let cursorPosition = 0, // current position of cursor ie index of HTML string
        tag = "", // stores HTMl tag
        writingTag = false, // Keep check if current character is part of html tag
        tagOpen = false, // Is current tag open?
        typeSpeed = 0, // speed in ms
        tempTypeSpeed = 0;

    const type = function () {

        if (writingTag === true) {
            tag += HTML[cursorPosition]; //checks if the current character is part of an HTML tag, if so, it adds the character to the tag variable
        }

        if (HTML[cursorPosition] === "<") { // If the character is a < symbol, type() checks whether the tag is being opened or closed, and sets the tagOpen and writingTag variables. If tag is not being written but is still open, type() appends the current character to the tag's innerHTML.
            tempTypeSpeed = 0;
            if (tagOpen) {
                tagOpen = false;
                writingTag = true;
            } else {
                tag = "";
                tagOpen = true;
                writingTag = true;
                tag += HTML[cursorPosition];
            }
        }
        if (!writingTag && tagOpen) {
            tag.innerHTML += HTML[cursorPosition];
        }
        if (!writingTag && !tagOpen) {
            if (HTML[cursorPosition] === " ") {
                tempTypeSpeed = 0;
            }
            else {
                tempTypeSpeed = (Math.random() * typeSpeed) + 50;
            }
            t.innerHTML += HTML[cursorPosition];
        }
        if (writingTag === true && HTML[cursorPosition] === ">") { // creates new span element ifclosing tag
            tempTypeSpeed = (Math.random() * typeSpeed) + 50;
            writingTag = false;
            if (tagOpen) {
                var newSpan = document.createElement("span");
                t.appendChild(newSpan);
                newSpan.innerHTML = tag;
                tag = newSpan.firstChild;
            }
        }

        cursorPosition += 1; //increments cursor position
        if (cursorPosition < HTML.length - 1) {
            setTimeout(type, tempTypeSpeed);
        }

    };

    return {
        type: type
    };
}

var typer = document.getElementById('typewriter');

typewriter = setupTypewriter(typewriter);

typewriter.type();






