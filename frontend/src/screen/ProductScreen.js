import { useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import axios from "axios";
import { Row, Col, ListGroup, Badge, Card, Button } from "react-bootstrap";
import Rating from "../companent/rating";
import { Helmet } from "react-helmet-async";

const reducer = (state, action) => {
  //กำหนดตัวแปรที่เรากำหนดใน useRducer โดย state คือ y และ action คือx
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
  // loadinf ไส้กำหนดสภานะการโหลดใช้กับคำสั่งข้างล่าง products: action.payload คือ product ที่กำหนดเป็น [] ข้างล่วง แล้ว action.payload คือ ข้อมูลที่ fetch มา
};
function ProductScreen() {
  const param = useParams(); //เอา  url patameter มาทั้งหมด
  const { slug } = param; //get slug parameter ที่กำหนดใน app.js (คือ .../:slug )from param

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });
  // useReducer(x,y)x มี logger เพื่อจะให้เห็นใน consoleด้วย ส่วน y  คือตัวแปรข้างหลังเป็น object มี 3 ตัว
  // [] ข้างหน้าคือ [ผลลัพธ์,dispatch] dispatch คือคำสั่งโดยอ้างอิงจาก reducer
  // เมื่อเปิดหน้า มีคำสั่งuseffect run โดยจะเรียก dispatch เพื่อกำหนดค่าลง products[] โดยการ fetch แล้วเก็บลงตัวแปร result ต่อ...
  // จากนั้นก็เอา result  มาจุลง payload แล้ว dispatch tupe SUCCESS ก็เอาไปจุลง product

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [slug]);
  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img
            className="img-large"
            src={product.image}
            alt={product.image}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>Price:${product.price}</ListGroup.Item>
            <ListGroup.Item>Description:${product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">Instock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button variant="primary">Add to Cart</Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
