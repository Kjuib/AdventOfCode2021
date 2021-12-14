import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function step(currentCode, map) {
    const nextCode = [];

    let prevChar = '';
    _.forEach(currentCode, (char01) => {
        if (prevChar) {
            const middle = map[`${prevChar}${char01}`];
            if (middle) {
                nextCode.push(middle);
            }
        }

        nextCode.push(char01)
        prevChar = char01;
    });

    return nextCode;
}

function main() {
    const [ strStart, ...inputLines] = util.loadInput(input);

    const map = _.reduce(inputLines, (acc, line) => {
        const [ from, add ] = line.split(' -> ');
        acc[from] = add;
        return acc;
    }, {});

    let code = strStart.split('');

    for (let i = 1; i <= 10; i++) {
        code = step(code, map);
    }

    const counts = _.countBy(code);

    console.log('score', _.max(_.values(counts)) - _.min(_.values(counts)));
}

main();
