import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function main() {
    const inputLines = util.loadInput(input, { isIntegers: true });

    const stateLines = _.map(inputLines, (depth, i) => {
        const prevDepth = inputLines[i - 1];

        if (!prevDepth) {
            return 'na';
        } else if (prevDepth > depth) {
            return 'decrease';
        } else if (prevDepth < depth) {
            return 'increase';
        } else {
            return 'SAME?'
        }
    }) ;

    const counts = _.countBy(stateLines);

    console.log('counts', counts);
}

main();
