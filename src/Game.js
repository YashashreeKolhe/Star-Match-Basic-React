import React, { useState, useEffect } from 'react';
import './Game.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import StarComponent from './components/StarComponent';
import NumberComponent from './components/NumberComponent';
import utils from './utils';
import PlayAgainComponent from './components/PlayAgainComponent';

function Game() {
  const [star, setStar] = useState(utils.random(1, 9));
  const [available, setAvailable] = useState(utils.range(1, 9));
  const [candidates, setCandidate] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  const gameOver = available.length === 0 || secondsLeft === 0;
  const gameStatus = available.length === 0 ? 'won' : (secondsLeft > 0 ? 'active' : 'lost');

  useEffect(() => {
    if (secondsLeft > 0 && available.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  });

  const handleClick = (num, currentStatus) => {
    if (gameStatus !== 'active' || currentStatus === 'used') {
      return;
    }

    var newCandidateNums = (currentStatus === 'available')
      ? candidates.concat(num)
      : candidates.filter(cn => cn !== num);
    if (utils.sum(newCandidateNums) !== star) {
      setCandidate(newCandidateNums);
    } else {
      var newAvailableNums = available.filter(an => !newCandidateNums.includes(an));
      setStar(generateSubsequentStarCount(newAvailableNums));
      setAvailable(newAvailableNums);
      setCandidate([]);
    }
  };

  const numberStatus = (num) => {
    if (!available.includes(num)) {
      return 'used';
    }

    if (candidates.includes(num)) {
      if (utils.sum(candidates) > star) {
        return 'wrong';
      } else {
        return 'candidate';
      }
    }
    return 'available';
  };

  const generateSubsequentStarCount = (newAvailableNums) => {
    const subsets = getAllSubsets(newAvailableNums);
    console.log(newAvailableNums);
    var sums = subsets.map(subset => utils.sum(subset)).filter(sum => sum <= 9 && sum > 0);
    var set = new Set(sums);
    sums = [...set.keys()];
    console.log(sums);
    console.log(sums[utils.random(0, sums.length-1)]);
    return sums[utils.random(0, sums.length-1)];
  }

  const getAllSubsets = 
    theArray => theArray.reduce(
      (subsets, value) => subsets.concat(
        subsets.map(set => [value,...set])
      ),
      [[]]
    );

  const resetGame = () => {
    setStar(utils.random(1, 9));
    setAvailable(utils.range(1, 9));
    setCandidate([]);
    setSecondsLeft(10);
  }

  return (
    <div className="App">
      <h2>Star Match</h2>
      <header className="App-header">
        <p>
          Pick a Number(s) that equals the number of stars displayed on the screen, until all the numbers between '1-9' are used up
        </p>
      </header>
      <div className="body">
        { gameOver ? (
          <PlayAgainComponent onClick={resetGame} gameStatus={gameStatus}/> 
        ) : (
          <StarComponent count={star}/>
        )
        }
        <div className="bordered-box">
          {utils.range(1, 9).map(num =>
            <NumberComponent key={num} num={num} status={numberStatus(num)} onClick={handleClick}/>
          )}
        </div>
      </div>
        <p>Time remaining: {secondsLeft}</p>
    </div>
  );
}

export default Game;
