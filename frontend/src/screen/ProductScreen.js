import { useParams } from "react-router-dom";

function ProductScreen() {
  const param = useParams(); //เอา  url patameter มาทั้งหมด
  const { slug } = param; //get slug parameter ที่กำหนดใน app.js (คือ .../:slug )from param
  return (
    <div>
      <p>{slug}</p>
    </div>
  );
}

export default ProductScreen;
