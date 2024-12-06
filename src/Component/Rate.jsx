import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, FormFeedback } from 'reactstrap';
import { useFormik } from 'formik';
import axiosInstance from '../axios/axiosInstance';

function RateProduct({ show, onHide, productId }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      score: 0,
      comment: "",
    },
    onSubmit: async (values) => {
      const formData = {
        id: 0,
        score: values.score,
        comment: values.comment,
        productId: productId,
        userId: localStorage.getItem("userId"),
      };
      try {
        const response = await axiosInstance.post("Rating", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          setSuccess(true);
          setError("");
          onHide(); // Close the modal on success
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to send rating");
        setSuccess(false);
      }
    },
  });

  return (
    <Modal isOpen={show} toggle={onHide}>
      <ModalHeader toggle={onHide}>Rate Product</ModalHeader>
      <ModalBody>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label for="score">Rate Product out of 5</Label>
            <Input
              id="score"
              name="score"
              type="number"
              min="0"
              max="5"
              value={formik.values.score}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={formik.touched.score && !!formik.errors.score}
            />
            <FormFeedback>{formik.errors.score}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="comment">Feedback</Label>
            <Input
              id="comment"
              name="comment"
              type="textarea"
              rows="3"
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={formik.touched.comment && !!formik.errors.comment}
            />
            <FormFeedback>{formik.errors.comment}</FormFeedback>
          </FormGroup>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onHide}>
          Close
        </Button>
        <Button color="primary" type="submit" onClick={formik.handleSubmit}>
          Save Changes
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default RateProduct;
