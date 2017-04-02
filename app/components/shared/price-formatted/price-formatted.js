// utils
import React, { PropTypes } from 'react'
import { Text } from 'react-native'

export const PriceFormatted = ({price, currency}) => {
  price = parseInt(price, 10).toFixed(0)

  if (currency === 'usd') {
    return <Text>${price}</Text>
  } else if (currency === 'eur') {
    return <Text>€{price}</Text>
  } else if (currency === 'pln') {
    return <Text>{price} zł</Text>
  } else {
    return <Text>{price}</Text>
  }
};

PriceFormatted.propTypes = {
  price: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
}
