import {getUserOrder} from '../action-creators/order'
import axios from 'axios'

export const getUserOrderThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders/userOrder')
      dispatch(getUserOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
}
