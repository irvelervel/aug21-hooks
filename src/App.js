import { useState, useDebugValue } from 'react'
import Button from 'react-bootstrap/Button'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function useStateWithLabel(initialValue, name) {
  const [value, setValue] = useState(initialValue)
  useDebugValue(`${name}: ${value}`)
  return [value, setValue]
}

// THE RULES OF HOOK
// 1) JUST USE HOOKS INTO REACT FUNCTIONAL COMPONENTS
// 2) JUST CALL HOOKS AT THE TOP LEVEL, BEFORE THE RETURN STATEMENT

// React Hooks provide state & lifecycle functionalities to Functional Components
// useState -> makes us create&access state variables
// useEffect -> can replace componentDidMount, componentDidUpdate and componentWillUnmount

// I found two limitations with useState:
// 1) all your useStates invocations will be reported as 'State' in the devTools
// solution -> write a custom hook 'useStateWithLabel'
// 2) your setter function, just like this.setState, is async, and so if you need the new value
// immediately after you will have to use the callback function of setState which is not
// available in hooks. But you can work around it using useStateWithCallback from https://github.com/the-road-to-learn-react/use-state-with-callback

const App = () => {
  // just right here!

  // useState creates a state variable and a function capable of changing its value
  const [name, setName] = useState('Wako')
  const [counter, setCounter] = useState(0)
  const [reservations, setReservations] = useState([])

  const [stateObject, setStateObject] = useState({
    name: '',
    counter: 0,
  })

  if (name === 'Wako') {
    setName('Zee')
    setStateObject({
      ...stateObject,
      name: 'Stefano',
    })
  }

  const [firstName, setFirstName] = useStateWithLabel('Mario', 'firstName')

  // in a Class Component would be:
  // state = {
  //   name: '',
  //   counter: 0
  //   reservations: []
  //   stateObject: {
  //      name: '',
  //      counter: 0
  //   }
  // }

  const incrementCounter = () => {
    setCounter(counter + 1)
  }
  const decrementCounter = () => {
    setCounter(counter - 1)
  }

  this.setState(
    {
      name: 'Emilian',
    },
    () => {
      // this is a callback function you can write
      // you are GUARANTEED that this callback will run AFTER the setState
      console.log(this.state.name)
    }
  )
  console.log(this.state.name)

  return (
    <div className="App">
      <header className="App-header">
        <h1 onClick={() => setFirstName('Juha')}>{firstName}</h1>
        <h3>{stateObject.name}</h3>
        <div>
          <Button variant="success" onClick={incrementCounter}>
            +
          </Button>
        </div>
        <div>{counter}</div>
        <div>
          <Button variant="success" onClick={decrementCounter}>
            -
          </Button>
        </div>
      </header>
    </div>
  )
}

export default App
