import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAllProductsThunk} from '../redux/thunks/products'
import {addProductThunk, getUserOrderThunk} from '../redux/thunks/order'
import SingleProduct from './SingleProduct'

class AllProducts extends Component {
  constructor() {
    super()
    this.state = {
      candyType: 'all'
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    this.setState({
      candyType: event.target.value
    })
  }

  async componentDidMount() {
    try {
      await this.props.getAllProducts()
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    // const allProducts = this.props.allProducts
    let allProducts

    if (this.state.candyType !== 'all') {
      allProducts = this.props.allProducts.filter(
        product => product.candyType === this.state.candyType
      )
    } else {
      allProducts = this.props.allProducts
    }

    return (
      <div>
        {/* <label htmlFor="fuelType">Filter by candy type: </label>
        <select onChange={this.onChange} value={this.state.fuelType}>
          <option value="all">All</option>
          <option value="sour">Sour</option>
          <option value="chocolate">Chocolate</option>
          <option value="chewy">Chewy</option>
        </select> */}
        <small>
          <strong>candy type</strong>
        </small>
        <br />
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-primary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Action <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            <li>
              <a href="#">Action</a>
            </li>
            <li>
              <a href="#">Another action</a>
            </li>
            <li>
              <a href="#">Something else here</a>
            </li>
            <li role="separator" className="divider"></li>
            <li>
              <a href="#">Separated link</a>
            </li>
          </ul>
        </div>

        <hr style={{margin: '1% 25% 40 25%'}} />

        {allProducts.length ? (
          <div id="products">
            {allProducts.map(product => {
              return (
                <div key={product.id}>
                  <SingleProduct key={product.id} product={product} />

                  <button
                    style={{
                      marginBottom: '20%'
                    }}
                    type="submit"
                    className="btn btn-primary btn-lg"
                    onClick={() => {
                      this.props.getUserOrder()
                      this.props.addProduct(product.id)
                    }}
                  >
                    <i className="fas fa-cart-plus"></i>
                  </button>
                </div>
              )
            })}
          </div>
        ) : (
          <img src="/images/loading.gif" />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allProducts: state.products.allProducts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => dispatch(getAllProductsThunk()),
    addProduct: id => dispatch(addProductThunk(id)),
    getUserOrder: () => dispatch(getUserOrderThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
