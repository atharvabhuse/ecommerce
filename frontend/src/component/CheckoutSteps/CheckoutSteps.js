import { Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'
import './CheckoutSteps.css'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'

const CheckoutSteps = ({activeSteps}) => {

    const steps = [
        {
            label: 'Shipping Details',
            icon: <LocalShippingIcon />
        },
        {
            label: 'Confirm Order',
            icon: <LibraryAddCheckIcon />
        },
        {
            label: 'Payment',
            icon: <AccountBalanceIcon />
        }
    ]
  return (
    <div>
      <Stepper alternativeLabel activeStep={activeSteps}>
        {
            steps.map((item, index)=>(
                <Step key={index} activeStep={activeSteps ? true : false} completed={activeSteps >= index ? true : false}>
                    <StepLabel style={{color: activeSteps >= index ? 'tomato' : 'gray'}}>{item.label}</StepLabel>
                </Step>
            ))
        }
      </Stepper>
    </div>
  )
}

export default CheckoutSteps
