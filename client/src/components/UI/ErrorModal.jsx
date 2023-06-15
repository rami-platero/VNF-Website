import { useContext } from "react";
import { errorContext } from "../../context/errorsContext";
import "./errorModal.css";
import {BiError} from 'react-icons/bi'
import { themecontext } from "../../context/themeContext";

const ErrorModal = () => {
  const { responseError, setResponseError } = useContext(errorContext);
  const {theme} = useContext(themecontext)
  return (
    <div className={`error-modal ${theme}`}>
        <BiError/>
      <h2>Error</h2>
      <p>{responseError.message}</p>
      <button
        onClick={() => {
          setResponseError(prevError => ({
            ...prevError, error: false
          }));
        }}
      >
        Dismiss
      </button>
    </div>
  );
};

export default ErrorModal;
