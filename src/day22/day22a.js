import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
// const input = 'input.test.b.txt';
const input = 'input.txt';

function main() {
    console.time();
    const inputLine = util.loadInput(input);

    const rebootSteps = _.reduce(inputLine, (acc, line) => {
        const regexResults = /(.*?)\sx=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)/.exec(line);

        let cuboid = {
            command: regexResults[1],
            x1: _.parseInt(regexResults[2]),
            x2: _.parseInt(regexResults[3]),
            y1: _.parseInt(regexResults[4]),
            y2: _.parseInt(regexResults[5]),
            z1: _.parseInt(regexResults[6]),
            z2: _.parseInt(regexResults[7])
        };

        if (cuboid.x1 >= -50 && cuboid.x2 <= 50 &&
            cuboid.y1 >= -50 && cuboid.y2 <= 50 &&
            cuboid.z1 >= -50 && cuboid.z2 <= 50
        ) {
            acc.push(cuboid);
        }

        return acc;
    }, []);

    const cubes = new Map();
    _.forEach(rebootSteps, (step) => {
        for (let zz = step.z1; zz <= step.z2; zz++) {
            for (let yy = step.y1; yy <= step.y2; yy++) {
                for (let xx = step.x1; xx <= step.x2; xx++) {
                    const key = [xx,yy,zz].join(',');
                    if (step.command === 'on') {
                        cubes.set(key, '1');
                    } else {
                        cubes.delete(key);
                    }
                }
            }
        }
    });

    console.log('cubes', cubes.size);


    console.timeEnd();
}

main();
