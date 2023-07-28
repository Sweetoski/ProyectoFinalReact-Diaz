import { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import "./ItemListContainer.css"

const ItemListContainer = () => {

    const [productos, setProductos] = useState([]);

    const [titulo] = useState("Productos");

    const categoria = useParams().categoria;

    useEffect(() => {

      const productosRef = collection(db, "productos");
      const q = categoria ? query(productosRef, where("categoria", "==", categoria)) : productosRef;

      getDocs(q)
        .then((resp) => {

          setProductos(
            resp.docs.map((doc) => {
              return { ...doc.data(), id: doc.id }
            })
          )
        })
        
    }, [categoria])
    
    
  return (
    <div className="container">
        <ItemList productos={productos} titulo={titulo} />
    </div>
  )
}

export default ItemListContainer