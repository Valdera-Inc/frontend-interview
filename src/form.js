import React from 'react'
import styled from 'styled-components'
import firebase from 'firebase'

const Form = ({ className }) => {
  const db = firebase.firestore()

  return (
    <FormStyled className={className}>
      <h3>Product Catalog</h3>
      <div>
        <label>Product Name</label>
        <input></input>
      </div>
      <div>
        <label>Concentration</label>
        <input></input>
      </div>
      <button type='submit'>Submit</button>
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

  // Use for concentration error text
  .error-text {
    color: red;
  }

  // Use for submission success and failure
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
