import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function count(lines, position) {
    const counts = _.reduce(lines, (acc, line) => {
        if (line[position] === '1') {
            acc['1']++;
        } else {
            acc['0']++;
        }
        return acc;
    }, { '1': 0, '0': 0 });

    if (counts['1'] > counts['0']) {
        return { g: '1', e: '0' }
    } else if (counts['1'] < counts['0']) {
        return { g: '0', e: '1' }
    } else {
        console.log('ERROR', 'counts are the same');
    }
}

function main() {
    const inputLines = util.loadInput(input);
    const length = inputLines[0].length;

    let g = '';
    let e = '';

    for (let i = 0; i < length; i++) {
        const counts = count(inputLines, i);
        g += counts.g;
        e += counts.e;
    }

    g = _.parseInt(g, 2);
    e = _.parseInt(e, 2);

    const power = g * e;
    
    console.log(power, g, e);
}

main();
