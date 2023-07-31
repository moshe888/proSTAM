import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import './AuthorsList.css';

function AuthorsList() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    async function fetchAuthors() {
      try {
        const response = await axios.get('http://localhost:3000/stores');
        setAuthors(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAuthors();
  }, []);

  return (
    <div>
      <div style={
        {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }
      }>
        <h3>הכנס תמונה</h3>
      <input type="file" typeof='image/* ' />

  </div>

      <h2>הסופרים שלנו:</h2>
      <div className="card-container">
        {authors.map((author) => (
          <div className="card-wrapper" key={author._id}>
            <Card className="author-card">
              <CardImg top src={author.image} alt={author.name} className="card-img" />
              <CardBody>
                <CardTitle className="card-title">{author.name}</CardTitle>
                <Link to={`/stores/${author._id}`} className="button">
                  Visit Store
                </Link>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuthorsList;
