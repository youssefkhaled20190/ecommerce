import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axiosInstance from '../axios/axiosInstance';

const Checkout = () => {

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const state = useSelector((state) => state.handleCart)

    function getCurrentDateTime() {
        const now = new Date();
      
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = now.getDate().toString().padStart(2, '0');
      
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
      
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }
      
      console.log(getCurrentDateTime());

    var total = 0;
    var productName = ""
    const itemList = (item) => {
        total = total + item.productPrice;
        productName = item.productTittle
        return (
            <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 className="my-0">{item.productTittle}</h6>
                </div>
                <span className="text-muted">${item.productPrice}</span>
            </li>
        );
    }


   
    
      const formik = useFormik({
        initialValues: {
            id:null,
          paymentDate: "",
          amount: 0,
          userId: "",
          productName: "",
          firstName: "",
          lastName: "",
          address: "",
          email: "",
          phone: "",
          country: "",
          paymentMethod: "",
          nameOnCard: "",
          creditCardNumber: "",
          expirationDate: "",
          cvv: "",
          status: "",
        },
      
        onSubmit: async (values) => {
          const formData = new FormData();
          formData.append("id", 0);
          formData.append("paymentDate", getCurrentDateTime()||"");
          formData.append("amount", state.length);
          formData.append("userId", localStorage.getItem("userId"));
          formData.append("productName",productName);
          formData.append("firstName", values.firstName);
          formData.append("lastName", values.lastName); // Append image file
          formData.append("address", values.address);
          formData.append("email", values.email);
          formData.append("phone", values.phone);
          formData.append("country", values.country);
          formData.append("paymentMethod", values.paymentMethod);
          formData.append("nameOnCard", values.nameOnCard);
          formData.append("creditCardNumber", values.creditCardNumber);
          formData.append("expirationDate", values.expirationDate);
          formData.append("cvv", values.cvv);
          formData.append("status", values.status || "pending");
          


          try {
            const response = await axiosInstance.post("Payment", formData, {
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (response.status === 200) {
              setSuccess(true); // Product added successfully
              setError(""); // Clear any error messages
            }
          } catch (err) {
            setError(err.response?.data?.message || "Failed to add payment!");
            setSuccess(false); // Show error message
          }
        },
      });





  
    return (
      <>
        <div className="container my-5">
          <div className="row g-5">
            <div className="col-md-5 col-lg-4 order-md-last">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Your cart</span>
                <span className="badge bg-primary rounded-pill">
                  {state.length}
                </span>
              </h4>
              <ul className="list-group mb-3">
                {state.map(itemList)}

                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>${total}</strong>
                </li>
              </ul>

              <form className="card p-2">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Promo code"
                  />
                  <button type="submit" className="btn btn-secondary">
                    Redeem
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">Billing address</h4>
              <form
                className="needs-validation"
                novalidate=""
                onSubmit={formik.handleSubmit}
              >
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">
                      First name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      placeholder=""
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      required=""
                    />
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="lastName" className="form-label">
                      Last name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      placeholder=""
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      required=""
                    />
                    <div className="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <div className="input-group has-validation">
                      <span className="input-group-text">@</span>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Username"
                        required=""
                      />
                      <div className="invalid-feedback">
                        Your username is required.
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-muted">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    <div className="invalid-feedback">
                      Please enter a valid email address htmlFor shipping
                      updates.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="1234 Main St"
                      required=""
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      name="address"
                    />
                    <div className="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      placeholder="phone number"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      name="phone"
                    />
                  </div>

                  <div className="col-md-5">
                    <label htmlFor="country" className="form-label">
                      Country
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="country"
                      placeholder="1234 Main St"
                      required=""
                      value={formik.values.country}
                      onChange={formik.handleChange}
                      name="country"
                    />
                    <div className="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      placeholder="1234 Main St"
                      required=""
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      name="state"
                    />
                    <div className="invalid-feedback">
                      Please provide a valid state.
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="zip" className="form-label">
                      Zip
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
                      placeholder=""
                      required=""
                    />
                    <div className="invalid-feedback">Zip code required.</div>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="same-address"
                  />
                  <label className="form-check-label" htmlFor="same-address">
                    Shipping address is the same as my billing address
                  </label>
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="save-info"
                  />
                  <label className="form-check-label" htmlFor="save-info">
                    Save this information htmlFor next time
                  </label>
                </div>

                <hr className="my-4" />

                <h4 className="mb-3">Payment</h4>

                <div className="my-3">
                  <div className="form-check">
                    <input
                      id="credit"
                      name="paymentMethod"
                      type="radio"
                      className="form-check-input"
                      checked={formik.values.paymentMethod === "credit"}
                      required
                      value="credit"
                      onChange={formik.handleChange}
                    />
                    <label className="form-check-label" htmlFor="credit">
                      Credit card
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      id="debit"
                      name="paymentMethod"
                      type="radio"
                      className="form-check-input"
                      checked={formik.values.paymentMethod === "debit"}
                      required
                      value="debit"
                      onChange={formik.handleChange}
                    />
                    <label className="form-check-label" htmlFor="debit">
                      Debit card
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      id="paypal"
                      name="paymentMethod"
                      type="radio"
                      className="form-check-input"
                      checked={formik.values.paymentMethod === "paypal"}
                      required
                      value="paypal"
                      onChange={formik.handleChange}
                    />
                    <label className="form-check-label" htmlFor="paypal">
                      PayPal
                    </label>
                  </div>
                </div>

                <div className="row gy-3">
                  <div className="col-md-6">
                    <label htmlFor="cc-name" className="form-label">
                      Name on card
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-name"
                      placeholder=""
                      required=""
                      value={formik.values.nameOnCard}
                      onChange={formik.handleChange}
                      name="nameOnCard"
                    />
                    <small className="text-muted">
                      Full name as displayed on card
                    </small>
                    <div className="invalid-feedback">
                      Name on card is required
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="cc-number" className="form-label">
                      Credit card number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-number"
                      placeholder=""
                      required=""
                      value={formik.values.creditCardNumber}
                      onChange={formik.handleChange}
                      name="creditCardNumber"
                    />
                    <div className="invalid-feedback">
                      Credit card number is required
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="cc-expiration" className="form-label">
                      Expiration
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-expiration"
                      placeholder=""
                      required=""
                      value={formik.values.expirationDate}
                      onChange={formik.handleChange}
                      name="expirationDate"
                    />
                    <div className="invalid-feedback">
                      Expiration date required
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="cc-cvv" className="form-label">
                      CVV
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-cvv"
                      placeholder=""
                      required=""
                      value={formik.values.cvv}
                      onChange={formik.handleChange}
                      name="cvv"
                    />
                    <div className="invalid-feedback">
                      Security code required
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <button className="w-100 btn btn-primary btn-lg" type="submit">
                  Continue to checkout
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
}

export default Checkout