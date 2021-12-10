import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

const scores = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
}

function checkLine(line) {
    const newLine = _.replace(line, /(\[\])|(\(\))|(\{\})|(\<\>)/gm, '');

    if (newLine === line) {
        const error = line.match(/[\(\[\{\<][\)\]\}\>]/);

        if (error) {
            return 0;
        }

        // incomplete
        return newLine;
    }

    return checkLine(newLine);
}

function finishLine(line) {
    let newLine = _.reverse(_.split(line, '')).join('');
    newLine = _.replace(newLine, /\(/g, ')');
    newLine = _.replace(newLine, /\[/g, ']');
    newLine = _.replace(newLine, /\{/g, '}');
    newLine = _.replace(newLine, /\</g, '>');

    return newLine;
}

function scoreLine(line) {
    return _.reduce(line, (acc, char) => {
        return (acc * 5) + scores[char];
    }, 0);
}

function main() {
    const inputLines = util.loadInput(input);

    const incomplete = _.reduce(inputLines, (acc, line) => {
        const i = checkLine(line);
        if (i !== 0) {
            acc.push(i);
        }

        return acc;
    }, []);

    const completed = _.map(incomplete, (line) => {
        return finishLine(line);
    }) ;

    let totalScores = _.map(completed, (line) => {
        return scoreLine(line);
    });

    totalScores = _.orderBy(totalScores);
    const middle = _.floor(totalScores.length / 2);

    const finalScore = totalScores[middle];
    console.log('finalScore', finalScore);
}

main();
