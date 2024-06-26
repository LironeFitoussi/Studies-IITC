import styles from "./ForgotPassword.module.css";
import { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../config/apiConfig";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetBtn, setResetBtn] = useState("Reset Password");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResetBtn(<img src="./Rolling-2.1s-204px.gif" />);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiUrl}api/v1/users/forgotPassword`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { email: email },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setMessage(
          `An email has been sent with instructions to reset your password.`
        );
        setEmail("");
        setResetBtn("Reset Password");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={styles.resetPassword}>
      <h1>Forgot Password</h1>
      <div>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <button className={styles.resetBtn} type="submit">
            {resetBtn}
          </button>
        </form>
      </div>
    </div>
  );
}
