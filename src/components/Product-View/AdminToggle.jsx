import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import { switchRole } from '../../store/reducer';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 30,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,

        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#72CA92',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#FFFFFF',
                border: 'solid 1px #72CA92',
            },
            "& .MuiSwitch-thumb": {
                backgroundColor: "#72CA92 !important"
            }
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 0,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
        backgroundColor: "#000000",
        borderColor: theme.palette.mode === 'dark' ? '#177ddc' : '#000000', // Change the borderColor to blue when checked and black when unchecked

    },
    '& .MuiSwitch-track': {
        borderRadius: "1px",
        border: 'solid 1px #000000',
        color: 'rgba(255,255,255,.35)',

        opacity: 1,
        boxSizing: 'border-box',
        backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#FFFFFF', // Change the backgroundColor to black when unchecked

    },
}));

export default function AdminToggle() {

    const [toggleValue, setToggleValue] = React.useState(false)
    const dispatch = useDispatch()
    const handleToggleChange = (e) => {
        setToggleValue((state) => !state)
        dispatch(switchRole(!toggleValue))
    }
    return (
        <FormGroup>
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Admin-Mode</Typography>
                <AntSwitch checked={toggleValue} onClick={(e) => handleToggleChange(e)} inputProps={{ 'aria-label': 'ant design' }} />
            </Stack>
        </FormGroup>
    );
}