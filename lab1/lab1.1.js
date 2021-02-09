const states = {q0: 'q0', q1: 'q1', q2: 'q2', q3: 'q3', q4: 'q4', q5: 'q5'}
const totalStates = 6
const alphabetSize = 2
const alphabet = ['0', '1']
const finalState = {q0: 'q0', q1: 'q1', q2: 'q2', q3: 'q3', q4: 'q4'}

let transitionTable = {
    [states.q0]: {
      [alphabet[0]]: states.q1,
      [alphabet[1]]: states.q0
    },
    [states.q1]: {
      [alphabet[0]]: states.q2,
      [alphabet[1]]: states.q0
    },
    [states.q2]: {
      [alphabet[0]]: states.q3,
      [alphabet[1]]: states.q0
    },
    [states.q3]: {
      [alphabet[0]]: states.q4,
      [alphabet[1]]: states.q0
    },
    [states.q4]: {
      [alphabet[0]]: states.q5,
      [alphabet[1]]: states.q0
    },
    [states.q5]: {
      [alphabet[0]]: states.q5,
      [alphabet[1]]: states.q5
    },
  }
  function dfa() {
    value = document.getElementById("input").value
    let currentState = states.q0
    for (let i = 0; i < value.length; i++) {
      currentState = transitionTable[currentState][value[i]]
    }
    console.log(currentState == finalState[currentState])
    if (currentState == finalState[currentState]) { 
        console.log(1)
        alert('Accept')
    } else {
        alert('Reject')
    }
  }
