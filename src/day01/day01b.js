import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function main() {
    const inputLines = util.loadInput(input, { isIntegers: true });

    const stateLines = [ 'na', 'na', 'na' ];

    for (let i = 3; i < inputLines.length; i++) {
        const depth = inputLines[i] + inputLines[i - 1] + inputLines[i - 2];
        const prevDepth = inputLines[i - 1] + inputLines[i - 2] + inputLines[i - 3];

        if (!prevDepth) {
            stateLines.push('na');
        } else if (prevDepth > depth) {
            stateLines.push('decrease');
        } else if (prevDepth < depth) {
            stateLines.push('increase');
        } else {
            stateLines.push('SAME?');
        }
    }

    const counts = _.countBy(stateLines);

    console.log('counts', counts);
}

main();
