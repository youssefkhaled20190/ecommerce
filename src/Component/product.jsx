import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/actions';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import axiosInstance from '../axios/axiosInstance';

import RateProduct from './Rate';

const Product = () => {

    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categoryName , setcategoryName]=useState("");
    const [modalShow, setModalShow] = useState(false);

    const dispatch = useDispatch();
    const addProduct = (product) => {
        console.log("called")
        dispatch(addCart(product));
    }


 

     useEffect(() => {
       if (id) {
         const fetchProduct = async () => {
           try {
             const response = await axiosInstance.get(`Product/${id}`);
             setProduct(response.data);
             const categoryName = await axiosInstance.get(
               `Category/${response.data.categoryId}`
             );
             setcategoryName(categoryName.data.categoryName);
           } catch (error) {
             console.error(
               "Error fetching product:",
               error.response ? error.response.data : error.message
             );
           }
         };
         fetchProduct();
       }
     }, [id]);



    const Loading = () => {
        return(
            <>
                <div className="col-md-6">
                    <Skeleton height={400}/>
                </div>
                <div className="col-md-6" style={{lineHeight:2}}>
                    <Skeleton height={50} width={300} />
                    <Skeleton height={75} />
                    <Skeleton height={25} width={150} />
                    <Skeleton height={50} />
                    <Skeleton height={150} />
                    <Skeleton height={50} width={100} />
                    <Skeleton height={50} width={100} style={{marginLeft:6}} />
                </div>
            </>
        )
    }
    const ShowProduct = () => {
        return(
            <>
                <div className="col-md-6">
                    <img src={`https://localhost:7121/files/Images/${product.imageName}`} alt={product.productTittle} height="500px" width="500px" />
                </div>
                <div className="col-md-6">
                    <h4 className="text-uppercase text-black-50">
                        {categoryName}
                    </h4>
                    <h1 className="display-5">{product.productTittle}</h1>
                    <p className="lead fw-bolder">
                        Rating {product.rating} 
                        <i className="fa fa-star" style={{margin: "16px"}}></i>
                    </p>
                    <h3 className="display-6 fw-bold my-4">
                        $ {product.productPrice}
                    </h3>
                    <p className="lead">{product.productDescription}</p>
                    <button className="btn btn-outline-primary px-4 py-2" style={{margin:"6px"}} onClick={() => setModalShow(true)}>
                        Rate
                    </button>
                    <button className="btn btn-outline-primary px-4 py-2" onClick={()=>addProduct(product)}>
                        Add to Cart
                    </button>
                    <NavLink to="/Cart" className="btn btn-dark ms-2 px-3 py-2">
                        Go to Cart
                    </NavLink>
                </div>
            </>
        )
    }

    return (
      <div>
        <div className="container py-5">
          <div className="row py-4">
            {loading ? <Loading /> : <ShowProduct />}
          </div>
        </div>

        <RateProduct show={modalShow} onHide={() => setModalShow(false)} productId={id} />
      </div>
    );
}

export default Product;
