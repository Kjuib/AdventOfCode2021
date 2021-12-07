import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';


function calc(diff) {
    return (diff * (diff + 1))/2
}

function main() {
    const inputLines = util.loadInput(input);
    const crabs = _.map(inputLines[0].split(','), _.parseInt);

    const min = _.min(crabs);
    const max = _.max(crabs);

    const scores = [];
    for (let i = min; i <= max; i++) {
        const diffs = _.map(crabs, (crab) => {
            return calc(Math.abs(crab - i));
        });

        scores.push({ pos: i, score: _.sum(diffs) })
    }

    const least = _.sortBy(scores, 'score');

    console.log('least', least[0]);

}

main();
