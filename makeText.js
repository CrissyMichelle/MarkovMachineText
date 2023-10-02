/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

function generateText(text) {
    let mm = new MarkovMachine(text);
    console.log(mm.makeText());
}

//Process command-line arguments
const [,, cmd, ...args] = process.argv;

async function handleInput() {
    if (cmd === 'text') {
        generateText(args.join(' '));
    } else if (cmd === 'file') {
        fs.readFile(args[0], 'utf-8', (error, data) => {
            if (error) {
                console.error(`Cannot read file: ${error}`);
                process.exit(1);
            }
            generateText(data);
        });
    } else if (cmd === 'url') {
        try {
            const url = args[0];
            const response = await axios.get(url);    
            generateText(response.data);
        } catch (error) {
            console.error(`Error fetching ${url}: ${error}`);
            process.exit(1);
        }
    } else {
        console.error('Unknown command');
        process.exit(1);
    }
}

handleInput();