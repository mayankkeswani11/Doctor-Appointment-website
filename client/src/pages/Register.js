import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import "../styles/RegiserStyles.css";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").trim(),
  email: Yup.string()
    .required("Email is required")
    .trim()
    .email("Please enter a valid email")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email"
    ),
  password: Yup.string()
    .required("Password is required")
    .trim()
    .min(6, "Password must be at least 6 characters long")
    .max(32, "Password must be at most 32 characters long")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,32}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    // You can make an API call here to submit the form data
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Something Went Wrong");
    }
  };
  const animateText = "To Best Health-Care Website";
  return (
    <div className="RegisterPage">
      <div className="container">
        <div className="text">
          <img
            src="https://png.pngtree.com/template/20190422/ourmid/pngtree-cross-plus-medical-logo-icon-design-template-image_145195.jpg"
            alt="not found"
            style={{ height: "100px", marginBottom: "15px" }}
          />
          {/* <img src="https://static.vecteezy.com/system/resources/previews/020/805/769/non_2x/creative-medical-logo-and-healthcare-concept-logo-vector.jpg" alt="not found" style={{height:"100px",marginBottom:"15px"}}/> */}
          <h1 style={{ fontWeight: "bold" }}>Welcome,</h1>
          <h2>
            {animateText.split("    ").map((char, index) => (
              <span key={index} className="animated-letter">
                {char}
              </span>
            ))}
          </h2>
        </div>

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <Form
              layout="vertical"
              className="form-container"
              onFinish={handleSubmit}
            >
              <h2 style={{ textAlign: "center" }}>Register Form</h2>
              <Form.Item label="Name:">
                <Field name="name" as={Input} />
                <ErrorMessage
                  name="name"
                  component="div"
                  style={{ color: "red" }}
                />
              </Form.Item>

              <Form.Item label="Email:">
                <Field name="email" as={Input} />
                <ErrorMessage
                  name="email"
                  component="div"
                  style={{ color: "red" }}
                />
              </Form.Item>

              <Form.Item label="Password:">
                <Field name="password" as={Input.Password} />
                <ErrorMessage
                  name="password"
                  component="div"
                  style={{ color: "red" }}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
                <Link to="/login" className="login-url">
                  Already have an account? Sign in
                </Link>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
