import React from "react";
import StripeCheckOut from "react-stripe-checkout"
import { Button, Segment, Divider, Icon } from 'semantic-ui-react'
import calculateCartTotal from "../../utils/calculateCartTotal"

function CartSummary({ products, handleCheckOut, success }) {
  const [cartAmount, setCartAmount] = React.useState(0);
  const [stripeAmount, setStripeAmount] = React.useState(0);
  const [isCartEmpty, setCartEmpty] = React.useState(false);

  React.useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    setCartEmpty(products.length === 0);
  }, [products])

  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total:</strong>${cartAmount}
        <StripeCheckOut
          name="React Reserve"
          amount={stripeAmount}
          image={products.length > 0 ? products[0]
            .product.mediaUrl : " "}
          currency="INR"
          shippingAddress={true}
          billingAddress={true}
          zipCode={true}
          stripeKey="pk_test_hnfOXJoKBINS8prhjFiBWFjy"
          token={handleCheckOut}
          triggerEvent="onClick"
        >
          <Button
            icon="cart"
            disabled={isCartEmpty || success}
            color="teal"
            floated="right"
            content="Checkout"
          />
        </StripeCheckOut>
      </Segment>
    </>
  );
}

export default CartSummary;