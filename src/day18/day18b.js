import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function reduce(line) {
    let hasReduced = false;

    const checkExplode = new RegExp(/\[(\d{1,2})\,(\d{1,2})\]/g);
    let explodeResult = true;
    let newLine = line;
    while (explodeResult) {
        explodeResult = checkExplode.exec(line);
        if (explodeResult) {
            const preStringCounts = _.countBy(line.substring(0, explodeResult.index).split(''));
            if ((preStringCounts['['] || 0) - (preStringCounts[']'] || 0) >= 4) {
                // console.log('EXPLODING');
                let preString = line.substring(0, explodeResult.index);
                const preStringRegex = /^(.*\D)(\d{1,2})/;
                const preStringRegexResult = preStringRegex.exec(preString);
                if (preStringRegexResult) {
                    const explodedValue1 = _.parseInt(explodeResult[1]);
                    const leftNumber = _.parseInt(preStringRegexResult[2]);
                    preString = preString.replace(preStringRegex, `$1${explodedValue1 + leftNumber}`);

                }

                let postString = line.substring(explodeResult.index + explodeResult[0].length);
                const postStringRegex = /(\d{1,2})/;
                const postStringRegexResult = postStringRegex.exec(postString);
                if (postStringRegexResult) {
                    const explodedValue2 = _.parseInt(explodeResult[2]);
                    const rightNumber = _.parseInt(postStringRegexResult[1]);
                    postString = postString.replace(postStringRegex, explodedValue2 + rightNumber);
                }

                newLine = `${preString}0${postString}`

                hasReduced = true;
                break;
            }
        }
    }

    if (!hasReduced) {
        // split
        const splitRegex = /\d{2}/;
        const splitRegexResult = splitRegex.exec(line);
        if (splitRegexResult) {
            // console.log('SPLITTING');
            const value = _.parseInt(splitRegexResult[0]);
            const value1 = _.floor(value / 2);
            const value2 = _.ceil(value / 2);
            newLine = newLine.replace(splitRegex, `[${value1},${value2}]`)

            hasReduced = true;
        }
    }

    // console.log('newLine', newLine);

    if (hasReduced) {
        return reduce(newLine);
    }

    return newLine;
}

function add(part1, part2) {
    const total = `[${part1},${part2}]`;

    return reduce(total);
}

function magnitude(line) {
    let foundMag = true;
    while (foundMag) {
        foundMag = false;

        let replaceRegex = /\[(\d+)\,(\d+)\]/;
        const replaceRegexResult = replaceRegex.exec(line);
        if (replaceRegexResult) {
            foundMag = true;

            const value1 = _.parseInt(replaceRegexResult[1]);
            const value2 = _.parseInt(replaceRegexResult[2]);

            line = line.replace(replaceRegex, ((value1 * 3) + (value2 * 2)));
        }
    }

    return _.parseInt(line);
}

function main() {
    console.time();
    const inputLine = util.loadInput(input);

    let topMagnitude = 0;
    _.forEach(inputLine, (line1, index1) => {
        _.forEach(inputLine, (line2, index2) => {
            if (index1 === index2) {
                return;
            }

            const total = add(line1, line2);
            const mag = magnitude(total);

            if (mag > topMagnitude) {
                topMagnitude = mag;
            }
        });
    });

    console.log('topMagnitude', topMagnitude);

    console.timeEnd();
}

main();
