import React, { Component } from "react";
import Navi from "./Navi.js";
import CategoryList from "./CategoryList.js";
import ProductList from "./ProductList.js";
import { Container, Row, Col } from "reactstrap";
import alertify from "alertifyjs";

export default class App extends Component {
  
  state= {currentCategory:"", products:[], cart:[]}


  addToCart= (product) =>{
    let newCart= this.state.cart;
    var addedItem = newCart.find(c=>c.product.id=== product.id)
    if(addedItem){
      addedItem.quantity+=1;
    }
    else {
      newCart.push({product:product,quantity:1});
    }
   
    this.setState({cart:newCart})
    alertify.success(product.productName + " added to cart",2)
}

removeFromCart=(product) =>{
  let newCart=this.state.cart.filter(c=>c.product.id!== product.id)
  this.setState({cart:newCart})
}

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    console.log(category)
    this.getProducts(category.id)
  };

  getProducts = (categoryId) => {
    let url= "http://localhost:3000/products";
    if (categoryId)
    {
      url+="?categoryId="+categoryId;
    }
    fetch(url)
    .then(response=>response.json())
    .then(data=>this.setState({products:data}))
}

componentDidMount() {
  this.getProducts();
}

  render() {
    let infoCategory={title:"Category List"}
    let infoProduct={title:"Product List", icerik:"İçerik Deneme İçerik"}
    return (
      <div className="App">
        <Container>
            <Navi cart={this.state.cart}  removeFromCart= {this.removeFromCart}/>
          <Row>
            <Col xs="3">
              <CategoryList currentCategory={this.state.currentCategory} changeCategory={this.changeCategory} info={infoCategory} />
            </Col>
            <Col>
              <ProductList products={this.state.products} addToCart={this.addToCart} currentCategory={this.state.currentCategory} info={infoProduct}  />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
