import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

const scores = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}

function checkLine(line) {
    const newLine = _.replace(line, /(\[\])|(\(\))|(\{\})|(\<\>)/gm, '');

    if (newLine === line) {
        const error = line.match(/[\(\[\{\<][\)\]\}\>]/);

        if (error) {
            return error[0][1];
        }

        // incomplete
        return;
    }

    return checkLine(newLine);
}

function main() {
    const inputLines = util.loadInput(input);

    let errors = _.map(inputLines, (line) => {
        return checkLine(line);
    });

    errors = _.map(errors, (error) => {
        return scores[error] || 0;
    });

    console.log('score', _.sum(errors));
}

main();
