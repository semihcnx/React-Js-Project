
import React, { Component } from "react";
import Navi from "./Navi.js";
import CategoryList from "./CategoryList.js";
import ProductList from "./ProductList.js";
import { Row,Container,Col } from "reactstrap";


export default class App extends Component { 
  state= {
    currentCategory: ""
  }
  changeCategory = (category)=> {
    this.setState({currentCategory: category.categoryName})
  }
  render () {
    let productInfo = {title :"Product List", slug:"product-list"};
    let categoryInfo = {title:"Category List", slug:"category-list"};
    return (
      
      <div className="App">
        <Container>
          <Row>    
            <Navi />
          </Row>
          <Row>
            <Col xs="3">
            <CategoryList currentCategory={this.state.currentCategory} changeCategory={this.changeCategory} info={categoryInfo}/>
            </Col>
            <Col xs="9">
            <ProductList currentCategory={this.state.currentCategory} info={productInfo}/>
            </Col>      
          </Row>
        </Container>
      </div>
    );
  }

}



