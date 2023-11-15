import './style/loginStyle.scss'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { InputAdornment } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { authActions } from "../../store"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const LoginPage = () => {
    const dispatch = useDispatch()
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/forgot');
    }


    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: (values) => {
            try {
                dispatch(authActions.login({ email: values.username, password: values.password })).then((response) => {
                    response?.error?.message === 'Unauthorized' && toast.error("Invalid username or password", { theme: "colored", hideProgressBar: "true", autoClose: 1000 })
                })

            }
            catch (error) {
                setPassword("")
            }
        },
    });
    const authUser = useSelector(state => state.auth.user)

    useEffect(() => {
        // redirect to home if already logged in
        if (authUser) navigate('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="homepage">

            <div className='background'>
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
                        <form onSubmit={formik.handleSubmit}>
                            <div className="typo-align">
                                <Typography
                                    fontSize={21}
                                    fontFamily="Roboto"
                                    fontWeight="Bold"
                                    lineHeight="26px"
                                    marginLeft="20px"
                                    marginBottom="8px"
                                    color="black"
                                    value={password}
                                    display="inline-block"
                                >
                                    Composing Generator
                                </Typography>
                            </div>
                            <div className="input-form-group">
                                <div className="form-input" key={1}>
                                    <TextField
                                        label="Username"
                                        id="username"
                                        size="small"
                                        name='username'
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start" />,
                                        }}
                                        sx={{
                                            width: '100% !important',
                                            '& .MuiInputLabel-root': {
                                                color: 'rgba(0, 0, 0, 1)',
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                paddingLeft: '0px'
                                            }
                                        }}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.username && Boolean(formik.errors.username)}
                                        helperText={formik.touched.username && formik.errors.username}
                                    />
                                </div>
                                <div className="form-input" key={2}>
                                    <TextField
                                        label="Password"
                                        id="outlined-password"
                                        name='password'
                                        type='password'
                                        value={formik.values.password}
                                        size="small"
                                        onChange={formik.handleChange}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start" />,
                                        }}
                                        sx={{
                                            width: '100% !important',
                                            '& .MuiInputLabel-root': {
                                                color: 'rgba(0, 0, 0, 1)',
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                paddingLeft: '7px',
                                                flexWrap: "wrap !important"
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-footer">
                                <div className="pointer forgot-pass" onClick={handleNavigate}>
                                    Forgot password
                                </div>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="small"
                                    sx={{ "&:hover": { backgroundColor: "#8F7300", }, backgroundColor: "#8F7300", textTransform: 'capitalize', padding: '10px 20px 10px 20px' }}
                                >
                                    <Typography fontSize={14}>Login</Typography>
                                </Button>
                            </div>
                        </form>
                    </div >
                </div >
            </div>
            <ToastContainer />
        </div >
    )
}

export default LoginPage