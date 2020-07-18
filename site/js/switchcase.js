/* Assign source_div with textarea id name if you haven't already */


/* Function To Get .value From A Div ID */
function getDivValue(div) {
    return document.getElementById(div).value;
}

/* Function To Set .value In A Div ID */
function setDivValue(div, text) {
    return (document.getElementById(div).value = text);
}

/* Original Content */
revision_history = [];
revision_length = 0;

/*Finds Unique From Array https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates*/
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function switchLabel(){
    if (document.getElementById(source_div).value.trim().length > 0) {
    document.getElementById("descriptionlabel").innerText = "Hit The Copy Button When You're Ready! 🎨";
    }
    else{
        switchLabelReset();
    }
}

function switchLabelReset(){
    randomNumber = Math.floor((Math.random() * 3));
        if (randomNumber == 0) {
            document.getElementById("descriptionlabel").innerText = "Type Some Text In The Box Below! 🙂";
        }
        else if (randomNumber == 1){
            document.getElementById("descriptionlabel").innerText = "Give it a try! 👇";
        }
        
        else{
            document.getElementById("descriptionlabel").innerText = "The Text Box Below Is Empty. 🤷‍♀️ Why Not Enter Something In Before You Hit the Button? 🤔";
        }
}

/* Copy Button */
function copyButtonClear() {
    document.getElementById(source_div).classList.remove("has-text-weight-semibold");
    document.getElementById("copy-button").setAttribute("data-tooltip", "Copy");
    document.getElementById("copy-button").setAttribute("class", "button is-link");
    document.getElementById("descriptionlabel").innerText = "Give it a try! 👇";
    document.getElementById("copy-button").innerText = "Copy";
    document.getElementById(source_div).classList.remove("is-success")
    document.getElementById(source_div).classList.remove("is-info");
}
function copyButton() {
    /* Get the text field */
    var copyText = document.getElementById(source_div);
    if (copyText.value.trim().length > 0) {
        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /*For mobile devices*/
        /* Copy the text inside the text field */
        document.execCommand("copy");
        /* Alert the copied text */
        document.getElementById("copy-button").setAttribute("data-tooltip", "Copied");
        document.getElementById("copy-button").setAttribute("class", "button is-link is-success");
        document.getElementById("copy-button").innerText = "Copied";
        document.getElementById("descriptionlabel").innerText = "Text Copied ✔";
        document.getElementById(source_div).classList.add("is-success")
        document.getElementById(source_div).classList.remove("is-info");
    }
    else{
     
        switchLabelReset()
        
       
    }
} 

/* Adds Reset */
function addReset(text) {
    document.getElementById("belowbanner").scrollIntoView();
    document.getElementById(source_div).classList.remove("is-success")
    document.getElementById(source_div).classList.add("is-info");
    if (text.trim().length > 0) {
        document.getElementById(source_div).classList.add("has-text-weight-semibold");
        document.getElementById("reset").removeAttribute("disabled");
        document.getElementById("reseticon").removeAttribute("style");
        revision_history.push(text);
        revision_history = revision_history.filter(onlyUnique);
        revision_length = revision_history.length;
    }
}

/* Reset Button Event Listener */
document.getElementById("notification").addEventListener("click", function () {
    document.getElementById("notification").setAttribute("style", "display:none;");

});

// Reset Button Event Listener
document.getElementById("reset").addEventListener("click", function () {
    copyButtonClear();
switchLabel();
    setDivValue(source_div, revision_history[revision_length - 1]);
    revision_length = revision_length - 1;
    if (revision_length <= 0) {
        document.getElementById("reset").disabled = true;
        document.getElementById("reseticon").setAttribute("style","display:none;");
        revision_history = [];
        revision_length = 0;
    }
});

/* Convert Text To Upper Case (UC) */
document.getElementById("uc").addEventListener("click", function () {
    copyButtonClear();
switchLabel();
    addReset(getDivValue(source_div));
    setDivValue(source_div, getDivValue(source_div).toUpperCase());
});

/* Convert Text To Lower Case (LC) */
document.getElementById("lc").addEventListener("click", function () {
    copyButtonClear();
switchLabel();
    addReset(getDivValue(source_div));
    setDivValue(source_div, getDivValue(source_div).toLowerCase());
});

