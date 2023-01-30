import React, { useEffect, useState } from 'react'
import * as api from '../utils/api'
import {Link} from 'react-router-dom'
import { Box } from '@mui/material'


const StocksList = () => {

    const [stocksList, setStocksList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      setIsLoading(true)
      api.getStockListFtse().then((data) => {
        setStocksList(data)
        setIsLoading(true)
      })
    }, [])

    if(isLoading) return <p>Loading...</p>

  return (
    <div>
      {console.log(stocksList)}
      <Box>
        {stocksList.map((stock) => {
          return (
            <li key={stock.symbol}>
              <Link to={`/stock/${stock.symbol}`}><h5>{stock.companyName}</h5>
              <h6>{stock.symbol}</h6></Link>
            </li>
          )
        })}
      </Box>
    </div>
   
  )
}

export default StocksList