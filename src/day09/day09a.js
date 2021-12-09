import * as util from '../util.js';
import _ from 'lodash';

const input = 'input.test.txt';
// const input = 'input.txt';

function checkPoint(x, y, points) {
    const current = _.get(points, `[${y}][${x}]`, 99) ;

    const north = _.get(points, `[${y - 1}][${x}]`, 99);
    const east = _.get(points, `[${y}][${x + 1}]`, 99);
    const south = _.get(points, `[${y + 1}][${x}]`, 99);
    const west = _.get(points, `[${y}][${x - 1}]`, 99);

    return ((current < north)
        && (current < east)
        && (current < south)
        && (current < west));
}

function main() {
    const points = util.loadInput(input, { split: true, isIntegers: true });

    const lowPoints = [];
    for (let y = 0; y < points.length; y++) {
        for (let x = 0; x < points[0].length; x++) {

            if (checkPoint(x, y, points)) {
                const current = _.get(points, `[${y}][${x}]`, 99);
                lowPoints.push({
                    x,
                    y,
                    value: current
                });
            }
        }
    }

    const risk = _.map(lowPoints, (lowPoint) => {
        return lowPoint.value + 1;
    });

    console.log('RISK', _.sum(risk));
}

main();
