/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let dictionary = {};

    for (let i=0; i<this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (!dictionary[word]) {
        dictionary[word] = [];
      }

      dictionary[word].push(nextWord);
    }

    this.chains = dictionary;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let startingWords = this.words.filter(word => word[0] === word[0].toUpperCase());

    let keys = startingWords.length > 0 ? startingWords : Object.keys(this.chains);
    let key = keys[Math.floor(Math.random() * keys.length)];
    let output = [];

    while (output.length < numWords && key !== null) {
      output.push(key);

      let nextWords = this.chains[key];
      key = nextWords ? nextWords[Math.floor(Math.random() * nextWords.length)] : null;
    }

    return output.join(' ');
  }
}

module.exports = { MarkovMachine };