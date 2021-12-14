import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function step(currentCode, map) {
    const nextCode = {};

    _.forEach(currentCode, (value, key) => {
        const newPair = map[key];
        nextCode[newPair[0]] = (nextCode[newPair[0]] || 0) + value;
        nextCode[newPair[1]] = (nextCode[newPair[1]] || 0) + value;
    });

    return nextCode;
}

function main() {
    console.time();
    const [ strStart, ...inputLines] = util.loadInput(input);

    const map = _.reduce(inputLines, (acc, line) => {
        const [ from, add ] = line.split(' -> ');
        acc[from] = [ `${from[0]}${add}`, `${add}${from[1]}` ];
        return acc;
    }, {});

    let code = {};
    for (let i = 0; i < strStart.length - 1; i++) {
        const key = `${strStart[i]}${strStart[i + 1]}`;
        code[key] = (code[key] || 0) + 1;
    }

    for (let i = 1; i <= 40; i++) {
        code = step(code, map);
    }

    const counts = {};
    _.forEach(code, (value, key) => {
        counts[key[0]] = (counts[key[0]] || 0) + (value / 2);
        counts[key[1]] = (counts[key[1]] || 0) + (value / 2);
    });

    const max = _.ceil(_.max(_.values(counts)));
    const min = _.ceil(_.min(_.values(counts)));

    console.log('score', max - min);
    console.timeEnd();
}

main();
