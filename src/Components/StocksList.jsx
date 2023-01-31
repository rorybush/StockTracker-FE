import React, { useEffect, useState } from 'react'
import * as api from '../utils/api'
import {Link} from 'react-router-dom'
import { Box } from '@mui/material'
import './stocksList.css'


const StocksList = () => {

    const [stocksList, setStocksList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      setIsLoading(true)
      api.getStockListNasdaq().then((data) => {
        console.log(data, "DATA")
        setStocksList(data)
        setIsLoading(false)
      }).catch(err => console.log(err))
    }, [])

    if(isLoading) return <p>Loading...</p>

  return (
    <div>
      <Box>
        {stocksList.map((stock) => {
          return (
            <li key={stock.symbol} id="stock-list">
              <Link to={`/stock/${stock.symbol}`}><h5>{stock.companyName} ({stock.symbol})</h5>
              </Link>
            </li>
          )
        })}
      </Box>
    </div>
   
  )
}

export default StocksList