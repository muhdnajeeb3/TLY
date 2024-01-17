import React, { useEffect } from "react";
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from "react-responsive-carousel";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productAction";
import { listTopSellers } from "../actions/userAction";
import { Link } from "react-router-dom";

function HomeScreens() {
  const dispatch =useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const { loading:loadingSellers, error:errorSellers, users:sellers } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers())
  }, [dispatch]);

  return (
    <div>
      <h2>Top Products</h2>
      {loadingSellers ? (
        <LoadingBox></LoadingBox>
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : (
        <>
        {/* {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox> } */}
        <Carousel showArrows autoPlay showThumbs={false}>
          {/* {sellers.map((seller)=>(
            <div key={seller._id}>
              <Link to={`/seller/${seller._id}`}>
                <img src={seller.seller.logo} alt={seller.seller.name}></img>
                <p className='legend'>{seller.seller.name}</p>
              </Link>
            </div>
          ))} */}
          <img src="https://img.freepik.com/free-photo/world-diabetes-day-sugar-wooden-bowl-dark-surface_1150-26666.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1705104000&semt=ais" alt=""/>
          <img src="https://media.istockphoto.com/id/157476197/photo/thai-rice-for-sale-in-a-market.jpg?s=612x612&w=0&k=20&c=NPYXwfN5HexissJQzorPQKRRSzrCOLNgNrSovNaWh8w=" alt="" />
        </Carousel>
        
        </>
      )}
      <h2>Featured Products</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
        {products.length === 0 && <MessageBox>No Products Found</MessageBox> } 
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div> 
        </>
      )}
    </div>
  );
}

export default HomeScreens;
