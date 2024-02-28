// Lesson 05.08 - Word Frequency Map for a Word Cloud - PROG

// A Word Cloud is a visual representation of the frequency of words in a string, 
// such as found in a blog post or other article; in a word cloud, the most frequently 
// occurring words appear in the largest font size. In order to do this, the frequency of words 
// must be known. Therefore, before we can make a Word Cloud, we have to make what is called 
// a Word Frequency Map from of the words. This takes the form of an Object, where the keys
// are unique keywords and the value of each key is the number of times the word occurs.
// To make the Word Frequency Map, we have to convert the text to an array, with each item
// a word. Then we loop through the array of words. every time a unique word is found, 
// the object is assigned that word as a new key with an initial value of 1.
// the next time the word is encounterd, no new key is made, but rather the value of the 
// existing key is incremented by 1
// the resulting Word Frequency Map can then be used to make a Word Cloud by setting the font 
// size of each word based on the frequency, with most frequent words biggest
// also, since a Word Cloud only contains interesting, important keywords, there needs to be 
// a filter that prevents what are known as stopwords from being included in the Word
// Frequency Map. Stopwords include such common words as 'the', 'and', 'of', 'on', 'with', etc.

// let stopwords = ["the", "and", etc.]; 
// for making Word Freq Map with no stopwords filtering
// declare the function:
function makeWordCloud(str, minFreq=5, cloudElem="word-cloud") {
   
    // CLEAN STRING: make all lowercase, remove extra spaces, remove punctuation
    // Regex Expression to replace all punctuation, extra whitespace, all digits and all special characters
    // all that toLowerCase(), so that "Treehouse" and "treehouse" are not counted as individual words
    str = str.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").replace(/[0-9]/g, '').toLowerCase(); 
    const wordsArr = str.split(" "); // make array of words, split on space " "
    const wordFreqObj = {}; // new object to store word frequency key-value pairs

    for(word of wordsArr) { // loop the array of words
        
        if(!STOPWORDS.includes(word)) { // if word is NOT a stopword, like 'and' or 'the'
            if(wordFreqObj[word]) { // if there is not already a key for this word
                wordFreqObj[word]++; // increment the value of the key by 1
            } else { // else the key does NOT yet exist
                // make a key for this word, with initial value of 1 
                wordFreqObj[word] = 1; 
            } // end inner if-else
        } // end outer if
    } // end for loop

    console.log('wordFreqObj:', wordFreqObj);

    const min5FreqObj = {}; // a new object to store only keys w min frequency

    // loop the object, key by key:
    for(key in wordFreqObj) {
        // if the current key value is greater than or equal to the min frequency
        if(wordFreqObj[key] >= 5) {
            min5FreqObj[key] = wordFreqObj[key]; // save that key-value to new obj
        }
    }

    console.log('min5FreqObj:', min5FreqObj);

    // output the word cloud to the DOM
    const cloudElement = document.getElementById(cloudElem);

    for(keyword in min5FreqObj) {

        // each word cloud word (keyword) gets its own div
        const divvy = document.createElement('div');

        // colors to assign to the keyword text, based on font size, which is based on word frequency:
        const colors = ["white", "tan", "pink", "yellow", "orange", "aqua","forestgreen", "yellowgreen",  "cornflowerblue", "lime"];

        // outut the keyword to its divvy
        divvy.textContent = keyword;

        // get the value of the keyword -- how many times the word occurs in the passage
        let freq =  min5FreqObj[keyword];

        // calculate the size as 3x the frequency, so if the word occurs 10 times, font size is 30px
        let fontSz = freq * 3;

        // set the font size of the word
        divvy.style.fontSize = fontSz + 'px';

        // a string to store the color to use for the word
        let colr = "";

        // big if-else if-else to set each word color to one of 10 colors, based on font size:
        if(fontSz < 16) { // smallest size
            colr = colors[0];
        } else if(fontSz < 21) {
            colr = colors[1];
        } else if(fontSz < 27) {
            colr = colors[2];
        } else if(fontSz < 33) {
            colr = colors[3];
        } else if(fontSz < 39) {
            colr =colors[4];
        } else if(fontSz < 48) {
            colr = colors[5];
        } else if(fontSz < 54) {
            colr = colors[6];
        } else if(fontSz < 60) {
            colr = colors[7];
        } else if(fontSz < 70) {
            colr = colors[8];
        } else { // biggest font size
            colr = colors[9];
        }

        // set the color of the word based on its font size
        divvy.style.color = colr;


        // calculate a random rotation within limited range:
        let r = ~~(Math.random() * 11); // 0-10
        if(Math.random() - 0.5 < 0) {
            r = -r; // make r negative half the time
        }

        // apply the rotation in range of -10 to +10
        divvy.style.transform = `rotate(${r}deg)`;
        
        // output the divvy to the word cloud DOM element
        cloudElement.appendChild(divvy);
    }
    
    // return wordFreqObj; // return the wordFreqObj, which is our result
    return min5FreqObj; // return objMin5x which only has keywords of 5+ occurrences

} // end function 

// call function, passing in Chinese Fairy Tale and specifying min 5 occurrences
// let fairyTaleWordFreqObj = makeWordCloud(chineseFairyTale, 5, "word-cloud");
// console.log('fairyTaleWordFreqObj:', fairyTaleWordFreqObj);

// call function, passing in Treehouse and specifying min 7 occurrences

let treehouseWordFreqObj = makeWordCloud(treehouse, 5, "word-cloud");
console.log('treehouseWordFreqObj:', treehouseWordFreqObj);

// or use fancy RegEx move to strip all non-alphanumeric characters
// RegEx gibberish decoded:
// \w is any digit, letter, or underscore.
// \s is any whitespace.
// [^\w\s] is anything that's not a digit, letter, whitespace, or underscore.
// [^\w\s]|_ is the same as #3 except with the underscores added back in.
// [0-9] is all digits
// /g is globally replace (everywhere)
// str = str.trim(); // get rid of any extra whitespace that still may remain

// instead of a lot of replaceAll:
// str = str.replaceAll(",", "").replaceAll(".", "").replaceAll(";", "").replaceAll(":", "").replaceAll("?", "").replaceAll("!", "").replaceAll("*", "");
// str = str.replaceAll("-", "").replaceAll("'", "").replaceAll('"', "").replaceAll("&", "").replaceAll("#", "").replaceAll("(", "").replaceAll("$", "");
// str = str.replaceAll(")", "").replaceAll("[", "").replaceAll("]", "").replaceAll("/", "").replaceAll("+", "").replaceAll("=", "").replaceAll("@", "");
    