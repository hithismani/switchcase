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
    document.getElementById("descriptionlabel").innerText = "✅ Done! Hit The Copy Button When You're Ready!";
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
    //document.getElementById(source_div).classList.remove("has-text-weight-semibold");
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
        //document.getElementById(source_div).classList.add("has-text-weight-semibold");
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

/* For Instagram: BOLD ("fi-bold"). */

/* Replacements */
var fi_switch = [
    {
      "plain": "a",
      "bold": "𝐚",
      "script": "𝒶",
      "script_bold": "𝓪",
      "monospaced": "𝚊"
    },
    {
      "plain": "b",
      "bold": "𝐛",
      "script": "𝒷",
      "script_bold": "𝓫",
      "monospaced": "𝚋"
    },
    {
      "plain": "c",
      "bold": "𝐜",
      "script": "𝒸",
      "script_bold": "𝓬",
      "monospaced": "𝚌"
    },
    {
      "plain": "d",
      "bold": "𝐝",
      "script": "𝒹",
      "script_bold": "𝓭",
      "monospaced": "𝚍"
    },
    {
      "plain": "e",
      "bold": "𝐞",
      "script": "ℯ",
      "script_bold": "𝓮",
      "monospaced": "𝚎"
    },
    {
      "plain": "f",
      "bold": "𝐟",
      "script": "𝒻",
      "script_bold": "𝓯",
      "monospaced": "𝚏"
    },
    {
      "plain": "g",
      "bold": "𝐠",
      "script": "ℊ",
      "script_bold": "𝓰",
      "monospaced": "𝚐"
    },
    {
      "plain": "h",
      "bold": "𝐡",
      "script": "𝒽",
      "script_bold": "𝓱",
      "monospaced": "𝚑"
    },
    {
      "plain": "i",
      "bold": "𝐢",
      "script": "𝒾",
      "script_bold": "𝓲",
      "monospaced": "𝚒"
    },
    {
      "plain": "j",
      "bold": "𝐣",
      "script": "𝒿",
      "script_bold": "𝓳",
      "monospaced": "𝚓"
    },
    {
      "plain": "k",
      "bold": "𝐤",
      "script": "𝓀",
      "script_bold": "𝓴",
      "monospaced": "𝚔"
    },
    {
      "plain": "l",
      "bold": "𝐥",
      "script": "𝓁",
      "script_bold": "𝓵",
      "monospaced": "𝚕"
    },
    {
      "plain": "m",
      "bold": "𝐦",
      "script": "𝓂",
      "script_bold": "𝓶",
      "monospaced": "𝚖"
    },
    {
      "plain": "n",
      "bold": "𝐧",
      "script": "𝓃",
      "script_bold": "𝓷",
      "monospaced": "𝚗"
    },
    {
      "plain": "o",
      "bold": "𝐨",
      "script": "ℴ",
      "script_bold": "𝓸",
      "monospaced": "𝚘"
    },
    {
      "plain": "p",
      "bold": "𝐩",
      "script": "𝓅",
      "script_bold": "𝓹",
      "monospaced": "𝚙"
    },
    {
      "plain": "q",
      "bold": "𝐪",
      "script": "𝓆",
      "script_bold": "𝓺",
      "monospaced": "𝚚"
    },
    {
      "plain": "r",
      "bold": "𝐫",
      "script": "𝓇",
      "script_bold": "𝓻",
      "monospaced": "𝚛"
    },
    {
      "plain": "s",
      "bold": "𝐬",
      "script": "𝓈",
      "script_bold": "𝓼",
      "monospaced": "𝚜"
    },
    {
      "plain": "t",
      "bold": "𝐭",
      "script": "𝓉",
      "script_bold": "𝓽",
      "monospaced": "𝚝"
    },
    {
      "plain": "u",
      "bold": "𝐮",
      "script": "𝓊",
      "script_bold": "𝓾",
      "monospaced": "𝚞"
    },
    {
      "plain": "v",
      "bold": "𝐯",
      "script": "𝓋",
      "script_bold": "𝓿",
      "monospaced": "𝚟"
    },
    {
      "plain": "w",
      "bold": "𝐰",
      "script": "𝓌",
      "script_bold": "𝔀",
      "monospaced": "𝚠"
    },
    {
      "plain": "x",
      "bold": "𝐱",
      "script": "𝓍",
      "script_bold": "𝔁",
      "monospaced": "𝚡"
    },
    {
      "plain": "y",
      "bold": "𝐲",
      "script": "𝓎",
      "script_bold": "𝔂",
      "monospaced": "𝚢"
    },
    {
      "plain": "z",
      "bold": "𝐳",
      "script": "𝓏",
      "script_bold": "𝔃",
      "monospaced": "𝚣"
    },
    {
      "plain": "A",
      "bold": "𝐀",
      "script": "𝒜",
      "script_bold": "𝓐",
      "monospaced": "𝙰"
    },
    {
      "plain": "B",
      "bold": "𝐁",
      "script": "ℬ",
      "script_bold": "𝓑",
      "monospaced": "𝙱"
    },
    {
      "plain": "C",
      "bold": "𝐂",
      "script": "𝒞",
      "script_bold": "𝓒",
      "monospaced": "𝙲"
    },
    {
      "plain": "D",
      "bold": "𝐃",
      "script": "𝒟",
      "script_bold": "𝓓",
      "monospaced": "𝙳"
    },
    {
      "plain": "E",
      "bold": "𝐄",
      "script": "ℰ",
      "script_bold": "𝓔",
      "monospaced": "𝙴"
    },
    {
      "plain": "F",
      "bold": "𝐅",
      "script": "ℱ",
      "script_bold": "𝓕",
      "monospaced": "𝙵"
    },
    {
      "plain": "G",
      "bold": "𝐆",
      "script": "𝒢",
      "script_bold": "𝓖",
      "monospaced": "𝙶"
    },
    {
      "plain": "H",
      "bold": "𝐇",
      "script": "ℋ",
      "script_bold": "𝓗",
      "monospaced": "𝙷"
    },
    {
      "plain": "I",
      "bold": "𝐈",
      "script": "ℐ",
      "script_bold": "𝓘",
      "monospaced": "𝙸"
    },
    {
      "plain": "J",
      "bold": "𝐉",
      "script": "𝒥",
      "script_bold": "𝓙",
      "monospaced": "𝙹"
    },
    {
      "plain": "K",
      "bold": "𝐊",
      "script": "𝒦",
      "script_bold": "𝓚",
      "monospaced": "𝙺"
    },
    {
      "plain": "L",
      "bold": "𝐋",
      "script": "ℒ",
      "script_bold": "𝓛",
      "monospaced": "𝙻"
    },
    {
      "plain": "M",
      "bold": "𝐌",
      "script": "ℳ",
      "script_bold": "𝓜",
      "monospaced": "𝙼"
    },
    {
      "plain": "N",
      "bold": "𝐍",
      "script": "𝒩",
      "script_bold": "𝓝",
      "monospaced": "𝙽"
    },
    {
      "plain": "O",
      "bold": "𝐎",
      "script": "𝒪",
      "script_bold": "𝓞",
      "monospaced": "𝙾"
    },
    {
      "plain": "P",
      "bold": "𝐏",
      "script": "𝒫",
      "script_bold": "𝓟",
      "monospaced": "𝙿"
    },
    {
      "plain": "Q",
      "bold": "𝐐",
      "script": "𝒬",
      "script_bold": "𝓠",
      "monospaced": "𝚀"
    },
    {
      "plain": "R",
      "bold": "𝐑",
      "script": "ℛ",
      "script_bold": "𝓡",
      "monospaced": "𝚁"
    },
    {
      "plain": "S",
      "bold": "𝐒",
      "script": "𝒮",
      "script_bold": "𝓢",
      "monospaced": "𝚂"
    },
    {
      "plain": "T",
      "bold": "𝐓",
      "script": "𝒯",
      "script_bold": "𝓣",
      "monospaced": "𝚃"
    },
    {
      "plain": "U",
      "bold": "𝐔",
      "script": "𝒰",
      "script_bold": "𝓤",
      "monospaced": "𝚄"
    },
    {
      "plain": "V",
      "bold": "𝐕",
      "script": "𝒱",
      "script_bold": "𝓥",
      "monospaced": "𝚅"
    },
    {
      "plain": "W",
      "bold": "𝐖",
      "script": "𝒲",
      "script_bold": "𝓦",
      "monospaced": "𝚆"
    },
    {
      "plain": "X",
      "bold": "𝐗",
      "script": "𝒳",
      "script_bold": "𝓧",
      "monospaced": "𝚇"
    },
    {
      "plain": "Y",
      "bold": "𝐘",
      "script": "𝒴",
      "script_bold": "𝓨",
      "monospaced": "𝚈"
    },
    {
      "plain": "Z",
      "bold": "𝐙",
      "script": "𝒵",
      "script_bold": "𝓩",
      "monospaced": "𝚉"
    },
    {
      "plain": "0",
      "bold": "𝟎",
      "script": "",
      "script_bold": "",
      "monospaced": ""
    },
    {
      "plain": "1",
      "bold": "𝟏",
      "script": "",
      "script_bold": "",
      "monospaced": ""
    },
    {
      "plain": "2",
      "bold": "𝟐",
      "script": "",
      "script_bold": "",
      "monospaced": ""
    },
    {
      "plain": "3",
      "bold": "𝟑",
      "script": "",
      "script_bold": "",
      "monospaced": ""
    },
    {
      "plain": "4",
      "bold": "𝟒",
      "script": "",
      "script_bold": "",
      "monospaced": ""
    },
    {
      "plain": "5",
      "bold": "𝟓",
      "script": "",
      "script_bold": "",
      "monospaced": ""
    },
    {
      "plain": "6",
      "bold": "𝟔",
      "script": "",
      "script_bold": "",
      "monospaced": ""
    },
    {
      "plain": "7",
      "bold": "𝟕",
      "script": "",
      "script_bold": "",
      "monospaced": ""
    },
    {
      "plain": "8",
      "bold": "𝟖",
      "script": "",
      "script_bold": "",
      "monospaced": ""
    },
    {
      "plain": "9",
      "bold": "𝟗",
      "script": "",
      "script_bold": "",
      "monospaced": ""
    }
  ]

