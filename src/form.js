import React, { useState } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'

const Form = ({ className }) => {
  const [productName, setProductName] = useState('')
  const [concentration, setConcentration] = useState('')

  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState([])

  const db = firebase.firestore()
  const storage = firebase.storage()

  const submitHandler = (e) => {
    e.preventDefault()
    const data = {
      concentration: concentration
    }
    db.collection("catalog")
      .doc(productName)
      .set(data)
      .then(() => console.log(`Wrote ${productName}`))
      .catch(e => console.log(e));
  }

  return (
    <FormStyled className={className} onSubmit={submitHandler}>
      <h3>Product Catalog</h3>
      <label>Product Name</label>
      <input
        type='text'
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      ></input>
      <label>Concentration</label>
      <input
        type='number'
        value={concentration}
        onChange={(e) => setConcentration(e.target.value)}
      ></input>
      <button type='submit'>Submit</button>
      {isSuccess && <div id='success'>Successfully submitted!</div>}
      {errors.length > 0 && (
        <div id='errors'>
          <h4>Errors</h4>
          <ul>
            {errors.map((error) => (
              <li>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </FormStyled>
  )
}

const FormStyled = styled.form`
  width: 20vw;
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
`

export default Form
