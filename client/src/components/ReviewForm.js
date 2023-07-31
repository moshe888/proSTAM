import React, { useState } from "react";
import axios from "axios";

const ReviewForm = ({ storeId, refreshReviews }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/stores/${storeId}/reviews`, {
        name,
        comment,
      });
      if (response.status === 201) {
        alert("Review added successfully!");
        setName("");
        setComment("");
        refreshReviews(); // Call the function to refresh the reviews
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
       <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <br />
        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
