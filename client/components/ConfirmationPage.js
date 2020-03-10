import React, {Component} from 'react'
import axios from 'axios'

export default class ConfirmationPage extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      userOrder: {}
    }
  }
  async componentDidMount() {
    const user = await axios.get('/auth/me')
    const userOder = await axios.get('/api/orders/recentOrder')
    this.setState({
      user: user.data,
      userOrder: userOder.data
    })
  }

  render() {
    const user = this.state.user
    const products = this.state.userOrder.products
    return products.length ? (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="row p-5">
                  <div className="col-md-6">
                    <img
                      style={{marginLeft: '50%'}}
                      src="/images/candylogo.png"
                    />
                  </div>
                </div>

                <hr className="my-5" />
                <div className="row pb-5 p-5">
                  <div className="col-md-6">
                    <p className="font-weight-bold mb-4">Payment Details</p>
                    <p className="mb-1">
                      <span className="text-muted">Name: </span> {user.name}
                    </p>
                    <p className="mb-1">
                      <span className="text-muted">Payment Type: </span> Credit
                      Card
                    </p>
                  </div>
                </div>

                <div className="row p-5">
                  <div className="col-md-12">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="border-0 text-uppercase small font-weight-bold">
                            Item
                          </th>
                          <th className="border-0 text-uppercase small font-weight-bold">
                            Description
                          </th>
                          <th className="border-0 text-uppercase small font-weight-bold">
                            Quantity
                          </th>
                          <th className="border-0 text-uppercase small font-weight-bold">
                            Unit Cost
                          </th>
                          <th className="border-0 text-uppercase small font-weight-bold">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(product => {
                          return (
                            <tr key={product.id}>
                              <td>{product.name}</td>
                              <td>{product.description}</td>
                              <td>{product.orderItem.quantity}</td>
                              <td>{(product.price / 100).toFixed(2)}</td>
                              <td>
                                {(
                                  (product.price * product.orderItem.quantity) /
                                  100
                                ).toFixed(2)}
                              </td>
                            </tr>
                          )
                        })}
                        <tr></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="d-flex flex-row-reverse bg-dark text-white p-4">
                  <div className="py-3 px-5 text-right">
                    <div className="mb-2">Grand Total</div>
                    <div className="h2 font-weight-light">$234,234</div>
                  </div>

                  <div className="py-3 px-5 text-right">
                    <div className="mb-2">Discount</div>
                    <div className="h2 font-weight-light">10%</div>
                  </div>

                  <div className="py-3 px-5 text-right">
                    <div className="mb-2">Sub - Total amount</div>
                    <div className="h2 font-weight-light">$32,432</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-light mt-5 mb-5 text-center small">
          <a
            className="text-light"
            // eslint-disable-next-line react/jsx-no-target-blank
            target="_blank"
            href="https://treat-shopper.herokuapp.com/"
          >
            treat-shopper.herokuapp.com
          </a>
        </div>
      </div>
    ) : (
      <img style={{borderRadius: '100%'}} src="/images/loading.gif" />
    )
  }
}
