import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
// const input = 'input.test2.txt';
// const input = 'input.test3.txt';
const input = 'input.txt';

function parse(lines) {
    return _.reduce(lines, (acc, line) => {
        const [ from, to ] = line.split('-');

        if (to !== 'start' && from !== 'end') {
            acc.push({
                from: from,
                to: to,
                bigCave: to === _.toUpper(to)
            });
        }

        if (from !== 'start' && to !== 'end') {
            acc.push({
                from: to,
                to: from,
                bigCave: from === _.toUpper(from)
            });
        }

        return acc;
    }, []);
}

let pathsFound = 0;
function nextNode(current, pathOptions, history, secondSmallVisit) {
    history.push(current);
    const currentOptions = _.filter(pathOptions, { from: current });

    _.forEach(currentOptions, (currentOption) => {
        const newHistory = _.cloneDeep(history);
        if (currentOption.to === 'end') {
            newHistory.push('end');
            console.log('FOUND', JSON.stringify(newHistory));
            pathsFound++;
        } else if (currentOption.bigCave) {
            nextNode(currentOption.to, pathOptions, newHistory, secondSmallVisit);
        } else if (!_.includes(newHistory, currentOption.to)) {
            nextNode(currentOption.to, pathOptions, newHistory, secondSmallVisit);
        } else if (!secondSmallVisit) {
            nextNode(currentOption.to, pathOptions, newHistory, true);
        }
    });
}

function main() {
    const inputLines = util.loadInput(input);

    const pathOptions = parse(inputLines);

    nextNode('start', pathOptions, [], false);

    console.log('pathsFound', pathsFound);
}

main();
