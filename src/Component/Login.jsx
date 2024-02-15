import React, { useState } from "react";

import { useFormik } from "formik";
import "../App.css"

// eslint-disable-next-line no-unused-vars
import { Card, CardBody, CardHeader , Input , Button , Row , Col , Form, CardTitle , Label, FormGroup , Container , CardImg, Alert} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";





// const validate = (values) => {
//   const errors = {};
//   if (!values.Username) {
//     errors.Username = "Required";
//   } else if (values.Username.length < 2) {
//     errors.Username = "The name must be above 2 chars";
//   }

//   if (!values.Password) {
//     errors.Password = "Required";
//   } else if (values.Password.length < 4) {
//     errors.Password = "The name must be above 4 chars";
//   }
//   return errors;
// };

const validate = (values) => {
    const errors = {};
    if (!values.Username) {
      errors.Username = "Required";
    } else if (values.Username.length < 2) {
      errors.Username = "The name must be above 2 chars";
    }
  
    if (!values.Password) {
      errors.Password = "Required";
    } else if (values.Password.length < 4) {
      errors.Password = "The name must be above 4 chars";
    }
    return errors;
  };



const Login = ({ token, setToken }) => {
  const formik = useFormik({
    initialValues: {
      Username: "",
      Password: "",
    },
    validate,
    onSubmit: (values) => {
      console.log("success");
    },
  });

//   const [Username, setUsername] = useState("");
//   const [Password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [Error, setError] = useState("");
  const loginHandeler = () => {

    axios({
      url: "https://fakestoreapi.com/auth/login",
      method: 'POST',
      data: {
        username: formik.values.Username,
        password: formik.values.Password,
      },
    }).then((res) => {
      console.log(res.data.token);
      setToken(res.data.token);
      localStorage.setItem("userToken" , res.data.token)
    }).catch((err)=>{
        console.error(err)
        setError(err.response.data)
    })
  };

  return (
    <>
      <div className="background">
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h1 style={{ fontSize: "96px", marginBottom: "56px" }}>
                Welcome
              </h1>
              <img
                src="/assets/49390-middle-removebg-preview.png"
                alt="Logo"
                style={{
                  width: "100px",
                  marginRight: "20px",
                  marginBottom: "44px",
                }}
              />
            </div>
            <h2
              style={{
                fontSize: "25px",
                marginRight: "56px",
                marginBottom: "117px",
                color: "#5656567d",
              }}
            >
              Enter your email and password to discover more products
            </h2>
          </div>
          <Row className="justify-content-center">
            <Col xs={12} sm={12} md={12}>
              <Card
                style={{
                  width: "400px",
                  backgroundColor: "#e7e7e7",
                  border: "none",
                  padding: "10px",
                }}
              >
                <CardImg top src="/assets/empty-cart.png" />
                <CardBody>
                  <Form onSubmit={formik.handleSubmit}>
                    <Col>
                      <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                        <Input
                          id="Username"
                          name="Username"
                          placeholder="Username or Email"
                          type="text"
                          onChange={formik.handleChange}
                          value={formik.values.Username}
                        />
                      </FormGroup>

                      {formik.errors.Username ? (
                        <div style={{ color: "red" }}>
                          {formik.errors.Username}
                        </div>
                      ) : null}
                      <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                        <Input
                          id="Password"
                          name="Password"
                          placeholder="Password"
                          type="password"
                          onChange={formik.handleChange}
                          value={formik.values.Password}
                        />
                      </FormGroup>

                      {formik.errors.Password ? (
                        <div style={{ color: "red" }}>
                          {formik.errors.Password}
                        </div>
                      ) : null}
                    </Col>

                    <Container>
                      <Row>
                        <Col className="d-flex justify-content-center">
                          <Button
                            type="submit"
                            style={{
                              width: "100px",
                              color: "white",
                              backgroundColor: "#000000",
                            }}
                            onClick={loginHandeler}
                          >
                            Submit
                            <span style={{ marginLeft: "5px" }}>
                              <FontAwesomeIcon icon={faArrowRight} />
                            </span>
                          </Button>
                        </Col>
                      </Row>
                      <Row className="mt-3">
            <Col className="d-flex justify-content-center">
              <FontAwesomeIcon
                icon={faInstagram}
                size="2x"
                style={{ marginRight: "20px", color: "#000000" }}
              />
              <FontAwesomeIcon
                icon={faFacebook}
                size="2x"
                style={{ marginRight: "20px", color: "#000000" }}
              />
              <FontAwesomeIcon
                icon={faTwitter}
                size="2x"
                style={{ color: "#000000" }}
              />
            </Col>
          </Row>
                    </Container>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
         
        </Container>
      </div>
    </>
  );
};
export default Login