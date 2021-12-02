import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function main() {
    const inputLines = util.loadInput(input);

    const position = _.reduce(inputLines, (acc, line) => {
        const command = _.split(line, ' ');

        if (command[0] === 'forward') {
            acc.horizontal += _.parseInt(command[1]);
        } else if (command[0] === 'down') {
            acc.depth += _.parseInt(command[1]);
        } else if (command[0] === 'up') {
            acc.depth -= _.parseInt(command[1]);
        } else {
            console.log('UNKNOWN COMMAND', command[0]);
        }

        return acc;
    }, { horizontal: 0, depth: 0 });

    console.log('position', position, position.horizontal * position.depth);
}

main();
