import React from "react";
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { InputAdornment } from "@mui/material";
import { ToastContainer, toast } from "react-toastify"
import { authActions } from 'store/reducer'
import './style/loginStyle.scss'
import 'react-toastify/dist/ReactToastify.css';


const LoginPage = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                const response = await dispatch(authActions.login({ email: values.username, password: values.password }));
                if (response?.error?.message === 'Rejected') {
                    toast.error("Invalid username or password", { theme: "colored", hideProgressBar: "true", autoClose: 2000 });
                }
            }
            catch (error) {
                formik.setFieldValue("password", "");
            }
        },
    });
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