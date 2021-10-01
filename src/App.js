import React, { useState, useRef } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import getData from './util/apiFetch';
import './assets/stylesheets/App.css';

function App() {
  const first = useRef();
  const second = useRef();

  const [firstNum, setFirstInt] = useState('');
  const [op, setOperator] = useState('');
  const [secondNum, setSecondInt] = useState('');
  const [answer, setAnswer] = useState({
    Expression: {
      firstInt: '', secondInt: '', operator: '', result: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const handleOnChange = () => {
    setFirstInt(
      first.current.value,
    );

    setSecondInt(
      second.current.value,
    );
    const ele = document.getElementsByName('math');
    for (let i = 0, length = ele.length; i < length; i += 1) {//eslint-disable-line
      if (ele[i].checked) {
        setOperator(
          ele[i].value,
        );
        break;
      }
    }
  };

  const handleSubmit = (event) => {//eslint-disable-line
    event.preventDefault();

    const params = new URLSearchParams({
      firstInt: firstNum,
      operation: op,
      secondInt: secondNum,
    });

    // const getAnswer = `http://localhost:3001/expression?${params.toString()}`;
    const getAnswer = `https://morning-river-68243.herokuapp.com/expression?${params.toString()}`;

    getData(getAnswer)
      .then((response) => response.json())
      .then((data) => {//eslint-disable-line

        if (data.error === 'Please select an operator!' || data.error === 'Please fill in all fields!') {
          setLoading(
            false,
          );
          setAnswer(
            {
              Expression: {
                firstInt: '', secondInt: '', operator: '', result: data.error,
              },
            },
          );
        } else {
          console.log(data);
          setAnswer(
            data,
          );
          setLoading(
            false,
          );

          return data;
        }
      });
    setLoading(
      true,
    );
  };

  return (
    <>
      <div className="App">
        {loading ? <ReactBootstrap.Spinner animation="border" variant="info" className="spinner" /> : null}{/*eslint-disable-line*/}
        {/* <ReactBootstrap.Spinner animation="border" variant="info" className="spinner" /> */}
        <h1>Basic Math</h1>
        <form onSubmit={handleSubmit} id="loginId">
          <label htmlFor="nameInput">
            First Number:
            <input type="text" name="name" ref={first} value={firstNum} id="firstNum" onChange={handleOnChange} />
          </label>

          <br />
          <br />
          <label htmlFor="Add" className="container">
            <input type="radio" id="Add" name="math" value="+" onChange={handleOnChange} />
            <span className="checkmark">+</span>
            &nbsp;&nbsp;
          </label>
          {/* <br /> */}
          <label htmlFor="Subtract" className="container">
            <input type="radio" id="Subtract" name="math" value="-" onChange={handleOnChange} />
            <span className="checkmark">-</span>
            &nbsp;&nbsp;
          </label>
          {/* <br /> */}
          <label htmlFor="Multiply" className="container">
            <input type="radio" id="Multiply" name="math" value="*" onChange={handleOnChange} />
            <span className="checkmark">x</span>
            &nbsp;&nbsp;
          </label>
          {/* <br /> */}
          <label htmlFor="Divide" className="container">
            <input type="radio" id="Divide" name="math" value="/" onChange={handleOnChange} />
            &nbsp;&nbsp;
            <span className="checkmark">/</span>
          </label>
          <br />
          <br />

          <label htmlFor="passwordInput">
            Second Number:
            <input type="text" name="secondNum" ref={second} value={secondNum} id="secondNum" onChange={handleOnChange} />
          </label>

          <br />
          <br />
          <br />
          <input type="submit" className="submitB" value="Get Answer" />
        </form>
        <br />
        Result:
        {answer ? <div className="resultDiv">{answer.Expression.result}</div> : null}
      </div>
    </>
  );
}

export default App;