function check_num_alpha(input){
  return /\d|\w/.test(input);
}


function transformCase(input,type){
    console.log(input)
    var output = ""
    // Loop through characters
    for (var i = 0; i < input.length;i++){
      var found = false;
      if (check_num_alpha(input[i])){
        for (var j = 0; j < fi_switch.length;j++){
          if(input[i]==fi_switch[j]["plain"]){
            /* FOUND THIS IN JSON */
            if(fi_switch[j][type] !== ""){
              output = output + fi_switch[j][type];
              found = true;
              break;
            }
            break;
            
          } 
        }
      if (found == false){

            /* NOT FOUND IN JSON */
            output = output + input[i];
     
        }
        else{
          found = true;
        }
      }
      else{
        // NON DIGIT/STRING CHARACTER
        output = output + input[i];
      }
          
    }
    console.log(output)
    return output;
}

/* FI - BOLD */
document.getElementById("fi-bold").addEventListener("click", function () {
    copyButtonClear();
    switchLabel();
    addReset(getDivValue(source_div));
    text = transformCase(getDivValue(source_div), "bold");
    setDivValue(source_div, text);
});

/* FI - SCRIPT */
document.getElementById("fi-script").addEventListener("click", function () {
  copyButtonClear();
  switchLabel();
  addReset(getDivValue(source_div));
  text = transformCase(getDivValue(source_div), "script");
  setDivValue(source_div, text);
});

/* FI - BOLDED SCRIPT */
document.getElementById("fi-script-bold").addEventListener("click", function () {
  copyButtonClear();
  switchLabel();
  addReset(getDivValue(source_div));
  text = transformCase(getDivValue(source_div), "script_bold");
  setDivValue(source_div, text);
});

/* FI - monospaced */
document.getElementById("fi-monospaced").addEventListener("click", function () {
  copyButtonClear();
  switchLabel();
  addReset(getDivValue(source_div));
  text = transformCase(getDivValue(source_div), "monospaced");
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

/* Snake case ("snc") Conversion. */
document.getElementById("snc").addEventListener("click", function () {
    copyButtonClear();
switchLabel();
    addReset(getDivValue(source_div));
    text = getDivValue(source_div).split("\n");
    formattedList = [];
    for (i = 0; i < text.length; i++) {
        text[i] = text[i].toLowerCase();
        formattedList.push(slugify(text[i], "_"));
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
