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
  
  const [rightLetters, setRightLetters] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    getWordFromApi().then((word) => {
      setWord(word);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (rightLetters.length > 0 && checkIfUserWon()) {
      setHasWon(true);
    }
}, [rightLetters]);

function checkIfUserWon() {
  const wordLetters = [];
  word.split("").map((oneChar) => !wordLetters.includes(oneChar) && wordLetters.push(oneChar));
  return wordLetters.length === rightLetters.length && wordLetters.every((value) => rightLetters.includes(value));
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

    if (!userLetters.includes(value) && value !== "") {
      userLetters.push(value);
      setUserLetters([...userLetters]);
    }

    if(word.includes(value) && value !== ""){
      rightLetters.push(value);
      setRightLetters([...rightLetters])
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
                <Form
                  lastLetter={lastLetter}
                  handleLastLetter={handleLastLetter}
                />
                {hasWon && <Message/>}
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
