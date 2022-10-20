import React from "react";
import { HiOutlineExclamation } from "react-icons/hi";

class ErrorNotification extends React.Component {
  render() {
    const { errorMsg } = this.props;
    return (
      <div className="error">
        <HiOutlineExclamation className="icon" /> {errorMsg}
      </div>
    );
  }
}

export default ErrorNotification;
