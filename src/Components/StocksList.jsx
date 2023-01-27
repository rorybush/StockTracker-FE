import React, { useEffect, useState } from 'react'
import * as api from '../utils/api'

const StocksList = () => {

    const [stocksList, setStocksList] = useState([])

    useEffect(() => {
      api.getStockListFtse().then((data) => {
        setStocksList(data)
      })
    }, [])
  return (
    <div>
      <ul>
        {stocksList.map((stock) => {
          return (
            <li key={stock.symbol}>
              <h5>{stock.companyName}</h5>
              <h6>{stock.symbol}</h6>
            </li>
          )
        })}
      </ul>
    </div>
   
  )
}

export default StocksList