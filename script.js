function calculate(set) {
    let mapo = new Map();

    function calculateInternal(set) {
        if (set.size === 1) {
            if (set.values().next().value.first === 107) {
                let s = new Set();
                s.add(set.values().next().value.second.first);
                return s;
            }
            return new Set();
        }

        let serializedSet = JSON.stringify([...set]);
        if (mapo.has(serializedSet)) {
            return mapo.get(serializedSet);
        }

        let solutions = new Set();
        let setArray = [...set];
        for (let i = 0; i < setArray.length; i++) {
            for (let j = 0; j < setArray.length; j++) {
                if (i === j) continue;

                // Check various conditions and create new sets/rep
                // Perform addition
                if (setArray[i].second.second.first.first.second && setArray[j].second.second.first.first.second) {
                    let newSet = new Set([...set].filter((_, index) => index !== i && index !== j));
                    let newRep = {
                        first: setArray[i].first + setArray[j].first,
                        second: {
                            first: `${setArray[i].second.first} + ${setArray[j].second.first}`,
                            second: {
                                first: { first: false, second: setArray[i].second.second.first.second && setArray[j].second.second.first.second },
                                second: { first: false, second: setArray[j].first }
                            }
                        }
                    };
                    newSet.add(newRep);
                    for (let k of calculateInternal(newSet)) {
                        solutions.add(k);
                    }
                }

                // Perform other operations: subtraction, multiplication, division
                // Similar checks and set operations for each
            }
        }

        mapo.set(serializedSet, solutions);
        return solutions;
    }

    return calculateInternal(set);
}

function main(a, b, c, d, e) {
    let set = new Set();
    let values = [a, b, c, d, e];
    values.forEach(value => {
        set.add({
            first: value,
            second: {
                first: value.toString(),
                second: {
                    first: { first: true, second: true },
                    second: { first: true, second: value }
                }
            }
        });
    });

    return [...calculate(set)];
}

document.getElementById('inputForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let a = parseFloat(document.getElementById('a').value);
    let b = parseFloat(document.getElementById('b').value);
    let c = parseFloat(document.getElementById('c').value);
    let d = parseFloat(document.getElementById('d').value);
    let e = parseFloat(document.getElementById('e').value);

    let results = main(a, b, c, d, e);

    let outputDiv = document.getElementById('output');
    outputDiv.innerHTML = 'Results:<br>' + results.join('<br>');
});
