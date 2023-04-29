import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`
export const Input = styled.div`
  input {
    margin-top: 24px;
    width: 100%;
    border: 0;
    outline: 0;
    box-shadow: 0 0 0 1px #e1e4e8;
    padding: 12px;
    border-radius: 5px;
  }
`
export const Button = styled.div`
  button {
    box-shadow: 3px 4px 0px 0px #1564ad;
    background: linear-gradient(to bottom, #79bbff 5%, #378de5 100%);
    background-color: #79bbff;
    border-radius: 5px;
    border: 1px solid #337bc4;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    font-size: 17px;
    font-weight: bold;
    padding: 12px 44px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #528ecc;
    margin: 20px 0 0 0;
  }
  button:hover {
    background: linear-gradient(to bottom, #378de5 5%, #79bbff 100%);
    background-color: #378de5;
  }
  button:active {
    position: relative;
    top: 1px;
  }
`
