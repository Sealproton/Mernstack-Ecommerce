import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
// import data from '../data';
import axios from "axios";
import logger from "use-reducer-logger";

const reducer = (state, action) => {
  //กำหนดตัวแปรที่เรากำหนดใน useRducer โดย state คือ y และ action คือx
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
  // loadinf ไส้กำหนดสภานะการโหลดใช้กับคำสั่งข้างล่าง products: action.payload คือ product ที่กำหนดเป็น [] ข้างล่วง แล้ว action.payload คือ ข้อมูลที่ fetch มา
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
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
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Features Products</h1>
      <div className="products">
        {/* ถามว่า loading = true ป่าว ถ้าใช่ก็ให้แสดงบลาๆๆ ถ้าเป็นเออเร่อก็ บลาๆ ถ้าไม่ใช่ทั้งคู่ก็รันยาว โดยถุกกำหนดใน result แล้ว */}
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product) => (
            <div key={product.slug} className="product">
              {/* ให้ไป path localhose3000/product/slug ของแต่ละ porduct โอกใช้ link to แทน a href เพราะว่า a มันจะ refresh ทุกครั้ง เราไม่ต้องการ เราต้องการให้มันสลับไปดาดๆ */}
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="product-info">
                <Link to={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </Link>
                <p>
                  <strong>${product.price}</strong>
                </p>
                <button>Add to chart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
