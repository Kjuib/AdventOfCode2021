import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function day(fishList) {
    const newFish = [];
    const oldFish = [];

    _.forEach(fishList, (currentFish, i) => {
        if (currentFish === 0) {
            oldFish[i] = 6;
            newFish.push(8);
        } else {
            oldFish[i] = currentFish - 1;
        }
    });

    return [ ...oldFish, ...newFish ];
}

function main() {
    const inputLines = util.loadInput(input);

    let fish = _.map(_.split(inputLines[0], ','), (str) => {
        return _.parseInt(str);
    });

    console.log('fish', fish);

    for (let i = 1; i <= 80; i++) {
        fish = day(fish);
        // console.log(_.padStart(i, 3, '0'), fish);
    }

    console.log('FISH COUNT', _.size(fish));
}

main();
