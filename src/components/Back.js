import React from 'react';
import { useHistory } from 'react-router-dom';

export const GoBack = () => {
  const history = useHistory();

  const onGoBack = () => {
    history.goBack();
  };

  return <button onClick={ onGoBack } type="button">Go Back</button>
};
