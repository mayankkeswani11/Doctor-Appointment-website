import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };
  return (
    <div className="registerPage">
      <div className="contain">
        <div className="form-contain">
          <Form
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{ margin: "10px" }}
          >
            <img
              src="https://www.shutterstock.com/image-vector/vector-illustration-pharmacy-cross-icon-260nw-196208174.jpg"
              alt="no image"
              style={{
                width: "50px",
                height: "50px",
                marginLeft: "100px",
                marginBottom: "15px",
              }}
            />
            <h1 style={{ textAlign: "center" }}>Login Form</h1>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                placeholder="Enter your email"
                style={{ width: "250px" }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>

            <Form.Item
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <Link to="/register" style={{ marginRight: "10px" }}>
                Not Register?
              </Link>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* <img
          src="https://img.freepik.com/free-photo/doctors-day-cute-young-handsome-man-lab-coat-glasses-smiling-holding-book_140725-162884.jpg"
          alt="Example Image"
        /> */}
        <img
          src="https://t3.ftcdn.net/jpg/01/30/45/54/360_F_130455409_fTuinPO1LXECv5hlk9VBREnL6yowYUo3.jpg"
          alt="Example Image"
        />
      </div>
    </div>
  );
};

export default Login;
