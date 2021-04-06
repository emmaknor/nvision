import React, {useState} from 'react';

export const GlobalStateProvider = (props) => {
  const [userInfo, setUserInfo] = useState({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'janeDoe@email.com',
    username: 'username',
  });

  // userID should be set upon login/signup/session validation
  // when the database returns that userID to the client
  // (defaults to '1')
  const [userID, setUserID] = useState(1);

  /* dummy variables for testing */
  const [count, setCount] = useState(13);
  const dummyString = 'dummy';
  const addTwo = (x) => {
    return x + 2;
  };

  return (
    <Context.Provider value={{
      count,
      setCount,
      dummyString,
      addTwo,
    }}
    >
      {props.children}
    </Context.Provider>
  );
};

export const Context = React.createContext();
