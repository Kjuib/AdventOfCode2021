import * as util from '../util.js';
import _ from 'lodash';

const input = 'input.test.txt';
// const input = 'input.txt';

function checkPoint(x, y, points) {
    const current = _.get(points, `[${y}][${x}]`, 9);

    const north = _.get(points, `[${y - 1}][${x}]`, 9);
    const east = _.get(points, `[${y}][${x + 1}]`, 9);
    const south = _.get(points, `[${y + 1}][${x}]`, 9);
    const west = _.get(points, `[${y}][${x - 1}]`, 9);

    return ((current < north)
        && (current < east)
        && (current < south)
        && (current < west));
}

function getLowPoints(points) {
    const lowPoints = [];
    for (let y = 0; y < points.length; y++) {
        for (let x = 0; x < points[0].length; x++) {

            if (checkPoint(x, y, points)) {
                const current = _.get(points, `[${y}][${x}]`, 9);
                lowPoints.push({
                    x,
                    y,
                    value: current
                });
            }
        }
    }

    return lowPoints;
}

function getBasinSize(x, y, points, history) {
    const current = _.get(points, `[${y}][${x}]`, 9);

    if (current === 9) {
        _.set(history, `${x},${y}`, 0);
        return;
    }

    _.set(history, `${x},${y}`, 1);

    const directions = [
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
    ];

    _.forEach(directions, (d) => {
        const newX = x + d.x;
        const newY = y + d.y;

        if (!_.has(history, `${newX},${newY}`)) {
            getBasinSize(newX, newY, points, history);
        }
    });
}

function main() {
    const inputLines = util.loadInput(input);

    const points = _.map(inputLines, (line) => {
        return _.split(line, '').map(_.parseInt);
    });

    const lowPoints = getLowPoints(points);

    let sizes = _.map(lowPoints, (lowPoint) => {
        const history = {};
        getBasinSize(lowPoint.x, lowPoint.y, points, history);
        return _.sum(_.values(history));
    });

    sizes = _.orderBy(sizes)
    sizes = _.slice(sizes, -3);

    const score = _.reduce(sizes, (acc, current) => {
        return acc * current;
    });

    console.log('score', score);
}

main();
