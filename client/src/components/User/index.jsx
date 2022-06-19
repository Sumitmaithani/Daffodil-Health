import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import userdp from "../../images/userdp.png";

const UserDetail = () => {
  const [data, setData] = useState({
    fullname: "",
    phone: "",
    city: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //image uploader
  const [myimage, setMyImage] = useState(userdp);
  const uploadImage = (e) => {
    setMyImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://dhealthy.herokuapp.com/api/usersdetail";
      const { data: res } = await axios.post(url, data);
      navigate("/user");
      console.log(res.message);
      window.location = "/child";
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
          <div className={styles.circle4}></div>
        </div>
        <div className={styles.image_uploader}>
          <img
          className={styles.img_img}
            src={myimage}
            style={{ height: 160, width: 160, borderRadius: 100 }}
          />
          <div className={styles.container}>
            <span className={styles.select_wrapper}>
              <input onChange={uploadImage} type="file" name="image_src" id={styles.image_src} />
            
            </span>
          </div>
        </div>
        <form
          id="myForm"
          className={styles.form__container}
          onSubmit={handleSubmit}
        >
          <h1 className={styles.head}>Your Details</h1>

          <input
            type="text"
            placeholder="Full Name*"
            name="fullname"
            onChange={handleChange}
            value={data.fullname}
            required
            className={styles.input1}
          />
          <input
            type="text"
            placeholder="Phone Number*"
            name="phone"
            onChange={handleChange}
            value={data.phone}
            required
            className={styles.input2}
          />
          <input
            type="text"
            placeholder="City*"
            name="city"
            onChange={handleChange}
            value={data.city}
            required
            className={styles.input3}
          />
          {error && <div className={styles.error_msg}>{error}</div>}
          <button type="submit" className={styles.button}>
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDetail;
