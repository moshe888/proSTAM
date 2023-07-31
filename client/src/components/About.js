import React from "react";

const About = () => {
  return (
    <div style={styles.container}>
      <h2>אודות</h2>
      <p>
      ברוכים הבאים לחנות המקוונת שלנו! אנחנו צוות מסור של אנשים נלהבים שאוהבים להתעסק עם מוצרי סת"ם ומחויבים להביא את מיטב המוצרים ללקוחותינו. המטרה שלנו היא לספק לכם מגוון רחב של ספרים איכותיים ומוצרי קודש איכותיים  הנותנים מענה מיטבי
      </p>
      {/* ... (rest of the content) ... */}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    fontSize: "33px",
    lineHeight: "1.6",
    color: "#49274a",
  },
};

export default About;
