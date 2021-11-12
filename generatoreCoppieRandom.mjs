/**
 * This is the combination generator
 * @param  {Number[]} inputSet - the set of n elements
 * @param  {number} k - the "at a time" part, like 3 elements 2 "at a time"
 * @return {Array.<Number[]>} returns an array of arrays of numbers, like [[1, 2], [2, 3], [3, 2]]
 */
export {
    daComboGenerator,
    uniqueRangeGenerator
};

function daComboGenerator(inputSet, k) {
    return (function subsetRecurser(subset, inputSetIndex, subsetIndex, result) {
        // set up some defaults
        inputSetIndex = inputSetIndex || 0
        subsetIndex = subsetIndex || 0
        subset = subset || []
        result = result || []

        // if true, the current is done being built, so push it into `result`
        if (subsetIndex === k) {
            // the .slice() here returns a clone of the subset array
            // it took way too much time out of my life to catch this stupid thing
            result.push(subset.slice())
            return
        }

        // stop once we've iterated through all of the `inputSet`
        if (inputSetIndex >= inputSet.length) {
            return
        }

        // build the subset array
        // notice how we're just replacing previous values whenever we rebuild
        subset[subsetIndex] = inputSet[inputSetIndex]

        // recurse through each subset
        subsetRecurser(subset, inputSetIndex + 1, subsetIndex + 1, result)

        // recurse through each member of the inputSet
        subsetRecurser(subset, inputSetIndex + 1, subsetIndex, result)

        // return the result
        return result
    })()
}

// the simplest factorial function in the world...
function factorial(num) {
    if (num <= 1) {
        return 1
    }

    return num * this.factorial(num - 1)
}

// something to test `daComboGenerator()` results with
// this function uses the binomial coeffecient to figure out
// how many ways n things can be taken k at a time or
// n! / (k!(n-k)!)
function daComboCounter(n, k) {
    return factorial(n) / (factorial(k) * factorial(n - k))
}

// returns a random number
function randomNumberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// returns a range of unique numbers, each between min and max, including min and max
function uniqueRangeGenerator(min, max) {
    const range = []

    while (range.length < (max - min + 1)) {
        var randomNumber = randomNumberGenerator(min, max)

        if (range.indexOf(randomNumber) === -1) {
            range.push(randomNumber)
        }
    }
    return range
}


// /**
//  * MOMENT OF TRUTH...
//  */
// const uniqueRange = uniqueRangeGenerator(0, 9)
// const generatedPairs = daComboGenerator(uniqueRange, 2)
// const expectedNumberOfPairs = daComboCounter(uniqueRange.length, 2)

// console.log('Given a range of unique numbers like:')
// console.log(uniqueRange) // returns something like [ 7, 8, 6, 0, 4, 1, 5, 2, 3, 9 ]
// console.log('These are all the different possible pairs:');
// console.log(generatedPairs) // returns something like:
// // [ [ 7, 8 ],
// //   [ 7, 6 ],
// //   [ 7, 0 ],
// //   [ 7, 4 ],
// //   [ 7, 1 ],
// //   [ 7, 5 ],
// //   [ 7, 2 ],
// //   [ 7, 3 ],
// //   [ 7, 9 ],
// //   [ 8, 6 ],
// //   [ 8, 0 ],
// //   [ 8, 4 ],
// //   [ 8, 1 ],
// //   [ 8, 5 ],
// //   [ 8, 2 ],
// //   [ 8, 3 ],
// //   [ 8, 9 ],
// //   [ 6, 0 ],
// //   [ 6, 4 ],
// //   [ 6, 1 ],
// //   [ 6, 5 ],
// //   [ 6, 2 ],
// //   [ 6, 3 ],
// //   [ 6, 9 ],
// //   [ 0, 4 ],
// //   [ 0, 1 ],
// //   [ 0, 5 ],
// //   [ 0, 2 ],
// //   [ 0, 3 ],
// //   [ 0, 9 ],
// //   [ 4, 1 ],
// //   [ 4, 5 ],
// //   [ 4, 2 ],
// //   [ 4, 3 ],
// //   [ 4, 9 ],
// //   [ 1, 5 ],
// //   [ 1, 2 ],
// //   [ 1, 3 ],
// //   [ 1, 9 ],
// //   [ 5, 2 ],
// //   [ 5, 3 ],
// //   [ 5, 9 ],
// //   [ 2, 3 ],
// //   [ 2, 9 ],
// //   [ 3, 9 ] ]

// console.log(`There should be ${generatedPairs.length} different possible pairs...`);

// if (expectedNumberOfPairs === generatedPairs.length) {
//     console.log('... and there are!!!!');
// } else {
//     console.log('... and there are NOT!!!!');
// }