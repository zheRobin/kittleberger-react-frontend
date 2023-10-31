import "./style/loginFormStyle.scss"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { InputAdornment } from "@mui/material";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handlePasswordChange = (event) => {
        setPassword("*".repeat(event.target.value.length));
    };
    const handleNavigate = () => {
        navigate('/forgot');
    }
    return (
        <div className="login-form">
            <div className="login-form-panel">
                <div className="typo-align">
                    <Typography
                        variant="h6"
                        style={{
                            fontSize: '14pt',
                            color: 'black',
                            marginTop: "13px",
                            marginBottom: "14px",
                            marginLeft: "20px"
                        }}

                    >
                        Login
                    </Typography>
                </div>
            </div>
            <hr style={{
                borderStyle: "solid",
                width: "580px", height: "0.5px", color: "rgba(0,0,0,0.25)"
            }}></hr>
            <div className="login-form-background">
                <div className="typo-align">
                    <Typography
                        fontFamily="Roboto"
                        fontSize={21}
                        fontWeight="bold"
                        lineHeight="26px"
                        marginLeft={2}
                        marginBottom={1}
                        value={password}
                        display="inline-block"
                        onChange={handlePasswordChange}
                    >
                        Composing Generator
                    </Typography>
                </div>

                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { mt: 2, width: '25ch', },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div className="input-form-group">
                        <div className="form-input" >
                            <TextField
                                label="Username"
                                id="outlined-username"
                                size="small"
                                defaultValue={"Max Mustermann"}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                                sx={{
                                    width: '100% !important',
                                    '& .MuiInputLabel-root': {
                                        color: 'rgba(0, 0, 0, 1)',
                                    },
                                }}
                            />
                        </div>
                        <div className="form-input">
                            <TextField
                                label="Password"
                                id="outlined-password"
                                value={password}
                                size="small"
                                onChange={(e) => handlePasswordChange(e)}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                                sx={{
                                    width: '100% !important',
                                    '& .MuiInputLabel-root': {
                                        color: 'rgba(0, 0, 0, 1)',
                                    },
                                }}
                            />
                        </div>


                    </div>
                </Box>
                <div className="form-footer">
                    <div className="pointer forgot-pass" onClick={handleNavigate}>Forgot password</div>
                    <Button variant="contained" size="small" sx={{ textTransform: 'capitalize', padding: "10px 10px 10px 10px" }}>
                        <Typography fontSize={10}>Login</Typography>
                    </Button>
                </div>
            </div >
        </div >
    )
}

export default LoginForm