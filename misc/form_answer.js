import React, { useState } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'

const Form = ({ className }) => {
  const [productName, setProductName] = useState('')
  const [concentration, setConcentration] = useState('')
  const [concentrationError, setConcentrationError] = useState(null)

  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState([])

  const db = firebase.firestore()

  const clearForm = () => {
    setProductName('')
    setConcentration('')
  }

  const isValidConcentration = (value) => {
    return value >= 0 || value.length === 0
  }

  const changeConcentrationHandler = (e) => {
    const value = e.target.value
    setConcentration(value)
    if (isValidConcentration(value)) {
      setConcentrationError(null)
    } else {
      setConcentrationError('Invalid concentration value')
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const data = {
      concentration: concentration,
    }
    db.collection('catalog')
      .doc(productName)
      .set(data)
      .then(() => {
        setIsSuccess(true)
        clearForm()
        console.log(`Wrote ${productName}`)
      })
      .catch((e) => {
        setErrors([...errors, e])
        console.log(e)
      })
  }

  return (
    <FormStyled className={className} onSubmit={submitHandler}>
      <h3>Product Catalog</h3>
      <div className='inputRow'>
        <div>
          <label>Product Name</label>
          <input
            type='text'
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Concentration</label>
          <input
            type='number'
            value={concentration}
            onChange={changeConcentrationHandler}
          ></input>
          {concentrationError && (
            <span className='error-text'>{concentrationError}</span>
          )}
        </div>
      </div>
      <button disabled={concentrationError} type='submit'>
        Submit
      </button>
      {isSuccess && <div id='success'>Successfully submitted!</div>}
      {errors.length > 0 && (
        <div id='errors'>
          <h4>Errors</h4>
          <ul>
            {errors.map((error) => (
              <li>{error.code}</li>
            ))}
          </ul>
        </div>
      )}
    </FormStyled>
  )
}

const FormStyled = styled.form`
  width: 400px;
  margin: auto;
  padding: 32px;
  padding-top: 16px;
  border: solid 1px grey;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
  text-align: left;

  h3 {
    text-align: center;
  }

  input,
  button {
    padding: 8px;
    box-sizing: border-box;
    width: 100%;
    display: block;
    margin: 16px 0;
  }

  button {
    height: 48px;
    padding: 8px 16px;
    color: white;
    background-color: #0b575c;
    border-radius: 8px;
    border: none;
    outline: none;
    font-weight: bold;
    cursor: pointer;
    transition: 0.1s;

    :hover {
      box-shadow: 0px 0px 0px 1px #0b575c;
    }
  }

  .inputRow {
    display: flex;

    > div {
      flex-grow: 1;
    }

    > div:first-child {
      margin-right: 16px;
    }
  }

  .error-text {
    color: red;
  }

  #success,
  #errors {
    padding: 8px 16px;
    text-align: left;
    border-radius: 8px;

    h4 {
      margin-top: 16px;
    }
  }

  #success {
    border: solid 1px green;
  }

  #errors {
    border: solid 1px red;
  }

  @media screen and (max-width: 1000px) {
    .inputRow {
      flex-direction: column;

      > div {
        margin: 0;
      }
    }
  }
`

export default Form
