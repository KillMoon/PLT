const statesNKA = {q0: 'q0', q1: 'q1', q2: 'q2', q3: 'q3', q4: 'q4', q5: 'q5'}
const alphabetNKA = ['0', '1']
const finalStateNKA = {q0: 'q0', q1: 'q1', q2: 'q2', q3: 'q3', q4: 'q4'}

let transitionTableNKA = {
    [statesNKA.q0]: {
      [alphabetNKA[0]]: statesNKA.q1,
      [alphabetNKA[1]]: statesNKA.q0
    },
    [statesNKA.q1]: {
      [alphabetNKA[0]]: statesNKA.q2,
      [alphabetNKA[1]]: statesNKA.q0
    },
    [statesNKA.q2]: {
      [alphabetNKA[0]]: statesNKA.q3,
      [alphabetNKA[1]]: statesNKA.q0
    },
    [statesNKA.q3]: {
      [alphabetNKA[0]]: statesNKA.q4,
      [alphabetNKA[1]]: statesNKA.q0
    },
    [statesNKA.q4]: {
      [alphabetNKA[0]]: statesNKA.q5,
      [alphabetNKA[1]]: statesNKA.q0
    },
    [statesNKA.q5]: {
      [alphabetNKA[0]]: statesNKA.q5,
      [alphabetNKA[1]]: statesNKA.q5
    },
  }
  function nfa() {
    value = document.getElementById("inputNKA").value
    let currentState = statesNKA.q0
    for (let i = 0; i < value.length; i++) {
      if (value[i] != alphabetNKA[0] && value[i] != alphabetNKA[1]) {
        alert("Invalid value")
        return
      }
      currentState = transitionTableNKA[currentState][value[i]]
    }
    console.log(currentState == finalStateNKA[currentState])
    if (currentState == finalStateNKA[currentState]) { 
        console.log(1)
        alert('Accept')
    } else {
        alert('Reject')
    }
  }
