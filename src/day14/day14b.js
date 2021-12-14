import * as util from '../util.js';
import _ from 'lodash';

const input = 'input.test.txt';
// const input = 'input.txt';

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

    let prevCounts = {}
    for (let i = 1; i <= 20; i++) {
        code = step(code, map);
        const counts = _.countBy(code);

        // console.log('N', counts.N, counts.N - (prevCounts.N || 0));
        // prevCounts = counts;
        // console.log('counts', counts);
        console.log(code.length, counts);
    }

    const counts = _.countBy(code);

    console.log('score', _.max(_.values(counts)) - _.min(_.values(counts)));

    let itemCount = strStart.length;
    console.log('itemCount', itemCount);
    for (let i = 1; i <= 40; i++) {
        itemCount = itemCount + itemCount - 1;
        console.log('itemCount', itemCount);
    }
}

main();
