import _ from 'lodash';

let minCost = 999999;
const stateMap = new Map();

const stoppable = [0, 1, 3, 5, 7, 9, 10];
const homes = {
    'A': 0,
    'B': 1,
    'C': 2,
    'D': 3
};
const inverseHomes = _.invert(homes);
const scores = {
    'A': 1,
    'B': 10,
    'C': 100,
    'D': 1000
};

function success(state) {
    const rooms = state.rooms;
    return (
        (rooms[0][0] === 'A' && rooms[0][1] === 'A' && rooms[0][2] === 'A' && rooms[0][3] === 'A') &&
        (rooms[1][0] === 'B' && rooms[1][1] === 'B' && rooms[1][2] === 'B' && rooms[1][3] === 'B') &&
        (rooms[2][0] === 'C' && rooms[2][1] === 'C' && rooms[2][2] === 'C' && rooms[2][3] === 'C') &&
        (rooms[3][0] === 'D' && rooms[3][1] === 'D' && rooms[3][2] === 'D' && rooms[3][3] === 'D')
    );
}

function getStateKey(state) {
    return _.flattenDeep([state.hall, state.rooms]).join('');
}

function step(state) {
    if (state.cost > minCost) {
        return;
    } else if (success(state)) {
        minCost = state.cost;
        return;
    }

    const stateKey = getStateKey(state);
    if ((stateMap.get(stateKey) || 999999) < state.cost) {
        return;
    }

    stateMap.set(stateKey, state.cost);

    _.forEach(state.hall, (hallSpot, hallIndex) => {
        if (hallSpot === '.' || !_.includes(stoppable, hallIndex)) {
            return;
        }

        const char = hallSpot;
        const homeIndex = homes[char];
        let targetRoom = null;
        if (state.rooms[homeIndex][0] === '.' && state.rooms[homeIndex][1] === '.' && state.rooms[homeIndex][2] === '.' && state.rooms[homeIndex][3] === '.') {
            targetRoom = 3;
        } else if (state.rooms[homeIndex][0] === '.' && state.rooms[homeIndex][1] === '.' && state.rooms[homeIndex][2] === '.' && state.rooms[homeIndex][3] === char) {
            targetRoom = 2;
        } else if (state.rooms[homeIndex][0] === '.' && state.rooms[homeIndex][1] === '.' && state.rooms[homeIndex][2] === char && state.rooms[homeIndex][3] === char) {
            targetRoom = 1;
        } else if (state.rooms[homeIndex][0] === '.' && state.rooms[homeIndex][1] === char && state.rooms[homeIndex][2] === char && state.rooms[homeIndex][3] === char) {
            targetRoom = 0;
        }

        if (!_.isNil(targetRoom)) {
            const targetHallIndex = (homeIndex * 2) + 2;

            let hallChunk;
            if (hallIndex > targetHallIndex) {
                hallChunk = _.slice(state.hall, targetHallIndex, hallIndex);
            } else {
                hallChunk = _.slice(state.hall, hallIndex + 1, targetHallIndex + 1);
            }

            const canMove = _.every(hallChunk, (chunk) => {
                return chunk === '.';
            });

            if (canMove) {
                const cloneState = _.cloneDeep(state);
                cloneState.hall[hallIndex] = '.';
                cloneState.rooms[homeIndex][targetRoom] = char;
                cloneState.cost += scores[char] * (hallChunk.length + targetRoom + 1);

                step(cloneState);
            }
        }
    });

    _.forEach(state.rooms, (roomList, homeIndex) => {
        if (
            (roomList[0] === inverseHomes[homeIndex] && roomList[1] === inverseHomes[homeIndex] && roomList[2] === inverseHomes[homeIndex] && roomList[3] === inverseHomes[homeIndex]) ||
            (roomList[0] === '.' && roomList[1] === inverseHomes[homeIndex] && roomList[2] === inverseHomes[homeIndex] && roomList[3] === inverseHomes[homeIndex]) ||
            (roomList[0] === '.' && roomList[1] === '.' && roomList[2] === inverseHomes[homeIndex] && roomList[3] === inverseHomes[homeIndex]) ||
            (roomList[0] === '.' && roomList[1] === '.' && roomList[2] === '.' && roomList[3] === inverseHomes[homeIndex]) ||
            (roomList[0] === '.' && roomList[1] === '.' && roomList[2] === '.' && roomList[3] === '.')
        ) {
            return;
        }

        let targetRoom = 0;
        if (_.includes(roomList, '.')) {
            targetRoom = _.lastIndexOf(roomList, '.') + 1;
        }

        const char = roomList[targetRoom];
        const targetHallIndex = (homeIndex * 2) + 2;

        _.forEach(state.hall, (hallSpot, hallIndex) => {
            if (hallSpot !== '.' || !_.includes(stoppable, hallIndex)) {
                return;
            }

            let hallChunk;
            if (hallIndex > targetHallIndex) {
                hallChunk = _.slice(state.hall, targetHallIndex, hallIndex);
            } else {
                hallChunk = _.slice(state.hall, hallIndex + 1, targetHallIndex + 1);
            }

            const canMove = _.every(hallChunk, (chunk) => {
                return chunk === '.';
            });

            if (canMove) {
                const cloneState = _.cloneDeep(state);
                cloneState.hall[hallIndex] = char;
                cloneState.rooms[homeIndex][targetRoom] = '.';
                cloneState.cost += scores[char] * (hallChunk.length + targetRoom + 1);

                step(cloneState);
            }
        });
    });
}

function main() {
    console.time();

    // const rooms = [ ['B', 'A'], ['A', 'B'], ['C', 'C'], ['D', 'D'] ];
    // const rooms = [ ['B', 'D', 'D', 'A'], ['C', 'C', 'B', 'D'], ['B', 'B', 'A', 'C'], ['D', 'A', 'C', 'A'] ];
    const rooms = [ ['C', 'D', 'D', 'B'], ['A', 'C', 'B', 'A'], ['B', 'B', 'A', 'D'], ['D', 'A', 'C', 'C'] ];

    const state = {
        hall: _.fill(new Array(11), '.'),
        rooms: rooms,
        cost: 0
    };

    step(state);

    console.log('minCost', minCost);

    console.timeEnd();
}

main();
