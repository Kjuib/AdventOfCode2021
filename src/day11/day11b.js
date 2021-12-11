import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

const needToFlash = '.';
const hasFlashed = '*'
const directions = [
    { x: -1, y: -1 },
    { x:  0, y: -1 },
    { x:  1, y: -1 },
    { x: -1, y:  0 },
    { x:  1, y:  0 },
    { x: -1, y:  1 },
    { x:  0, y:  1 },
    { x:  1, y:  1 },
]

function flash(data) {
    let found = false;
    _.forEach(data, (row, y) => {
        return _.forEach(row, (value, x) => {
            if (value === needToFlash) {
                found = true;

                _.forEach(directions, (d) => {
                    const value = _.get(data, `[${y + d.y}][${x + d.x}]`);
                    if (_.isNumber(value)) {
                        let newValue = value + 1;
                        if (newValue > 9) {
                            newValue = needToFlash;
                        }
                        data[y + d.y][x + d.x] = newValue;
                    }
                });

                data[y][x] = hasFlashed;
            }
        });
    });

    return found;
}

function step(data) {
    const part1 = _.map(data, (row) => {
        return _.map(row, (value) => {
            let newValue = value + 1;
            if (newValue > 9) {
                newValue = needToFlash;
            }
            return newValue;
        });
    });

    // part2
    while (flash(part1)) {
        // keep flashing
    }

    let flashCount = 0;
    const part3 = _.map(part1, (row) => {
        return _.map(row, (value) => {
            let newValue = value;
            if (newValue === hasFlashed) {
                flashCount++;
                newValue = 0;
            }
            return newValue;
        });
    });

    if (flashCount === 100) {
        part3.synced = true;
    }
    return part3;
}

function main() {
    const inputLines = util.loadInput(input, { split: true, isIntegers: true });

    util.printGrid(inputLines);

    let data = inputLines;
    for (let i = 1; i <= 10000; i++) {
        data = step(data);
        console.log('step', i);
        util.printGrid(data);

        if (data.synced) {
            console.log('ALL SYNCED');
            break;
        }
    }
}

main();
