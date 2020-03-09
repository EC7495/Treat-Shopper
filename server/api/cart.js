const router = require('express').Router()
const {Product, OrderItem, Order} = require('../db/models')
const Op = require('sequelize').Op

// increment, decrement, or remove product quantity in cart
router.put('/:action/:productId/:orderId', async (req, res, next) => {
  try {
    // guest users do not have cart in database
    if (!req.user) return res.sendStatus(401)

    const orderItem = await OrderItem.findOne({
      where: {productId: req.params.productId, orderId: req.params.orderId}
    })
    const currentOrder = await Order.findByPk(orderItem.orderId)
    const productInCart = await Product.findByPk(orderItem.productId)

    // users can only edit their own cart
    if (currentOrder.userId !== req.user.id) return res.sendStatus(401)

    if (req.params.action === 'increment') {
      await orderItem.update({quantity: orderItem.quantity + 1})
    } else if (req.params.action === 'decrement') {
      orderItem.update({quantity: orderItem.quantity - 1})
      if (orderItem.quantity === 0) {
        await currentOrder.removeProduct(productInCart)
      }
    } else if (req.params.action === 'remove') {
      await currentOrder.removeProduct(productInCart)
    }

    res.json(productInCart)
  } catch (error) {
    next(error)
  }
})

router.put('/:guestCart/:productQuantity', async (req, res, next) => {
  try {
    const userOrder = await Order.findOne({
      where: {userId: req.user.id, complete: false}
    })
    const idArray = Array.from(req.params.guestCart).map(element => +element)
    const qtyArray = Array.from(req.params.productQuantity).map(
      element => +element
    )

    const guestCart = await Product.findAll({
      where: {id: {[Op.in]: idArray}}
    })

    let orderItem
    for (let i = 0; i < guestCart.length; i++) {
      await userOrder.addProduct(guestCart[i])
      if (qtyArray[i] > 1) {
        orderItem = await OrderItem.findOne({
          where: {productId: guestCart[i].id, orderId: userOrder.id}
        })
        await orderItem.update({quantity: qtyArray[i]})
      }
    }
    res.json(orderItem)
  } catch (error) {
    next(error)
  }
})

module.exports = router
