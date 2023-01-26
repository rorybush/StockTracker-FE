import React, { useEffect, useState } from 'react'
import * as api from '../utils/api'
import { Card, CardContent, Typography } from '@mui/material'

const AboutSection = () => {

    const [stock, setStock] = useState('AAPL')

    useEffect(() => {
        api.getSingleStock("AAPL").then((stockData) => {
            setStock(stockData)
        })
    },[])
  return (
    <Card sx={{width:"20vw", m: "auto"}}>
        <CardContent align="center" sx={{borderBottom:"1px solid grey"}}>
            <Typography color='textSecondary' variant='subtitle2'><p>Last price</p> <p>{stock.lastPrice}</p></Typography>
        </CardContent>
        <CardContent align="center" sx={{borderBottom:"1px solid grey"}}>
            <Typography color='textSecondary' variant='subtitle2'>Market cap {stock.marketCap}</Typography>
        </CardContent>
        <CardContent align="center" sx={{borderBottom:"1px solid grey"}}>
            <Typography color='textSecondary' variant='subtitle2'>Year range $ {stock.yearLow} - {stock.yearHigh}</Typography>
        </CardContent>
        <CardContent align="center" sx={{borderBottom:"1px solid grey"}}>
            <Typography color='textSecondary' variant='subtitle2'>Day range {stock.dayLow} - {stock.dayHigh}</Typography>
        </CardContent>
    </Card>
  )
}

export default AboutSection