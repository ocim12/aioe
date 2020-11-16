import React, {useState} from 'react';
function App(){
  const [number,setNumber] = useState(5);
  return(
    <div className="App">
      <div>{number}</div>
      <button onClick={() => setNumber(number+1)}>+</button>
      <button onClick={()=> setNumber(number-1)}>-</button>
    </div>
  );

}

export default App;