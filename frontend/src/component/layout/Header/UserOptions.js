import React, { useState } from 'react'
import './UserOptions.css'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ListAltIcon from '@mui/icons-material/ListAlt'
import PersonIcon from '@mui/icons-material/Person'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../../actions/userAction'

const UserOptions = ({ user }) => {

    const [open, setOpen] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const DashboardHandler = () => {
        navigate('/dashboard')
    }
    const OrdersHandler = () => {
        navigate('/orders')
    }
    const AccountHandler = () => {
        navigate('/account')
    }
    const LogoutUserHandler = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <div>
            <SpeedDial
                ariaLabel='SpeedlDial tooltip'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                className='userOptions_container'
                open={open}
                direction="down"
                icon={<SpeedDialIcon />}>
                {user.role === "admin" ? <SpeedDialAction icon={<DashboardIcon />} onClick={DashboardHandler} tooltipTitle="Dashboard" /> : ''}
                <SpeedDialAction icon={<ListAltIcon />} onClick={OrdersHandler} tooltipTitle="List" />
                <SpeedDialAction icon={<PersonIcon />} onClick={AccountHandler} tooltipTitle="Person" />
                <SpeedDialAction icon={<ExitToAppIcon />} onClick={LogoutUserHandler} tooltipTitle="Exit" />
            </SpeedDial>
        </div>
    )
}

export default UserOptions