/* First Letter Capitalization (FLC) Of Text, Don't Change Case Of Other Characters */
document.getElementById("flc").addEventListener("click", function () {
    copyButtonClear();
switchLabel();
    addReset(getDivValue(source_div));
    text = getDivValue(source_div).split(".");
    formattedList = [];
    for (i = 0; i < text.length; i++) {

        formattedList.push(text[i].replace(text[i].trim().charAt(0), text[i].trim().charAt(0).toUpperCase()));
    }
    textFormatted = formattedList.join(".");
    setDivValue(source_div, textFormatted);
});

/* Convert Text To Sentence Case ("SC"), Lowercase everything that isn't first character. This was tricky! */
document.getElementById("sc").addEventListener("click", function () {
    copyButtonClear();
    switchLabel();
    addReset(getDivValue(source_div));
    text = getDivValue(source_div).split("\n"); // the usual, split into lines.
    formattedList = [];
    for (i = 0; i < text.length; i++) { 
        sentenceSplit = text[i].split(/(?=\.|\?|\!|\:|\;)/) //split each line based on sentence marks. (!,?,:,;)
        sentenceFormatted = []
        for (j = 0; j < sentenceSplit.length; j++){
        
            sentenceSplit[j] = sentenceSplit[j].toLowerCase(); // transform entire string to lowercase
            
            if (/[a-z]/i.exec(sentenceSplit[j]) !== null){ // If the sentence has a valid alphabet, find it's index, else return skip to next sentence in loop
            index =  /[a-z]/i.exec(sentenceSplit[j]).index; 
            //Push sentence to SentenceFormatted array
            sentenceFormatted.push(sentenceSplit[j].replace(sentenceSplit[j].charAt(index), sentenceSplit[j].charAt(index).toUpperCase().trim()));
        }

        }
       formattedList.push(sentenceFormatted.join(""));
        
    }
    // put everything together, but add line breaks back
    textFormatted = formattedList.join("\n");
    setDivValue(source_div, textFormatted);
});

/* Capital Case ("CC") Conversion. */
document.getElementById("cc").addEventListener("click", function () {
    copyButtonClear();
switchLabel();
    addReset(getDivValue(source_div));
    wordList = getDivValue(source_div).split(" ");
    formattedWordList = [];
    for (i = 0; i < wordList.length; i++) {
        wordList[i] = wordList[i].toLowerCase();
        formattedWordList.push(wordList[i].replace(wordList[i].trim().charAt(0), wordList[i].trim().charAt(0).toUpperCase()));
    }
    textFormatted = formattedWordList.join(" ");
    setDivValue(source_div, textFormatted);
});

/* Remove Extra Space ("RES"). */
document.getElementById("res").addEventListener("click", function () {
    copyButtonClear();
switchLabel();
    addReset(getDivValue(source_div));
    text = getDivValue(source_div).split("\n");
    formattedList = [];
    for (i = 0; i < text.length; i++) {
        formattedList.push(text[i].trim().replace(/\s+/g, " "));
    }
    textFormatted = formattedList.join("\n");
    setDivValue(source_div, textFormatted);
});

/* Remove Line Break ("RLB"). */
document.getElementById("rlb").addEventListener("click", function () {
    copyButtonClear();
switchLabel();
    addReset(getDivValue(source_div));
    text = getDivValue(source_div).split("\n");
    formattedList = [];
    for (i = 0; i < text.length; i++) {
        logic = text[i].trim().charAt(text[i].trim().length-1).match(/^[.,:!?]/);
        if(logic && logic.length > 0 ){
            formattedList.push(text[i].trim()+" ");
        }
        else if (text[i].length > 0){
            formattedList.push(text[i].trim().replace(/\n/g, " ")+". ");
        }
    }
    textFormatted = formattedList.join("");
    setDivValue(source_div, textFormatted);
});

/* Remove Line Break ("RLB"). */
document.getElementById("rmlb").addEventListener("click", function () {
    copyButtonClear();
switchLabel();
    addReset(getDivValue(source_div));
    text = getDivValue(source_div).replace(/(\r\n|\r|\n){2,}/g, '$1\n');
    setDivValue(source_div, text);
});

