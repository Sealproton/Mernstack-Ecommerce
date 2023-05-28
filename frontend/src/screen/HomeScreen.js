import { Link } from "react-router-dom";
import data from "../data";

function HomeScreen() {
  return (
    <div>
      <h1>Features Products</h1>
      <div className="products">
        {data.products.map((product) => (
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
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
