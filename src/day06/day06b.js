import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function day(fishMap) {
    const newFish = {};

    for (let i = 0; i < 9; i++) {
        const count = fishMap[i] || 0;
        if (i === 0) {
            newFish[6] = count;
            newFish[8] = count;
        } else {
            newFish[i - 1] = count + (newFish[i - 1] || 0);
        }
    }

    return newFish;
}

function main() {
    const inputLines = util.loadInput(input);

    let fish = _.countBy(_.split(inputLines[0], ','));

    for (let i = 1; i <= 256; i++) {
        fish = day(fish);
    }

    const count = _.sum(_.values(fish));

    console.log('count', count);
}

main();
