import {ChangeEvent, useCallback, useEffect, useState} from "react";
import React from 'react';
import {Link} from "react-router-dom";

const isInputValidNumber = (input: string) => !isNaN(Number(input));
const getInvalidInputClassName = (isInputValid: boolean) => isInputValid ? '' : 'invalid'
const getInvalidLinkClassName = (isInputValid: boolean, inputValue: string) => inputValue !== '' && isInputValid ? '' : 'invalid'

/**
 * This is a simple form component that will take a validated (numeric) user input and upon submission,
 * it will launch the UserDataDisplayPage for users with the numeric id input to the UserDataRequestForm.
 */
const UserDataRequestForm: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);

  const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }, [setInputValue])

  const validateInput = useCallback(() => {
    if (isInputValidNumber(inputValue)) {
      setIsInputValid(true)
    } else {
      setIsInputValid(false)
    }
  }, [setIsInputValid, inputValue])

  useEffect(() => {
    validateInput()
  }, [validateInput]);

  return (
    <div className="user-data-request-form">
      <div className="title">Enter The User Id</div>
      <input type="text" className={getInvalidInputClassName(isInputValid)} onBlur={validateInput} value={inputValue} onChange={onInputChange} />
      <Link to={`/user/${inputValue}`} className={getInvalidLinkClassName(isInputValid, inputValue)}>
        Submit
      </Link>
    </div>
  );
}

export default UserDataRequestForm;
