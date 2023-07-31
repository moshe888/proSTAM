import React, { useState } from 'react';
import axios from 'axios';
import './AddAuthor.css';

function AddAuthor() {
  const [name, setName] = useState('');
  const [image, setPhotoUrl] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const password = Math.random().toString(36).slice(-8);
    const store = { name, image, email, password };

    try {
      await axios.post('http://localhost:3000/stores', store);
      sendPasswordByEmail(email, password);
      alert(`Store added with email: ${email}`);
      setEmail('');
      setName('');
      setPhotoUrl('');
    } catch (error) {
      console.log(error.message);
    }
  };

  const sendPasswordByEmail = async (email, password) => {
    try {

      alert(`מעבד את הבקשה...`);
      alert('הסיסמה שלך היא ' + password);

      await axios.post('http://localhost:3000/stores/send-email', { email, password });
 
      console.log(' הסיסמה נשלחה בהצלחה למייל: ', email);
    } catch (error) {
      alert(` שגיאה בשליחת הסיסמה למייל: ${email}`);

      console.log(error.message);
    }
  };

  return (
    <div>
      <h2>Registration for authors</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Image URL:
          <input type="text" value={image} onChange={(e) => setPhotoUrl(e.target.value)} />
        </label>
        <br />
        <label>
          Owner Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddAuthor;
