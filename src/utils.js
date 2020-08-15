import _ from 'lodash';

const utils = {
  sum: arr => _.sum(arr),

  range: (min, max) => _.range(min, max+1, 1),

  random: (min, max) => _.random(min, max),

  randomSumIn: (arr, max) => {
    const sumsArray = [];
    let set = [];
    for (let i = 0; i< 1 << arr.length ; i++) {
      set = [];
      for (let j = 0; j < arr.length; j++) {
        if ((i & (1<<j)) > 0) {
          set.push(arr[j]);
        }
      }
      const sum = _.sum(set);
      if (!sumsArray.includes(sum)) {
        sumsArray.push(sum);
      }
    }
    console.log(sumsArray);
    return sumsArray[Math.floor(Math.random * max)];
  }
}

export default utils;