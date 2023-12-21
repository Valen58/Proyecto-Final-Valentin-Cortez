import React, { useEffect, useState } from "react";
import { getDocs, query, where, collection } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from '../../config/firebaseConfig';
import { useCart } from '../CartContext/CartContext.jsx'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductItem = ({ producto, addToCart, selectedProducts, setSelectedProducts }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (quantity <= producto.stock) {
      addToCart(producto, quantity);
      notifySuccess(`${quantity} ${quantity > 1 ? 'productos' : 'producto'} añadido al carrito`);

      const existingProductIndex = selectedProducts.findIndex(p => p.id === producto.id);
      if (existingProductIndex !== -1) {

        const updatedProducts = [...selectedProducts];
        updatedProducts[existingProductIndex].quantity += quantity;
        setSelectedProducts(updatedProducts);
      } else {

        setSelectedProducts([...selectedProducts, { ...producto, quantity }]);
      }
    } else {
      notifyError("No hay suficiente stock disponible");
    }
  };

  const notifyError = (message) => {
    toast.error(message, { position: "top-center", autoClose: 3000 });
  };

  const notifySuccess = (message) => {
    toast.success(message, { position: "top-center", autoClose: 3000 });
  };

  return (
    <li className="product-item">
      <h2>{producto.name}</h2>
      <p><strong>Descripción:</strong> {producto.description}</p>
      <p><strong>Stock:</strong> {producto.stock}</p>
      <p><strong>Precio:</strong> ${producto.price}</p>
      
      <div className="quantity-container">
        <button className="quantity-btn" onClick={handleDecrement}>-</button>
        <span className="quantity">{quantity}</span>
        <button className="quantity-btn" onClick={handleIncrement}>+</button>
      </div>

      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Agregar al carrito
      </button>
    </li>
  );
};

export const ItemListContainer = () => {
  const { category } = useParams();
  const { addToCart } = useCart();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const getProductsDB = (category) => {
    const myProducts = category
      ? query(collection(db, "productos"), where("category", "==", category))
      : query(collection(db, "productos"));

    getDocs(myProducts).then((resp) => {
      if (resp.size === 0) {
        console.log("No hay productos en la base de datos");
      }
      const productList = resp.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProductos(productList);
      setLoading(false);
    });
  };

  const handleRemoveFromSelected = (index) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts.splice(index, 1);
    setSelectedProducts(updatedProducts);
  };

  useEffect(() => {
    getProductsDB(category);
  }, [category]);

  return (
    <div className="product-list">
      <h1>Lista de Productos</h1>
      <ToastContainer />
      {loading ? (
        <p>Cargando productos...</p> 
      ) : (
        <ul className="product-container"> 
          {productos.map(producto => (
            <ProductItem
              key={producto.id}
              producto={producto}
              addToCart={addToCart}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />
          ))}
        </ul>
      )}


      <div>
        <h2>Productos seleccionados:</h2>
        <ul>
          {selectedProducts.map((product, index) => (
            <li key={index} className="selected-product">
              {`${product.name} - Cantidad: ${product.quantity}`}

              <button className="remove-from-selected-btn" onClick={() => handleRemoveFromSelected(index)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
