import React, { Component } from "react";
import Navi from "./Navi.js";
import CategoryList from "./CategoryList.js";
import ProductList from "./ProductList.js";
import { Container, Row, Col } from "reactstrap";
import alertify from "alertifyjs";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound.js";
import CartList from "./CartList.js";
import FormDemo1 from "./FormDemo1.js";
import FormDemo2 from "./FormDemo2.js";

export default class App extends Component {
  state = { currentCategory: "", products: [], cart: [] };

  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }

    this.setState({ cart: newCart });
    alertify.success(product.productName + " added to cart", 2);
  };

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
    alertify.error(product.productName + " remove from cart", 2);
  };

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    console.log(category);
    this.getProducts(category.id);
  };

  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  componentDidMount() {
    this.getProducts();
  }

  render() {
    let infoCategory = { title: "Category List" };
    let infoProduct = { title: "Product List", icerik: "İçerik Deneme İçerik" };
    return (
      <div className="App">
        <Container>
          <Navi cart={this.state.cart} removeFromCart={this.removeFromCart} />
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={infoCategory}
              />
            </Col>
            <Col>
              <Switch>
                <Route exact path="/" render={props=>(
                   <ProductList
                   {...props}
                   products={this.state.products}
                   addToCart={this.addToCart}
                   currentCategory={this.state.currentCategory}
                   info={infoProduct}
                 />
                )
             }></Route>
                <Route  path="/cart" render={props=>(
                   <CartList
                   {...props}
                   cart={this.state.cart}
                   removeFromCart={this.removeFromCart}
                 />
                )
             }></Route>
              <Route path="/form1" component={FormDemo1}></Route>
              <Route path="/form2" component={FormDemo2}></Route>
                <Route component={NotFound}></Route>

              </Switch>
             
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
