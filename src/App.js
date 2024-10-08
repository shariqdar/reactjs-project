import logo from './logo.svg';
import './App.css';
//import './Root.scss';

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
function App() {
  let itemsPerPage = 5
  let [products, setProducts] = useState({})
  const [loading, setLoading] = useState(true);
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    axios.get('https://2olp7lg2mc.execute-api.ap-south-1.amazonaws.com/Dev')
      .then(response => {
        let dataSet = response.data.products.Items
        setProducts((products) => {
          return { 
            ...products,
            "products": dataSet,
            "endOffset": itemOffset + itemsPerPage,
            "currentItems": dataSet.slice(itemOffset, (itemOffset + itemsPerPage)),
            "pageCount": Math.ceil(dataSet.length / itemsPerPage)
          }
         })
      })
      .catch( (error) => {
        console.log("error",error);
        setLoading(false);
      })
    
    // axios.get('https://dummyjson.com/products')
    //   .then( (response) =>{
    //     let dataSet = response.data.products
        // setProducts((products) => {
        //   return { 
        //     ...products,
        //     "products": dataSet,
        //     "endOffset": itemOffset + itemsPerPage,
        //     "currentItems": dataSet.slice(itemOffset, (itemOffset + itemsPerPage)),
        //     "pageCount": Math.ceil(dataSet.length / itemsPerPage)
        //   }
        //  })
        
        
        
    // })
    // .catch( (error) => {
    //   console.log("error",error);
    //   setLoading(false);
    // })
    
  },[])

  useEffect(()=>{
    if(products.currentItems !== undefined){
      setLoading(false);
    }
  }, [products])
  
  const handlePageClick = (event) => {
    
    const newOffset = (event.selected * itemsPerPage) % products.products.length;
    
    setItemOffset(newOffset);
    setProducts({ 
      ...products,
      "endOffset": itemOffset + itemsPerPage,
      "currentItems": products.products.slice(newOffset, (newOffset + itemsPerPage)),
      
    })
  };

  return (

    
    <>
      
      {loading ? <>Loading....</> : 
      <>
        <Items currentItems={products.currentItems} />
        
        

        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageCount={products.pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          activeClassName="active"
        />
        <div id="container">
        </div>
        
      </>}
      
      
      
    </>
  );
}

function Items( items ) {
  
  return (
    <>
      <strong>Products list</strong>
      <ul className="alternating-colors">
     
        {items.currentItems.map((item) => {
          return (
            
              <li key={item.id+"-li"}>
                <strong key={item.id+"-strong"}>{item.name}</strong>
                <p key={item.id+"-p"}>{item.description}</p>
              </li>
            
          )
        })}
        
      </ul>
    </>
  );
}

export default App;
