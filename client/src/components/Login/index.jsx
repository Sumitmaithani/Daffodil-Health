import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import login from "../../images/login.svg";
import google from "../../images/google.png";
import fb from "../../images/facebook.png";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "https://dhealthy.herokuapp.com/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			//window.location = "/";
			window.location = "/user";
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
		  <img className={styles.login} src={login} />
		  <form
			id="myForm"
			className={styles.form__container}
			onSubmit={handleSubmit}
		  >
			<h1 className={styles.head}>Log In</h1>
  
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
			  Log In
			</button>
		  </form>
		  <div className={styles.signup_media}>
			<h6>Or Log In with</h6>
			<div className={styles.signup_icons}>
			  <img className={styles.signup_icon} src={google} />
			  <img className={styles.signup_icon} src={fb} />
			</div>
			<div className={styles.signup_login}>
			  <h6> Don't have an account?</h6>
			  <Link to="/signup">
				<h6>Register </h6>
			  </Link>
			</div>
		  </div>
		</div>
	  </div>
	);
};

export default Login;


