import Container from "react-bootstrap/Container";
import "./card.css";

function Card({ children, color, css = {} }) {
  const style = {
    backgroundColor: color,
    ...css,
  };
  return (
    <Container className="card" style={style}>
      {children}
    </Container>
  );
}

export default Card;
