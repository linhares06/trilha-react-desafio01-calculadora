import Input from './components/Input';
import Button from './components/Button';

import { Container, Content, Row } from './styles';
import { useState } from 'react';


const App = () => {
    const [currentNumber, setCurrentNumber] = useState('0');
    const [firstNumber, setFirstNumber] = useState(null);
    const [operation, setOperation] = useState('');

    const handleOnClear = () => {
        setCurrentNumber('0')
        setFirstNumber(null)
        setOperation('')
    };

    const handleAddNumber = (num) => {
        setCurrentNumber(prev => `${prev === '0' ? '' : prev}${num}`)
    }

    const calculate = (operation, firstNumber, secondNumber) => {
        const num1 = Number(firstNumber);
        const num2 = Number(secondNumber);
        console.log(num1, num2);
        switch(operation) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                return num1 / num2;
            default:
                return secondNumber;
        }
    }

    const handlePercentage = () => {
        const percentage = Number(currentNumber) / 100;
        if (!validateValidNumber(percentage)) return;
        setCurrentNumber(String(percentage));
    };

    const handleSquareRoot = () => {
        const sqrt = Math.sqrt(Number(currentNumber));
        if (!validateValidNumber(sqrt)) return;
        setCurrentNumber(String(sqrt));
    };

    const handleOperation = (op) => {
        if (firstNumber === null) {
            setFirstNumber(currentNumber);
            setCurrentNumber('0');
            setOperation(op);
        } else if (operation) {
            const result = calculate(operation, firstNumber, currentNumber);
            if (!validateValidNumber(result)) return;
            setFirstNumber(String(result));
            setCurrentNumber('0');
            setOperation(op);
        }
    };

    const handleEquals = () => {
        if (firstNumber !== null && operation && currentNumber !== '0') {
            const result = calculate(operation, firstNumber, currentNumber);
            if (!validateValidNumber(result)) return;
            setCurrentNumber(String(result));
            setFirstNumber(null);
            setOperation('');
        }
    };

    function validateValidNumber(number) {
        if (number === Infinity || Number.isNaN(number)) {
            setCurrentNumber('Error');
            return false;
        }
        return true;
    }

  return (
    <Container>
      <Content>
        <Input value={currentNumber}/>
        <Row>
          <Button label="c" onClick={() => handleOnClear()}/>
          <Button label="√" onClick={() => handleSquareRoot()}/>
          <Button label="%" onClick={() => handlePercentage()}/>
          <Button label="/" onClick={() => handleOperation('/')}/>
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber('7')}/>
          <Button label="8" onClick={() => handleAddNumber('8')}/>
          <Button label="9" onClick={() => handleAddNumber('9')}/>
          <Button label="*" onClick={() => handleOperation('*')}/>
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber('4')}/>
          <Button label="5" onClick={() => handleAddNumber('5')}/>
          <Button label="6" onClick={() => handleAddNumber('6')}/>
          <Button label="-" onClick={() => handleOperation('-')}/>
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber('1')}/>
          <Button label="2" onClick={() => handleAddNumber('2')}/>
          <Button label="3" onClick={() => handleAddNumber('3')}/>
          <Button label="+" onClick={() => handleOperation('+')}/>
        </Row>
        <Row>
          <Button label="0" onClick={() => handleAddNumber('0')}/>
          <Button label="."/>
          <Button label="."/>
          <Button label="=" onClick={() => handleEquals()}/>
        </Row>
      </Content>
    </Container>
  );
}

export default App;
