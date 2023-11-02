import './style/loginStyle.scss'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useEffect } from "react";
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { InputAdornment } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const ForgotPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        loadCaptchaEnginge(6)
    })

    const handleCancel = () => {
        navigate('/')
    }
    return (
        <div className="homepage">
            <div className='background'>
                <div className="login-form" style={{ height: "321px" }}>
                    <div className="login-form-panel">
                        <div className="typo-align">
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    color: "var(--black, #000)",
                                    marginTop: "15px",
                                    marginBottom: "16px",
                                    marginLeft: "20px",
                                    lineHeight: "20px"
                                }}
                            >
                                Forgot password
                            </Typography>
                        </div>
                    </div>
                    <hr style={{
                        borderStyle: "solid",
                        width: "580px", color: "rgba(0,0,0,0.25)"
                    }}>
                    </hr>
                    <div className="login-form-background">
                        <div className="typo-align">
                            <Typography
                                fontFamily="Roboto"
                                fontSize={14}
                                lineHeight="20px"
                                marginLeft="20px"
                                marginRight="20px"
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
                                    id="outlined-captcha"
                                    size="small"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"></InputAdornment>,
                                    }}
                                    sx={{
                                        width: '540px !important',
                                        '& .MuiInputLabel-root': {
                                            color: 'rgba(0, 0, 0, 1)',
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: 'rgba(0, 0, 0, 1)',
                                        },
                                    }}
                                />
                            </div>
                            <div className="form-input-captcha">
                                <div className="captcha-display">
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
                            <Button variant="outlined" size="small" onClick={handleCancel} sx={{ "&:hover": { outlineColor: "#1A1C1D", }, outlineColor: "#1A1C1D", textTransform: 'capitalize', padding: "10px 20px 10px 20px", marginRight: "10px" }}>
                                <Typography fontSize={14}>Cancel</Typography>
                            </Button>
                            <Button variant="contained" size="small" sx={{ "&:hover": { backgroundColor: "#8F7300", }, backgroundColor: "#8F7300", textTransform: 'capitalize', padding: "10px 20px 10px 20px" }}>
                                <Typography fontSize={14}>Request</Typography>
                            </Button>
                        </div>
                    </div >
                </div >
            </div>
        </div>
    )
}

export default ForgotPage