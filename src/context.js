import React, { Component } from 'react'
import {storeProducts, detailProduct} from './data'

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modelOpen: false,
        modelProduct: detailProduct,
        cartSubtotal: 0,
        cartTax: 0,
        cartTotal: 0,
    }
    componentDidMount() {
        this.setProducts();
    }

    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];
        })
        this.setState(() => {
            return {products: tempProducts}
        })
    }

    getItem = (id) => {
        return this.state.products.find(item => item.id === id);
    }

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {return {detailProduct: product}})
    }

    addToCart = (id) => {
        let tempProducts = [...this.state.products]
        const product = tempProducts[id - 1];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(() => 
        {return {
            products: tempProducts, 
            cart:[...this.state.cart, product]
        }}, () => {
            this.addToTotals();
        })
    }

    openModel = (id) => {
        const product = this.getItem(id);
        this.setState(({
            modelProduct: product,
            modelOpen: true
        }))
    }

    closeModel = () => {
        this.setState(({
            modelOpen: false
        }))
    }

    increment = (id) => {
        let tempCart = [...this.state.cart]
        const selectedProduct = tempCart.find(item => item.id === id)
        const index = tempCart.indexOf(selectedProduct)
        const product = tempCart[index]
        product.count = product.count + 1
        product.total = product.count * product.price;
        this.setState(() => {
            return {
                cart: [...tempCart]
            }
        }, () => {
            this.addToTotals()
        })
    }

    decrement = (id) => {
        let tempCart = [...this.state.cart]
        const selectedProduct = tempCart.find(item => item.id === id)
        const index = tempCart.indexOf(selectedProduct)
        const product = tempCart[index]
        console.log(product)
        product.count = product.count - 1
        product.total = product.count * product.price;
        if (product.count === 0) {
            this.removeItem(id)
        } else {
            this.setState(() => {
                return {
                    cart: [...tempCart]
                }
            }, () => {
                this.addToTotals()
            })
        }
    }
    removeItem = (id) => {
        let tempProducts = [...this.state.products]
        let tempCart = [...this.state.cart]
        tempCart = tempCart.filter(item => item.id !== id)
        let removedProduct = tempProducts[id - 1]
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;
        this.setState(() => {
            return {
                cart: [...tempCart],
                products: tempProducts
            }
        }, () => {
            this.addToTotals()
        })
    }

    clearCart = () => {
        this.setState(() => {
            return {
                cart:[]
            }}, () => {
            this.setProducts();
            this.addToTotals();
        })
    }

    addToTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => {
            subTotal += (item.price * item.count);
            return subTotal
        })
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2))
        const total = subTotal + tax
        this.setState({
            cartSubtotal: subTotal,
            cartTax: tax,
            cartTotal: total
        })
    }
 
    render() {
        return (
            <ProductContext.Provider value={
                {...this.state, 
                    handleDetail: this.handleDetail, 
                    addToCart: this.addToCart,
                    openModel: this.openModel,
                    closeModel: this.closeModel,
                    increment:  this.increment,
                    decrement: this.decrement,
                    removeItem: this.removeItem,
                    clearCart: this.clearCart}
                }>
                {this.props.children} 
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductConsumer, ProductProvider}

