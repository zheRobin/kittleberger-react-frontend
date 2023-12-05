
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from "@mui/material"
import "./_dialog_style.scss"
import { useTranslation } from 'react-i18next';
import { getDynamicContent } from '../../_services/Info';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser'; 

export default function AlertDialog({text}) {
  const [open, setOpen] = React.useState(false);
  const {t} = useTranslation()
  const langType = useSelector(state => state.info.language)
  const token = useSelector(state => state.auth.token)
  const [content, setContent] = useState("")
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(
    () => {
      
      getDynamicContent(token, langType === 'en' ? "en-GB":"de-DE",(success) => {
        setContent(
            success.data.data
          )
      })
      
    }, [token,langType]
  )
  return (
    <React.Fragment>
      <Typography onClick={handleClickOpen} className="side-footer pointer" textAlign="left" color="#8F7300" fontWeight={400} fontSize="12px" lineHeight="16px">
         { text }
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className='custom-dialog'
      >
         <div className='custom-dialog__header'>
         <DialogTitle id="alert-dialog-title">
            {t("Datenschutz")}
         </DialogTitle>
         <p className='pointer' onClick={handleClose}>
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
         <path d="M21.2301 2.64645C21.2765 2.69288 21.3133 2.74799 21.3385 2.80866C21.3636 2.86932 21.3765 2.93434 21.3765 3C21.3765 3.06566 21.3636 3.13068 21.3385 3.19134C21.3133 3.25201 21.2765 3.30713 21.2301 3.35356L12.584 12L21.2301 20.6464C21.2765 20.6929 21.3133 20.748 21.3385 20.8087C21.3636 20.8693 21.3765 20.9343 21.3765 21C21.3765 21.0657 21.3636 21.1307 21.3385 21.1913C21.3133 21.252 21.2765 21.3071 21.2301 21.3536C21.1837 21.4 21.1285 21.4368 21.0679 21.4619C21.0072 21.4871 20.9422 21.5 20.8765 21.5C20.8109 21.5 20.7458 21.4871 20.6852 21.4619C20.6245 21.4368 20.5694 21.4 20.523 21.3536L11.8765 12.7075L3.47703 21.1066C3.38315 21.1998 3.25615 21.252 3.12384 21.2518C2.99153 21.2516 2.86471 21.1989 2.77115 21.1054C2.6776 21.0118 2.62494 20.885 2.62471 20.7527C2.62448 20.6204 2.6767 20.4934 2.76992 20.3995L11.169 12L2.76992 3.6005C2.72332 3.55411 2.68633 3.49898 2.66106 3.43827C2.6358 3.37757 2.62275 3.31247 2.62268 3.24671C2.62261 3.18096 2.63551 3.11584 2.66063 3.05507C2.68576 2.99431 2.72263 2.9391 2.76913 2.8926C2.81563 2.84611 2.87084 2.80924 2.9316 2.78411C2.99237 2.75898 3.05749 2.74608 3.12325 2.74616C3.189 2.74623 3.2541 2.75928 3.3148 2.78454C3.37551 2.80981 3.43064 2.8468 3.47703 2.8934L11.8765 11.2925L20.523 2.64645C20.6167 2.55268 20.7439 2.5 20.8765 2.5C21.0091 2.5 21.1363 2.55268 21.2301 2.64645Z" fill="black"/>
         </svg>
         </p>
         </div>
        <DialogContent className='custom-dialog__content'>
        {ReactHtmlParser(content ? content : '')}  
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
