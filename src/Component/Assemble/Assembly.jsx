import React, { useState } from 'react'
import './Assembly.css'
import {clsx} from "clsx"
import { languages } from '../../language'
import { getFarewellText, getRandomWord} from '../../utils'
import Confetti from "react-confetti"




const Assembly = () => {
      //state values

      const [currentWord, setCurrentWord] = useState(() => getRandomWord())
      const [guessedWord, setGuessedWord] = useState([])
     


      //Derived value
      const wrongGuessCount    = 
      guessedWord.filter(letter => !currentWord.includes(letter)).length

      const isGameWon = 
            currentWord.split("").every(letter => guessedWord.includes(letter))
      const isGameLost = 
            wrongGuessCount    >= languages.length - 1
      const isGameover =
            isGameLost || isGameWon
      const isLastGuessLetter = guessedWord[guessedWord.length -1]
      const isLastGuessIncorrect = isLastGuessLetter && !currentWord.includes(isLastGuessLetter)
      console.log(isLastGuessIncorrect)

   

      //static value

      const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

      function guessedLetter(letter) {
        setGuessedWord(prevWords => 
            prevWords.includes(letter) ? prevWords : [...prevWords, letter]
        )
      }

      function startNewgame() {
            setCurrentWord(getRandomWord())
            setGuessedWord([])
      }


      const languageElements = languages.map((language, index) => {
            const islanguageLost = index < wrongGuessCount  
           return(
            <span className={`chip ${islanguageLost ? "lost" : ""}`}
             style={{backgroundColor: language.backgroundColor, color: language.color}}
             key={index}>
            {language.name}
      </span>
           )
      })

      const letterElements = currentWord.split('').map((letter, index) => {

            const shouldShow = guessedWord.includes(letter) || isGameover
            const className = clsx(
                  isGameLost  && !guessedWord.includes(letter) && "missed-letters"
            )

            return(
                  <span key={index} className={className}>
                        {shouldShow ? letter.toUpperCase() : ""} 
                  </span>
            )
      })


      const keyboardElements = alphabet.map((letter, index) => {

            const isGuessed = guessedWord.includes(letter)
            const isCorrect = isGuessed && currentWord.includes(letter)
            const isWrong = isGuessed && !currentWord.includes(letter)


            const className = clsx({
                  correct : isCorrect,
                  wrong : isWrong
            })
            console.log(isGuessed)
           

            return(     
                  <button className={className} disabled ={isGameover} onClick={() => guessedLetter(letter)} key={index}>
                        {letter.toUpperCase()}
                  </button>
            )
      })

      const  gameStatusClass = clsx("game-status",{
            won: isGameWon,
            lost: isGameLost,
            farewell: !isGameover && isLastGuessIncorrect
      })

  return (
    <div>
      {isGameWon  && <Confetti recycle = {false}
                        numberOfPieces = {1000}
                        />  }
      <header>
            <h1>Assembly:Endgame</h1>
            <p>Guess the word within 8 attempts to keep the programing world safe from Assembly!</p>
      </header>
      <section className={gameStatusClass}>
            { 
            !isGameover && isLastGuessIncorrect ?
            <p className='farewell-message '> 
                  {getFarewellText(languages[wrongGuessCount -1].name)}
            </p>:
            
            isGameover ? (
                 isGameWon ? (
                  <>
                  <h2>You win</h2>
                  <p>Well done!</p>
                  </>
                 ):
                 (
                  <>
                  <h2>You Lose</h2>
                  <p>You lose Better start learning Assembly!</p>
                  </>
                 )
            ):(
                  null
            )
            }
      </section>
      <section className='language-chips'>
            {languageElements}      
      </section>
      <section className='word'>
            {letterElements}
      </section>
      <section className='keyboard'>
            {keyboardElements}
      </section>
      <section>
            <p>
                  {currentWord.includes(isLastGuessLetter) ? `Correct! the letter ${isLastGuessLetter} is in the word.` : `Sorry! the letter ${isLastGuessLetter} is not in the word. `}
                  you have {languages.length - 1 - wrongGuessCount} attempts left.
            </p>
      </section>
            {isGameover && <button className='game-btn' onClick={startNewgame}>New Game</button>}    
    </div>
  )
}

export default Assembly