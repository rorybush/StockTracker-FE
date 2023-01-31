import React from 'react'
import {Box, Typography} from '@mui/material'

const PageNotFound = () => {
  return (
    <Box sx={{
      height:"70vh",
      alignContent:"center",
      display:"flex",
      justifyContent:"center",}}>
        <Box sx={{
          display:"flex",
          alignItems: "center",
          justifyContent:"center",
        }}>
          <Typography
          variant='h3'
          sx={{mr:1, color:'#0288D1'}}
          >
            404 |
          </Typography>
          <Typography variant='button' sx={{color:'#0288D1'}}>Page not found</Typography>
        </Box>
    </Box>
  )
}

export default PageNotFound