import { HiOutlineExclamation } from "react-icons/hi";

const ErrorNotification = ({ errMsg }) => {
  return (
    <div className="error">
      <HiOutlineExclamation className="icon" />
      {errMsg}
    </div>
  );
};

export default ErrorNotification;