/* Huge Thanks To The Folks In https://gist.GitHub.com/mathewbyrne/1280286 For Helping With This!*/
function slugify(text, separator) {
    copyButtonClear();
switchLabel();
    addReset(getDivValue(source_div));
    text = text.toString().toLowerCase().trim();
    const sets = [
        { to: 'a', from: '[ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶ]' },
        { to: 'c', from: '[ÇĆĈČ]' },
        { to: 'd', from: '[ÐĎĐÞ]' },
        { to: 'e', from: '[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆ]' },
        { to: 'g', from: '[ĜĞĢǴ]' },
        { to: 'h', from: '[ĤḦ]' },
        { to: 'i', from: '[ÌÍÎÏĨĪĮİỈỊ]' },
        { to: 'j', from: '[Ĵ]' },
        { to: 'ij', from: '[Ĳ]' },
        { to: 'k', from: '[Ķ]' },
        { to: 'l', from: '[ĹĻĽŁ]' },
        { to: 'm', from: '[Ḿ]' },
        { to: 'n', from: '[ÑŃŅŇ]' },
        { to: 'o', from: '[ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠ]' },
        { to: 'oe', from: '[Œ]' },
        { to: 'p', from: '[ṕ]' },
        { to: 'r', from: '[ŔŖŘ]' },
        { to: 's', from: '[ßŚŜŞŠ]' },
        { to: 't', from: '[ŢŤ]' },
        { to: 'u', from: '[ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯ]' },
        { to: 'w', from: '[ẂŴẀẄ]' },
        { to: 'x', from: '[ẍ]' },
        { to: 'y', from: '[ÝŶŸỲỴỶỸ]' },
        { to: 'z', from: '[ŹŻŽ]' },
        { to: '-', from: '[·/_,:;\']' }
    ];
    sets.forEach(set => {
        text = text.replace(new RegExp(set.from, 'gi'), set.to);
    });
    text = text.toString().toLowerCase()
        .replace(/\s+/g, '-')         // Replace spaces with -
        .replace(/&/g, '-and-')       // Replace & with 'and'
        .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
        .replace(/\--+/g, '-')        // Replace multiple - with single -
        .replace(/^-+/, '')           // Trim - from start of text
        .replace(/-+$/, '');          // Trim - from end of text

    if ((typeof separator !== 'undefined') && (separator !== '-')) {
        text = text.replace(/-/g, separator);
    }
    return text;
}

/* Sluggify Text ("ST") Conversion. */
document.getElementById("st").addEventListener("click", function () {
    copyButtonClear();
switchLabel();
    addReset(getDivValue(source_div));
    text = getDivValue(source_div).split("\n");
    formattedList = [];
    for (i = 0; i < text.length; i++) {
        text[i] = text[i].toLowerCase();
        formattedList.push(slugify(text[i], "-"));
    }
    textFormatted = formattedList.join("\n");
    setDivValue(source_div, textFormatted);
});

/* URL Escape ("UE") Sentence. */
document.getElementById("ue").addEventListener("click", function () {
    copyButtonClear();
switchLabel();
    addReset(getDivValue(source_div));
    text = getDivValue(source_div).split("\n");
    formattedList = [];
    for (i = 0; i < text.length; i++) {
        text[i] = text[i].toLowerCase();
        formattedList.push(escape(text[i]));
    }
    textFormatted = formattedList.join("\n");
    setDivValue(source_div, textFormatted);
});

/* Convert To Random Case ("RC"). */
document.getElementById("rc").addEventListener("click", function () {
    copyButtonClear();
switchLabel();
    addReset(getDivValue(source_div));
    text = getDivValue(source_div);
    formattedText = "";
    for (i = 0; i < text.length; i++) {
        randomNumber = Math.floor((Math.random() * 2));
        if (randomNumber == 0) {
            formattedText = formattedText + text[i].toLowerCase();
        }
        else {
            formattedText = formattedText + text[i].toUpperCase();
        }
    }
    setDivValue(source_div, formattedText);

});

/* Alternate Case Conversion ("AC") */
document.getElementById("ac").addEventListener("click", function () {
    copyButtonClear();
switchLabel();
    addReset(getDivValue(source_div));
    var chars = getDivValue(source_div).toLowerCase().split("");
    if(caseType == 0){
        for (var i = 0; i < chars.length; i += 2) {
            chars[i] = chars[i].toUpperCase();
            document.getElementById("ac").innerText="AlTeRnAtE CaSe";
          }
        caseType = 1;}
    else{
        for (var i = 1; i < chars.length; i += 2) {
            chars[i] = chars[i].toUpperCase();
            document.getElementById("ac").innerText="aLtErNaTe cAsE";
          }
        caseType = 0; }
    setDivValue(source_div, chars.join(""));


});


caseType = 0; /* 0 = Lower Case First Letter, 1 = Upper Case First Letter */

/* Convert Invalid Text To Normal (UC) */
document.getElementById("ri").addEventListener("click", function () {
    copyButtonClear();
switchLabel();
    addReset(getDivValue(source_div));
    setDivValue(source_div, getDivValue(source_div).replace(/\uFFFD/g, ''));

});
