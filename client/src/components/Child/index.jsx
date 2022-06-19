import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import userdp from "../../images/userdp.png";
import male from "../../images/boy.png";
import female from "../../images/girl.png";

const ChildDetail = () => {
  const [data, setData] = useState({
    childname: "",
    date: "",
    height1: "",
    height2: "",
    weight: "",
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
      const url = "https://dhealthy.herokuapp.com/api/childsdetail";
      const { data: res } = await axios.post(url, data);
      navigate("/child");
      console.log(res.message);
      window.location = "/start";
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
              <input
                onChange={uploadImage}
                type="file"
                name="image_src"
                id={styles.image_src}
              />
            </span>
          </div>
        </div>
        <form
          id="myForm"
          className={styles.form__container}
          onSubmit={handleSubmit}
        >
          <h3 className={styles.head}>Help us know your child</h3>

          <input
            type="text"
            placeholder="Child Name*"
            name="childname"
            onChange={handleChange}
            value={data.childname}
            required
            className={styles.input1}
          />
          <input
            type="date"
            name="date"
            onChange={handleChange}
            value={data.date}
            required
            className={styles.input2}
          />

          <div className={styles.donate_now}>
            <div className={styles.gender}>
              <input
                onClick={() => setMyImage(male)}
                type="radio"
                id="a25"
                name="amount"
                checked="checked"
              />
              <label for="a25" id="a25">
                Male
              </label>
              <input
                onClick={() => setMyImage(female)}
                type="radio"
                id="a50"
                name="amount"
              />
              <label for="a50" id="a50">
                Female
              </label>
              <input
                onClick={() => setMyImage(userdp)}
                type="radio"
                id="a75"
                name="amount"
              />
              <label for="a75" id="a75">
                Other
              </label>
            </div>
          </div>

          <div className={styles.height_weight}>
            <div className={styles.height_container}>
              <label for="gender">Height</label>
              <div className={styles.height}>
                <input 
                type="text"
                name="height1"
                onChange={handleChange}
                value={data.height1}
                required
                className={styles.height_input} 
                />
                <select name="gender">
                  <option value="ft" selected>
                    Ft
                  </option>
                  <option value="in">cm</option>
                </select>
               
                <input
                 type="text"
                 name="height2"
                 onChange={handleChange}
                 value={data.height2}
                 required
                className={styles.height_input} 
                />
                <select name="gender">
                  <option value="ft" selected>
                    In
                  </option>
                  <option value="in">mm</option>
                </select>
              </div>
            </div>

            <div className={styles.height_container}>
              <label for="gender">Weight</label>
              <div className={styles.weight}>
                <input 
                type="text"
                name="weight"
                onChange={handleChange}
                value={data.weight}
                required
                className={styles.height_input} 
                />
                <select name="gender">
                  <option value="ft" selected>
                    Kg
                  </option>
                  <option value="in">lbs</option>
                </select>
              </div>
            </div>
          </div>

          {error && <div className={styles.error_msg}>{error}</div>}
          <button type="submit" className={styles.button}>
            Done
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChildDetail;
