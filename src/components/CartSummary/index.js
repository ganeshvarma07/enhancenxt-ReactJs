import {useState} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => {
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(
    'Cash on Delivery',
  )
  const [isConfirmationDisabled, setConfirmationDisabled] = useState(true)
  const [isOrderConfirmed, setOrderConfirmed] = useState(false)

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        const handlePaymentOptionChange = option => {
          setSelectedPaymentOption(option)
          setConfirmationDisabled(option !== 'Cash on Delivery')
        }

        const handleConfirmOrderClick = () => {
          // Handle order confirmation logic (e.g., send order to backend, update UI)
          setOrderConfirmed(true)
        }

        const total = cartList.reduce(
          (acc, eachCartItem) =>
            acc + eachCartItem.price * eachCartItem.quantity,
          0,
        )

        return (
          <>
            <div className="cart-summary-container">
              <h1 className="order-total-value">
                <span className="order-total-label">Order Total:</span> Rs{' '}
                {total}/-
              </h1>
              <p className="total-items">{cartList.length} Items in cart</p>
              <Popup
                trigger={
                  <button type="button" className="checkout-button d-sm-none">
                    Checkout
                  </button>
                }
                modal
              >
                {close => (
                  <div className="popup-content">
                    <h2>Select Payment Option</h2>
                    <label>
                      <input
                        type="radio"
                        value="Net Banking"
                        checked={selectedPaymentOption === 'Net Banking'}
                        onChange={() =>
                          handlePaymentOptionChange('Net Banking')
                        }
                        disabled
                      />
                      Net Banking
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Cash on Delivery"
                        checked={selectedPaymentOption === 'Cash on Delivery'}
                        onChange={() =>
                          handlePaymentOptionChange('Cash on Delivery')
                        }
                      />
                      Cash on Delivery
                    </label>

                    <p>Total Cost: Rs {total}/-</p>
                    <p>Number of Items: {cartList.length}</p>

                    <button
                      type="button"
                      className="confirm-order-button"
                      onClick={() => {
                        handleConfirmOrderClick()
                        close()
                      }}
                      disabled={isConfirmationDisabled}
                    >
                      Confirm Order
                    </button>

                    {isOrderConfirmed && (
                      <p>Your order has been placed successfully</p>
                    )}
                  </div>
                )}
              </Popup>
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
