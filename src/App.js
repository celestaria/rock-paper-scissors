import { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [userChoice, setUserChoice] = useState('empty')
  const [computerChoice, setComputerChoice] = useState('empty')
  const [userPoints, setUserPoints] = useState(0)
  const [computerPoints, setComputerPoints] = useState(0)
  const [turnResult, setTurnResult] = useState(null)
  const [result, setResult] = useState("Let's see who wins")
  const [gameOver, setGameOver] = useState(false)
  const choices = ['rock', 'paper', 'scissors']

  const handleClick = (value) => {
    if (!gameOver && value !== 'empty') {
    setUserChoice(value)    
    generateComputerChoice()
    }
  }

  const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)]
    setComputerChoice(randomChoice)
  }

  const reset = () => {
    window.location.reload()
  }

  useEffect(() => {
    const comboMoves = userChoice + computerChoice
    if (userPoints <= 9 && computerPoints <= 9) {
      if (comboMoves === 'emptyempty') {
        setTurnResult("Start!")
      }
      if (comboMoves === 'scissorspaper' || comboMoves === 'rockscissors' || comboMoves === 'paperrock') {
        // userPoints.current += 1
        const updatedUserPoints = userPoints + 1
        setUserPoints(updatedUserPoints)
        setTurnResult("Your Point!")
        if (updatedUserPoints === 10){
          setResult('You Win!')
          const gameOff = true
          setGameOver(gameOff)
        }
      }

      if (comboMoves === 'paperscissors' || comboMoves === 'scissorsrock' || comboMoves === 'rockpaper') {
        // computerPoints.current += 1
        const updatedComputerPoints = computerPoints + 1
        setComputerPoints(updatedComputerPoints)
        setTurnResult("Computer's Point!")
        if (updatedComputerPoints === 10) {
          setResult('Computer Wins!')
          const gameOff = true
          setGameOver(gameOff)
        }
      }

      if (comboMoves === 'paperpaper' || comboMoves === 'rockrock' || comboMoves === 'scissorsscissors') {
        setTurnResult("No Point!")
      }
    }
  }, [computerChoice, userChoice])

  return (
    <div className="App">
      <h1 className='heading'>Rock Paper Scissors</h1>
      <div className='score'>
        <h1>Your Points: {userPoints}</h1>
        <h1>Computer's Points: {computerPoints}</h1>
      </div>
      <div className='result'>
        <h1>{turnResult}</h1>
      </div>
      {(userChoice == 'empty' && computerChoice == 'empty') && (
              <div className='choice'>
              <div className='choice-user'>
                <img className='user-choice' src={`../images/empty.png`} alt=''></img>
              </div>
              <div className='choice-computer'>
                <img className='computer-choice' src={`../images/empty.png`} alt=''></img>
              </div>
              </div>
      )}
      {(userChoice !== 'empty' && computerChoice !== 'empty') && (
      <div className='choice'>
        <div className='choice-user'>
          <img className='user-choice' src={`../images/${userChoice}.png`} alt=''></img>
        </div>
        <div className='choice-computer'>
          <img className='computer-choice' src={`../images/${computerChoice}.png`} alt=''></img>
        </div>
      </div>
      )}
      <div className='button-div'>
        {choices.map((choice, index) =>
          <button className='button' key={index} onClick={() => handleClick(choice)} disabled={gameOver}>
            {choice} 
          </button>
        )}
      </div>
      <div className='button-div'>
        {gameOver && 
          <button className='button' onClick={() => reset()}>Restart Game?</button>
        }
      </div>
      <div className='result'>
        {gameOver && (
          <h1>{result}</h1>
      )}
      </div>
    </div>
    )
  }

export default App