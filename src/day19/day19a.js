import * as util from '../util.js';
import _ from 'lodash';
import fs from 'fs';

const input = 'input.test.txt';
// const input = 'input.txt';

export function loadInput(filePath, options = {}) {
    const fileInput = fs.readFileSync(filePath);
    const listInput = _.split(fileInput, '\n\n');

    return _.map(listInput, (scannerString) => {
        let [ title, ...rows ] = _.compact(scannerString.split('\n'));

        rows = _.map(rows, (row) => {
            const [x, y, z] = row.split(',');

            return {
                x: _.parseInt(x),
                y: _.parseInt(y),
                z: _.parseInt(z)
            };
        });

        return {
            title,
            rows
        };
    });
}

function main() {
    console.time();
    const scanners = loadInput(input);

    console.log('scanners', JSON.stringify(scanners));

    console.timeEnd();
}

main();
