import React, { useEffect, useState } from 'react'
import * as api from '../utils/api'
import {Link} from 'react-router-dom'


const StocksList = () => {

    const [stocksList, setStocksList] = useState([])

    useEffect(() => {
      api.getStockListFtse().then((data) => {
        setStocksList(data)
      })
    }, [])
  return (
    <div>
      {console.log(stocksList)}
      <ul>
        {stocksList.map((stock) => {
          return (
            <li key={stock.symbol}>
              <Link to={`/stock/${stock.symbol}`}><h5>{stock.companyName}</h5>
              <h6>{stock.symbol}</h6></Link>
            </li>
          )
        })}
      </ul>
    </div>
   
  )
}

export default StocksList