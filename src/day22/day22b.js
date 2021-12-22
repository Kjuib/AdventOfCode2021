import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
// const input = 'input.test.c.txt';
const input = 'input.txt';

function getVolume(cubeList) {
    return _.reduce(cubeList, (acc, c) => {
        const currentVolume = (1 + c.x2 - c.x1) * (1 + c.y2 - c.y1) * (1 + c.z2 - c.z1);
        if (c.command === 'on') {
            return acc + currentVolume;
        } else {
            return acc - currentVolume;
        }
    }, 0);
}

function main() {
    console.time();
    const inputLine = util.loadInput(input);

    const rebootSteps = _.map(inputLine, (line) => {
        const regexResults = /(.*?)\sx=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)/.exec(line);

        return {
            command: regexResults[1],
            x1: _.parseInt(regexResults[2]),
            x2: _.parseInt(regexResults[3]),
            y1: _.parseInt(regexResults[4]),
            y2: _.parseInt(regexResults[5]),
            z1: _.parseInt(regexResults[6]),
            z2: _.parseInt(regexResults[7])
        };
    });

    let cubes = [];
    _.forEach(rebootSteps, (newCube) => {
    // _.forEach(_.slice(rebootSteps, 0, 20), (newCube) => {
    // _.forEach(_.slice(rebootSteps, 0, 1), (newCube) => {
        const newCubes = [];

        if (newCube.command === 'on') {
            newCubes.push(newCube);
        }

        _.forEach(cubes, (curCube) => {
            let intCube = {
                command: (curCube.command === 'on' ? 'off' : 'on'),
                x1: _.max([newCube.x1, curCube.x1]),
                x2: _.min([newCube.x2, curCube.x2]),
                y1: _.max([newCube.y1, curCube.y1]),
                y2: _.min([newCube.y2, curCube.y2]),
                z1: _.max([newCube.z1, curCube.z1]),
                z2: _.min([newCube.z2, curCube.z2]),
            };

            if (intCube.x1 <= intCube.x2 && intCube.y1 <= intCube.y2 && intCube.z1 <= intCube.z2) {
                newCubes.push(intCube);
            }

            newCubes.push(curCube);
        });

        cubes = newCubes;
    });

    console.log('ON', getVolume(cubes));

    console.timeEnd();
}

main();
