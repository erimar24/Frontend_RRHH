import React, { FC, ReactNode } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

/* interface Props {
  handleCloseModal(): void;
  modalBody(): ReactNode;
  modalButtons(): ReactNode;
  modalTitle: string;
  modalSize: "xs" | "sm" | "md" | "lg" | "xl";
  open: boolean;
  fullScreen: boolean;
}*/

const Modal = (props) => {
  return (
    <div>
      <BootstrapDialog
        fullScreen={props.fullScreen}
        maxWidth={props.modalSize}
        onClose={props.handleCloseModal}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={props.handleCloseModal}
        >
          {props.modalTitle}
        </BootstrapDialogTitle>
        <DialogContent dividers>{props.modalBody()}</DialogContent>
        <DialogActions>{props.modalButtons()}</DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default Modal;
