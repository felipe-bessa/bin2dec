import React, { useState, useEffect } from 'react';

import './global.css';

import { FaRegLightbulb, FaChevronUp, FaChevronDown } from 'react-icons/fa';

export default function App() {
  const log = console.log;
  const bulbs = document.querySelectorAll('li svg');

  const [decimal, setDecimal] = useState(0);
  const [byte, setByte] = useState('00000000');

  useEffect(() => {
    let byte = decimalToByte();
    setByte(byte);
    setBulbs(byte);
  }, [decimal]);

  useEffect(() => {
    setDecimal(byteToDecimal());
  }, [byte]);

  function setBulbs(byte) {
    Array.from(bulbs).map((bulb, index) => {
      if(byte[index] == 0) {
        bulb.setAttribute('color', '#ccc');
        bulb.setAttribute('style', 'color: rgb(204, 204, 204);');
      } else {
        bulb.setAttribute('color', '#1da1f2');
        bulb.setAttribute('style', 'color: rgb(29, 161, 242);');
      }
    });
  }

  function incrementDecimal () {
    if(decimal < 255) {
      log('Add 1 to decimal');
      setDecimal(decimal + 1);
    
      log('Atualiza valor no byte');
      //Executa com o useEffect para garantir que o decimal atualizou
    } else {
      log('Decimal não pode ser maior que 255');
    }
  }

  function decrementDecimal () {
    if(decimal > 0) {
      log('Sub 1 to decimal');
      setDecimal(decimal - 1);
    
      log('Atualiza valor no byte');
      //Executa com o useEffect para garantir que o decimal atualizou
    } else {
      log('Decimal deve ser maior o igual a 0');
    }
  }

  function decimalToByte() {
    let integer = decimal;
    let byte = '';

    while(integer > 0)
    {
      byte = (integer % 2).toString() + byte;
      integer = Math.floor(integer / 2);
    }

    while(byte.length < 8)
    {
      byte = '0' + byte;
    }

    return byte;
  }

  function handleChange(e) {
    const bit = e.target.id;
    const bulb = e.target.nextElementSibling;
    
    e.target.innerText == 0 ? turnOn(bit, bulb) : turnOff(bit, bulb);
  }

  function turnOn (bit, element) {
    let newByte = '';

    Array.from(byte).map((elem, index, array) => array.length - index - 1 == bit ? newByte += '1' : newByte += elem );

    setByte(newByte);
    
    element.setAttribute('color', '#1da1f2');
    element.setAttribute('style', 'color: rgb(29, 161, 242);');
  }

  function turnOff(bit, element) {
    let newByte = '';

    Array.from(byte).map((elem, index, array) => array.length - index - 1 == bit ? newByte += '0' : newByte += elem );

    setByte(newByte);

    element.setAttribute('color', '#ccc');
    element.setAttribute('style', 'color: rgb(204, 204, 204);');
  }

  function byteToDecimal() {
    return Array.from(byte)
                .reduce((decimal, bit, index, array) => {
                  return decimal += bit * 2 ** (array.length - index - 1);
                }, 0);
  }

  return (
    <div className="App">
      <h1>
        Bin 2 Dec
      </h1>
      <ul>
        <li>
          <button id="7" onClick={handleChange}>{byte[0]}</button>
          <FaRegLightbulb size={48} color='#ccc' />
        </li>
        <li>
          <button id="6" onClick={handleChange}>{byte[1]}</button>
          <FaRegLightbulb size={48} color='#ccc' />
        </li>
        <li>
          <button id="5" onClick={handleChange}>{byte[2]}</button>
          <FaRegLightbulb size={48} color='#ccc' />
        </li>
        <li>
          <button id="4" onClick={handleChange}>{byte[3]}</button>
          <FaRegLightbulb size={48} color='#ccc' />
        </li>
        <li>
          <button id="3" onClick={handleChange}>{byte[4]}</button>
          <FaRegLightbulb size={48} color='#ccc' />
        </li>
        <li>
          <button id="2" onClick={handleChange}>{byte[5]}</button>
          <FaRegLightbulb size={48} color='#ccc' />
        </li>
        <li>
          <button id="1" onClick={handleChange}>{byte[6]}</button>
          <FaRegLightbulb size={48} color='#ccc' />
        </li>
        <li>
          <button id="0" onClick={handleChange}>{byte[7]}</button>
          <FaRegLightbulb size={48} color='#ccc' />
        </li>
      </ul>
      <section>
        <FaChevronUp size={48} onClick={incrementDecimal} />
        <input type="text" maxLength={3} readOnly={true} value={decimal} />
        <FaChevronDown size={48} onClick={decrementDecimal} />        
      </section>
    </div>
  );
}
