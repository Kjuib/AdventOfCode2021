import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';


function main() {
    const inputLines = util.loadInput(input);
    const outputOnly = _.map(inputLines, (line) => {
        return _.split(line, ' | ')[1];
    }).join('\n');

    const match2 = outputOnly.match(/(?<=^|\s)[a-z]{2}(?=\s|$)/g);
    console.log('match2', match2, match2.length);
    const match3 = outputOnly.match(/(?<=^|\s)[a-z]{3}(?=\s|$)/g);
    console.log('match3', match3, match3.length);
    const match4 = outputOnly.match(/(?<=^|\s)[a-z]{4}(?=\s|$)/g);
    console.log('match4', match4, match4.length);
    const match7 = outputOnly.match(/(?<=^|\s)[a-z]{7}(?=\s|$)/g);
    console.log('match7', match7, match7.length);

    const count = match2.length + match3.length + match4.length + match7.length;

    console.log('count', count);
}

main();
