import { useEffect, useState } from 'react';
import Header from './Header';
import Dummy from './Dummy';
import Solution from './Solution';
import ErrorLetters from './ErrorLetters';
import Form from './Form';
import Footer from './Footer';
import Instructions from './Instructions';
import Options from './Options';
// api
import getWordFromApi from '../services/api';
// styles
import '../styles/App.scss';
import '../styles/Form.scss';

import { Routes, Route } from "react-router-dom";

function App() {
  const [word, setWord] = useState('');
  const [userLetters, setUserLetters] = useState([]);
  const [lastLetter, setLastLetter] = useState('');

  useEffect(() => {
    getWordFromApi().then((word) => {
      setWord(word);
    });
  }, []);

  // events

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
  }

  return (
    <div className="page">
      <Header />
      <main className="main">
        <Routes>
          <Route path='/' element={
          <section> 
          <Solution word={word} userLetters={userLetters} />
          <ErrorLetters word={word} userLetters={userLetters} />
          <Form lastLetter={lastLetter} handleLastLetter={handleLastLetter} />
          </section>}></Route>
          <Route path='/instructions' element={<Instructions></Instructions>}></Route>
          <Route path='/options' element={<Options word={word} handleChange={handleChange}></Options>}></Route>
        </Routes>
        <Dummy number={getNumberOfErrors()} />
      </main>
      <Footer/>
    </div>
  );
}

export default App;
