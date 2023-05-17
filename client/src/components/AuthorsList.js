import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardBody, CardTitle, Button } from 'reactstrap';
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
      <h2 >הסופרים שלנו:</h2>
      <div className="card-container">
        {authors.map((author) => (
          <div className="card-wrapper" key={author._id}>
            <Card className="author-card">
              <CardImg top src={author.image} alt={author.name} className="card-img" />
              <CardBody>
                <CardTitle>{author.name}</CardTitle>
                <Button className="button" onClick={() => window.location.href=`/stores/${author._id}`}>Visit Store</Button>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuthorsList;
