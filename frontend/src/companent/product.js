import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Rating from "./rating";

function Product(props) {
  // ค่า product จาก Homescreen จะถูกเก็บใน props แล้วเราก็กำหนดว่ามันคือตัวแปรเดียวกันแ้ลวเอามาโลดแล่น
  const { product } = props;
  return (
    <Card className="product">
      {/* ให้ไป path localhose3000/product/slug ของแต่ละ porduct โอกใช้ link to แทน a href เพราะว่า a มันจะ refresh ทุกครั้ง เราไม่ต้องการ เราต้องการให้มันสลับไปดาดๆ */}
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <Card.Text>${product.price}</Card.Text>
        <Button>Add to chart</Button>
      </Card.Body>
    </Card>
  );
}
export default Product;
