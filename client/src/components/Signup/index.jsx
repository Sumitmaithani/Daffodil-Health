import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import signup from "../../images/signup.svg";
import google from "../../images/google.png";
import fb from "../../images/facebook.png";

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://dhealthy.herokuapp.com/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
      window.location = "/login";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.signup_container_wrap}>
      <div>
        <div className={styles.circles}>
          <div className={styles.circle1}></div>
          <div className={styles.circle2}></div>
          <div className={styles.circle3}></div>
        </div>
        <img className={styles.signup} src={signup} />
        <form
          id="myForm"
          className={styles.form__container}
          onSubmit={handleSubmit}
        >
          <h1 className={styles.head}>Sign Up</h1>

          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={data.email}
            required
            className={styles.input1}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
            className={styles.input2}
          />
          {error && <div className={styles.error_msg}>{error}</div>}
          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </form>
        <div className={styles.signup_media}>
          <h6>Or sign up with</h6>
          <div className={styles.signup_icons}>
            <img className={styles.signup_icon} src={google} />
            <img className={styles.signup_icon} src={fb} />
          </div>
          <div className={styles.signup_login}>
            <h6>Already an User?</h6>
            <Link to="/login">
              <h6>Log in</h6>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;


