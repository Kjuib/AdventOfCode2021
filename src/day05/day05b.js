import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function main() {
    const inputLines = util.loadInput(input);

    const grid = [];

    _.each(inputLines, (line) => {
        const line001 = line.split(' -> ');
        const start = _.map(line001[0].split(','), (str) => {
            return _.parseInt(str);
        });
        const end = _.map(line001[1].split(','), (str) => {
            return _.parseInt(str);
        });

        if (start[0] === end[0]) {
            if (start[1] < end[1]) {
                for (let i = start[1]; i <= end[1]; i++) {
                    const current = _.get(grid, `[${start[0]}][${i}]`) || 0;
                    _.set(grid, `[${start[0]}][${i}]`, current + 1);
                }
            } else {
                for (let i = end[1]; i <= start[1]; i++) {
                    const current = _.get(grid, `[${start[0]}][${i}]`) || 0;
                    _.set(grid, `[${start[0]}][${i}]`, current + 1);
                }
            }
        } else if (start[1] === end[1]) {
            if (start[0] < end[0]) {
                for (let i = start[0]; i <= end[0]; i++) {
                    const current = _.get(grid, `[${i}][${start[1]}]`) || 0;
                    _.set(grid, `[${i}][${start[1]}]`, current + 1);
                }
            } else {
                for (let i = end[0]; i <= start[0]; i++) {
                    const current = _.get(grid, `[${i}][${start[1]}]`) || 0;
                    _.set(grid, `[${i}][${start[1]}]`, current + 1);
                }
            }
        } else {
            if (start[0] < end[0] && start[1] < end[1]) {
                for (let i = 0; i <= end[0] - start[0]; i++) {
                    const current = _.get(grid, `[${start[0] + i}][${start[1] + i}]`) || 0;
                    _.set(grid, `[${start[0] + i}][${start[1] + i}]`, current + 1);
                }
            } else if (start[0] < end[0] && start[1] > end[1]) {
                for (let i = 0; i <= end[0] - start[0]; i++) {
                    const current = _.get(grid, `[${start[0] + i}][${start[1] - i}]`) || 0;
                    _.set(grid, `[${start[0] + i}][${start[1] - i}]`, current + 1);
                }
            } else if (start[0] > end[0] && start[1] > end[1]) {
                for (let i = 0; i <= start[0] - end[0]; i++) {
                    const current = _.get(grid, `[${start[0] - i}][${start[1] - i}]`) || 0;
                    _.set(grid, `[${start[0] - i}][${start[1] - i}]`, current + 1);
                }
            } else if (start[0] > end[0] && start[1] < end[1]) {
                for (let i = 0; i <= start[0] - end[0]; i++) {
                    const current = _.get(grid, `[${start[0] - i}][${start[1] + i}]`) || 0;
                    _.set(grid, `[${start[0] - i}][${start[1] + i}]`, current + 1);
                }
            }
        }
    });

    const flat01 = _.flatten(grid);
    const flat02 = _.compact(flat01);
    const flat03 = _.filter(flat02, (item) => {
        return item > 1;
    });

    console.log('COUNT', _.size(flat03));
}

main();
