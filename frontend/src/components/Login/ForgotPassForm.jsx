import "./style/loginFormStyle.scss"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useEffect } from "react";
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { InputAdornment } from "@mui/material";
import { useState } from "react";

const ForgotPassForm = () => {

    const [password, setPassword] = useState('');

    const handlePasswordChange = (event) => {
        setPassword("*".repeat(event.target.value.length));
    };

    useEffect(() => {
        loadCaptchaEnginge(6)
    })
    return (
        <div className="login-form">
            <div className="login-form-panel">
                <div className="typo-align">
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '14pt',
                            color: 'black',
                            marginTop: "13px",
                            marginBottom: "14px",
                            marginLeft: "20px"
                        }}
                    >
                        Forgot password
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
                        fontSize={14}
                        lineHeight="20px"
                        marginLeft={2}
                        marginBottom={1}
                        display="inline-block"
                        textAlign='start'
                    >
                        Forgotten your password? Enter your registered email address below.
                        We will then send you an email with a code that you will need to create a new password.
                    </Typography>
                </div>
                <div className="input-form-forgot">
                    <div className="form-input" >
                        <TextField
                            label="Enter email address"
                            id="outlined-username"
                            size="small"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                            }}
                            sx={{
                                width: '540px !important',
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(0, 0, 0, 1)',
                                },
                            }}
                        />
                    </div>
                    <div className="form-input-captcha">
                        <div className="col mt-3">
                            <LoadCanvasTemplateNoReload />
                        </div>
                        <TextField
                            label="Enter Captcha Code"
                            id="outlined-captcha"
                            size="small"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                            }}
                            sx={{
                                width: '340px !important',
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(0, 0, 0, 1)',
                                },
                            }}
                        />
                    </div>
                </div>
                <div className="form-footer-forgot">
                    <Button variant="contained" size="small" sx={{ textTransform: 'capitalize', padding: "10px 10px 10px 10px" }}>
                        <Typography fontSize={10}>Login</Typography>
                    </Button>
                </div>
            </div >
        </div >
    )
}

export default ForgotPassForm