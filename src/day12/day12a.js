import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
// const input = 'input.test2.txt';
// const input = 'input.test3.txt';
const input = 'input.txt';

function parse(lines) {
    return _.reduce(lines, (acc, line) => {
        const [ from, to ] = line.split('-');

        acc.push({
            from: from,
            to: to,
            bigCave: to === _.toUpper(to)
        });

        acc.push({
            from: to,
            to: from,
            bigCave: from === _.toUpper(from)
        });

        return acc;
    }, []);
}

let pathsFound = 0;
function nextNode(current, pathOptions, history) {
    history.push(current);
    const currentOptions = _.filter(pathOptions, { from: current });

    _.forEach(currentOptions, (currentOption) => {
        const newHistory = _.cloneDeep(history);
        if (currentOption.to === 'end') {
            newHistory.push('end');
            console.log('FOUND', JSON.stringify(newHistory));
            pathsFound++;
        } else if (currentOption.bigCave) {
            nextNode(currentOption.to, pathOptions, newHistory);
        } else if (!_.includes(newHistory, currentOption.to)) {
            nextNode(currentOption.to, pathOptions, newHistory);
        }
    });
}

function main() {
    const inputLines = util.loadInput(input);

    const pathOptions = parse(inputLines);

    nextNode('start', pathOptions, []);

    console.log('pathsFound', pathsFound);
}

main();
