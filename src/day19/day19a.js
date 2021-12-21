import _ from 'lodash';
import fs from 'fs';

// const input = 'input.test.txt';
const input = 'input.txt';

let size = 0;

const orientations = [
    { key: '01', x:{ key: 'x', mod:  1 }, y:{ key: 'y', mod:  1 }, z:{ key: 'z', mod:  1 } },
    { key: '02', x:{ key: 'x', mod:  1 }, y:{ key: 'z', mod: -1 }, z:{ key: 'y', mod:  1 } },
    { key: '03', x:{ key: 'x', mod:  1 }, y:{ key: 'y', mod: -1 }, z:{ key: 'z', mod: -1 } },
    { key: '04', x:{ key: 'x', mod:  1 }, y:{ key: 'z', mod:  1 }, z:{ key: 'y', mod: -1 } },
    { key: '05', x:{ key: 'x', mod: -1 }, y:{ key: 'y', mod:  1 }, z:{ key: 'z', mod: -1 } },
    { key: '06', x:{ key: 'x', mod: -1 }, y:{ key: 'z', mod:  1 }, z:{ key: 'y', mod:  1 } },
    { key: '07', x:{ key: 'x', mod: -1 }, y:{ key: 'y', mod: -1 }, z:{ key: 'z', mod:  1 } },
    { key: '08', x:{ key: 'x', mod: -1 }, y:{ key: 'z', mod: -1 }, z:{ key: 'y', mod: -1 } },
    { key: '09', x:{ key: 'y', mod:  1 }, y:{ key: 'z', mod:  1 }, z:{ key: 'x', mod:  1 } },
    { key: '10', x:{ key: 'y', mod:  1 }, y:{ key: 'x', mod: -1 }, z:{ key: 'z', mod:  1 } },
    { key: '11', x:{ key: 'y', mod:  1 }, y:{ key: 'z', mod: -1 }, z:{ key: 'x', mod: -1 } },
    { key: '12', x:{ key: 'y', mod:  1 }, y:{ key: 'x', mod:  1 }, z:{ key: 'z', mod: -1 } },
    { key: '13', x:{ key: 'y', mod: -1 }, y:{ key: 'z', mod: -1 }, z:{ key: 'x', mod:  1 } },
    { key: '14', x:{ key: 'y', mod: -1 }, y:{ key: 'x', mod: -1 }, z:{ key: 'z', mod: -1 } },
    { key: '15', x:{ key: 'y', mod: -1 }, y:{ key: 'z', mod:  1 }, z:{ key: 'x', mod: -1 } },
    { key: '16', x:{ key: 'y', mod: -1 }, y:{ key: 'x', mod:  1 }, z:{ key: 'z', mod:  1 } },
    { key: '17', x:{ key: 'z', mod:  1 }, y:{ key: 'y', mod: -1 }, z:{ key: 'x', mod:  1 } },
    { key: '18', x:{ key: 'z', mod:  1 }, y:{ key: 'x', mod: -1 }, z:{ key: 'y', mod: -1 } },
    { key: '19', x:{ key: 'z', mod:  1 }, y:{ key: 'y', mod:  1 }, z:{ key: 'x', mod: -1 } },
    { key: '20', x:{ key: 'z', mod:  1 }, y:{ key: 'x', mod:  1 }, z:{ key: 'y', mod:  1 } },
    { key: '21', x:{ key: 'z', mod: -1 }, y:{ key: 'y', mod:  1 }, z:{ key: 'x', mod:  1 } },
    { key: '22', x:{ key: 'z', mod: -1 }, y:{ key: 'x', mod: -1 }, z:{ key: 'y', mod:  1 } },
    { key: '23', x:{ key: 'z', mod: -1 }, y:{ key: 'y', mod: -1 }, z:{ key: 'x', mod: -1 } },
    { key: '24', x:{ key: 'z', mod: -1 }, y:{ key: 'x', mod:  1 }, z:{ key: 'y', mod: -1 } },
];

function loadInput(filePath) {
    const fileInput = fs.readFileSync(filePath);
    const listInput = _.split(fileInput, '\n\n');

    return _.map(listInput, (scannerString) => {
        const [ title, ...rows ] = _.compact(scannerString.split('\n'));

        const points = _.map(rows, (row) => {
            const [x, y, z] = row.split(',');

            return {
                x: _.parseInt(x),
                y: _.parseInt(y),
                z: _.parseInt(z)
            };
        });

        return {
            title,
            points
        };
    });
}

function compare(nScanner, scanner2) {
    const result = {
        found: false
    };

    _.forEach(orientations, (orientation) => {
        if (result.found) {
            return;
        }
        const scores = {};
        _.forEach(nScanner.points, (point1) => {
            _.forEach(scanner2.points, (point2) => {
                const x = point1.x - ((point2[orientation.x.key] * orientation.x.mod));
                const y = point1.y - ((point2[orientation.y.key] * orientation.y.mod));
                const z = point1.z - ((point2[orientation.z.key] * orientation.z.mod));

                scores[`${x},${y},${z}`] = (scores[`${x},${y},${z}`] || 0) + 1;
            });
        });

        _.forEach(scores, (value, key) => {
            if (value >= 12) {
                result.found = true;
                result.shift = key;
                result.orientation = orientation;
            }
        });
    });

    return result;
}

function findMatch(normalized, scanners) {
    const result = {
        found: false
    };

    _.forEach(normalized, (nScanner) => {
        if (result.found) {
            return;
        }

        _.forEach(scanners, (scanner2) => {
            if (result.found) {
                return;
            }

            const compareResult = compare(nScanner, scanner2);
            if (compareResult.found) {
                const normalizedScanner2 = normalize(scanner2, compareResult.shift, compareResult.orientation);
                result.found = true;
                result.normalized = [
                    ...normalized,
                    normalizedScanner2
                ];
                result.scanners = _.filter(scanners, (scanner) => {
                    return scanner.title !== normalizedScanner2.title;
                });
            }
        });
    });

    return result;
}

function normalize(scanner, shift, orientation) {
    const [xx, yy, zz] = _.map(shift.split(','), _.parseInt);

    scanner.points = _.map(scanner.points, (point) => {
        return {
            x: (point[orientation.x.key] * orientation.x.mod) + xx,
            y: (point[orientation.y.key] * orientation.y.mod) + yy,
            z: (point[orientation.z.key] * orientation.z.mod) + zz,
        };
    });

    return scanner;
}

function main() {
    console.time();

    let [ normalized, ...scanners ] = loadInput(input);
    size = normalized.points.length;
    normalized = [ normalized ];

    let lookForMatches = true;
    while (lookForMatches) {
        const matchResult = findMatch(normalized, scanners);
        lookForMatches = matchResult.found;
        if (matchResult.found) {
            normalized = matchResult.normalized;
            scanners = matchResult.scanners;
        }
    }

    const rawPoints = _.flatten(_.map(normalized, 'points'));
    const strPoints = _.map(rawPoints, (point) => {
        return `${point.x},${point.y},${point.z}`;
    });
    const uniquePoints = _.uniq(strPoints);

    console.log('uniquePoints', uniquePoints.length);

    console.timeEnd();
}

main();
