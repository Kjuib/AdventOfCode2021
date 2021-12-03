import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function count(lines, position) {
    return _.reduce(lines, (acc, line) => {
        if (line[position] === '1') {
            acc['1']++;
        } else {
            acc['0']++;
        }
        return acc;
    }, { '1': 0, '0': 0 });
}

function main() {
    const inputLines = util.loadInput(input);
    const length = _.size(inputLines[0]);

    let oList = _.cloneDeep(inputLines);
    for (let i = 0; i < length; i++) {
        const counts = count(oList, i);
        if (counts['1'] < counts['0']) {
            oList = _.filter(oList, (bin) => {
                return bin[i] === '0'
            });
        } else {
            oList = _.filter(oList, (bin) => {
                return bin[i] === '1'
            });
        }

        if (_.size(oList) === 1) {
            i = 99999;
        }
    }
    console.log('oList', oList);

    let cList = _.cloneDeep(inputLines);
    for (let i = 0; i < length; i++) {
        const counts = count(cList, i);
        if (counts['1'] < counts['0']) {
            cList = _.filter(cList, (bin) => {
                return bin[i] === '1'
            });
        } else {
            cList = _.filter(cList, (bin) => {
                return bin[i] === '0'
            });
        }

        if (_.size(cList) === 1) {
            i = 99999;
        }
    }
    console.log('cList', cList);

    const o = _.parseInt(oList[0], 2);
    const c = _.parseInt(cList[0], 2);

    const support = o * c;

    console.log(support, o, c);

}

main();
