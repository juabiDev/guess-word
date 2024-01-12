import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import './App.css'
import { ListLetters } from './components/ListLetters'
import { ListSquares } from './components/ListSquares'

function useRandomWord() {
  const [secretWord, setSecretWord] = useState("")

  const getRandomWord = () => {
    return fetch("https://api.api-ninjas.com/v1/facts?limit=1",{
      headers: { 'X-Api-Key': 'GiumtZnOiLAmm6nq6USxjQ==tJrRatBPPVho1hYY'},
      contentType: 'application/json'
    })
    .then(result => result.json())
    .then(data => {
      return data[0].fact.split(" ")[0]
    })
  }

  const changeRandomWord = () => {
    getRandomWord().then(word => setSecretWord(word))
  }

  useEffect(changeRandomWord,[])

  return { secretWord, changeRandomWord }
}

function useGuessWord({ secretWord }) {
  const [guessWord, setGuessWord] = useState([])
  const [winner, setWinner] = useState(false)

  useEffect(() => {
    if(!secretWord) return

    const calcultateRandomLetters = () => {
      const arr = Array.from(secretWord).fill("")
      const lengthSecretWord = Math.floor(secretWord.length / 2)
      const newArr = new Array(lengthSecretWord).fill("")
      const coso = newArr.map((element, index, arr) => {
        const number = Math.floor(Math.random() * secretWord.length) 
        return number
      })
    
      const newArr2 = arr.map((element, index, arr) => {
        if(coso.includes(index)) {
          return secretWord[index]
        }
    
        return ""
      })
  
      return newArr2
    }
    
    setGuessWord(calcultateRandomLetters())
  },[secretWord])

  useEffect(() => {
    if(!guessWord.length) return
    
    const isWinner = secretWord.toLowerCase() === guessWord.join("").toLowerCase()
    const anySpaceBlank = guessWord.every(element => element !== "")
    
    if(isWinner) {
      setWinner(true)
      confetti();
    } else if(anySpaceBlank) {
      const newGuessWord = guessWord.map((letter, index) => {
        if(letter === secretWord[index]) {
          return letter
        }

        return ""
      })

      setGuessWord(newGuessWord)
      setWinner(false)
    } else {
      setWinner(false)
    }

  },[guessWord])

  const handleChange = (letter) => {
    const espacioVacio = guessWord.indexOf("")
    if(espacioVacio === -1) return
    const newGuessWord = [...guessWord]
    newGuessWord[espacioVacio] = letter
    setGuessWord(newGuessWord)
  }

  return { guessWord, handleChange, winner }
}


function App () {
  const { secretWord, changeRandomWord } = useRandomWord()
  const { guessWord, handleChange, winner } = useGuessWord({ secretWord })

  return (
    <main>
      <h1>Adivina la palabra</h1>
      <ListSquares guessWord={guessWord} />
      { winner && <p>"Felicidades, Has Ganado!"</p>}
      <ListLetters onChange={handleChange} />
      <button onClick={changeRandomWord}>Reiniciar</button>
    </main>
  )
}

export default App
