import { useEffect, useState } from 'react';
import Header from './Header';
import Dummy from './Dummy';
import Solution from './Solution';
import ErrorLetters from './ErrorLetters';
import Form from './Form';
import Footer from './Footer';
import Instructions from './Instructions';
import Options from './Options';
import Loading from './Loading';
import Message from './Message';
// api
import getWordFromApi from '../services/api';
// styles
import '../styles/App.scss';
import '../styles/Form.scss';

import { Routes, Route } from 'react-router-dom';

function App() {
  const [word, setWord] = useState('');
  const [userLetters, setUserLetters] = useState([]);
  const [lastLetter, setLastLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getWordFromApi().then((word) => {
      setWord(word);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
  if (userLetters.length > 0 && checkIfUserWon(word, userLetters)) {
    setHasWon(true);
  }
}, [word, userLetters]);

  function checkIfUserWon(word, userLetters) {
  const wordLetters = new Set(word.split(''));
  const guessedLetters = new Set(userLetters);
  return wordLetters.size === guessedLetters.size && [...wordLetters].every((letter) => guessedLetters.has(letter));
}

  const getNumberOfErrors = () => {
    const errorLetters = userLetters.filter(
      (letter) => word.includes(letter) === false
    );
    return errorLetters.length;
  };

  const handleLastLetter = (value) => {
    value = value.toLocaleLowerCase();
    setLastLetter(value);

    if (!userLetters.includes(value)) {
      userLetters.push(value);
      setUserLetters([...userLetters]);
    }
  };

  const handleChange = (ev) => {
    setWord(ev.target.value);
  };

  return (
    <div className="page">
      <Header />
      <Loading isLoading={isLoading} />
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <section>
                <Solution word={word} userLetters={userLetters} />
                <ErrorLetters word={word} userLetters={userLetters} />
                {hasWon && <Message/>}
                <Form
                  lastLetter={lastLetter}
                  handleLastLetter={handleLastLetter}
                />
              </section>
            }
          ></Route>
          <Route
            path="/instructions"
            element={
              <>
                <Instructions></Instructions>
              </>
            }
          ></Route>
          <Route
            path="/options"
            element={
              <>
                <Options word={word} handleChange={handleChange}></Options>
              </>
            }
          ></Route>
        </Routes>
        <Dummy number={getNumberOfErrors()} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
