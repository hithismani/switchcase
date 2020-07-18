### [SwitchCase:](https://switchcase.xyz)  Convert your text painlessly.
[![SwitchCase.xyz](https://switchcase.xyz/images/og-image-square.jpg)](https://switchcase.xyz)
[![Netlify Status](https://api.netlify.com/api/v1/badges/347aa4f8-5dbc-4be9-b16d-0aaeb162f3e9/deploy-status)](https://switchcase.xyz)
##### Text/sentence conversion into random, sentence, capital, upper, lower, slug case including illegal case removal! Privacy friendly, quick, free and open source!

### Why:
While checking out various tools online for my own sentence case switching needs, I found out that some tools relied on server side script to do this (Why? Your guess is as good as mine). The other tools obfuscated their javascript code, making it impossible to understand if there's any monkey business happening with your text inputs. 

Additionally, as developers there are a few additional features we need that just don't come with the standard tools out there. Slugifying text, escaping text, etc. 

### Features: 

- Easy Text/sentence conversion into random, sentence, capital, upper, lower, slug-case including illegal case removal.  
- Built using simple vanilla javascript. 
- Free. Lightweight. Quick. Works directly within the browser.  
- Helpful for copywriters, designers, website developers and digital marketers.  
- Removes any existing styling from your current text. Comes in handy when you're copy pasting things into your design tools and need to remove formatting. 
- Switch up the sentence casing without worrying about privacy.  
- Revision history created for each time you refresh this window.  
- SW Ready: If you install this site on your homescreen, it'll even work offline!

---

### 🔡 Common Use Cases:

| Type           | Function                                                                                   | Example                                                                                                         |
|----------------|--------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| Uppercase      | Converts all text into uppercase.                                                          | "this sentence." gets converted into "THIS SENTENCE."                                                           |
| Lowercase      | Converts all text into lowercase.                                                          | "THIS TEXT." gets converted into "this text."                                                                   |
| Capital Case   | Capitalizes first letter of each word. Converts remaining characters in word to lowercase. | "this text." gets converted into "This Text."                                                                   |
| Sentence Case  | Capitalizes first letter of each word. Converts remaining sentence to lowercase.           | "this tExT." gets converted into "This text."                                                                   |
| AlTeRnAtE Case | Randomly capitalizes alternate letter of each word.                                        | Click the button once "this text." gets converted into "ThIs tExT.". Converts to "tHiS TeXt." if clicked again. |
| Randomize Case | Randomizes case of every letter in the sentence, each time you click the button.           | "this text." may be converted into "tHiS tEXt.".                                                                |
|                |                                                                                            |                                                                                                                 |


### 💻 Developer Use Cases:

| Type          | Function                                                                                              | Example                                                  |
|---------------|-------------------------------------------------------------------------------------------------------|----------------------------------------------------------|
| Sluggify-Text | Converts all text into a hyphenated slug. Comes in handy when you're working with creating filenames. | "this sentence." gets converted into "this-sentence".    |
| Escape Text   | Url escape()'s text.                                                                                  | "this sentence." gets converted into "this%20sentence.". |

### 🎉 Other Use Cases:

| Type                         | Function                                                                            | Example                                                                             |
|------------------------------|-------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| Remove illegal � characters  | Removes unrecognized or illegal "�" characters from the sentence.                   | "this � sentence." gets converted into "this sentence.".                            |
| Remove Extra Space           | Remove extra spaces from the sentence. Preserve line breaks.                        | "this sentence." gets converted into "this sentence.".                              |
| Merge lines into single line | Remove all line breaks, adds missing fullstops.                                     | "this sentence this sentence." gets converted into "this sentence. this sentence.". |
| Remove Extra Line Breaks     | Remove Extra Line Breaks. Preserve extra spaces and single line breaks.             | "this sentence this sentence." gets converted into "this sentence. this sentence.". |
| Only capitalize first letter | Capitalizes first letter of each sentence.Ignores casing of the remaining sentence. | "this sentEnCe." gets converted into "This SentEnCe.".                              |


Credits:
- Check (switchcase.js)[https://github.com/hithismani/switchcase/blob/master/site/js/switchcase.js] for line/logic specific attributions.
- (Bulma CSS)[https://bulma.io/] for look and feel. 
- (Google Workbox)[https://developers.google.com/web/tools/workbox] for service worker capability.
