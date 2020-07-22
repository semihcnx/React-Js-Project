import React, { Component } from "react";
import Navi from "./Navi.js";
import CategoryList from "./CategoryList.js";
import ProductList from "./ProductList.js";
import { Container, Row, Col } from "reactstrap";

export default class App extends Component {
  
  state= {currentCategory:"", products:[]}

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
  };

  getProducts = () => {
    fetch("http://localhost:3000/products")
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
          <Row>
            <Navi />
          </Row>
          <Row>
            <Col xs="3">
              <CategoryList currentCategory={this.state.currentCategory} changeCategory={this.changeCategory} info={infoCategory} />
            </Col>
            <Col>
              <ProductList products={this.state.products} currentCategory={this.state.currentCategory} info={infoProduct}  />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
