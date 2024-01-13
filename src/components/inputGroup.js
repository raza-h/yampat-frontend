import React from 'react';
// import Contact from '../pictures/user.png';

function InputGroup(props) {
  // const callTwoFunctions=(e)=>
  // {
  //   setPassword(e.target.value);
  //   props.handleChange(e)


  // }
  return (
    <div className="w-4/12 relative rounded-md shadow-sm py-10">
      
      <input
        type="email"
        className="w-full pl-16 py-3 border border-Green rounded-md"
        placeholder="Email"
        name="email"
        onChange={props.handleChange}
      />
    </div>
  );
}

export default InputGroup;
