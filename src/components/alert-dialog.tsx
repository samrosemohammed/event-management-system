// components/AlertDialog.tsx

import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export interface AlertDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

export const AlertDialog = ({
  open,
  title = "Alert",
  description = "",
  onClose,
  onConfirm,
  confirmText = "OK",
  cancelText = "Cancel",
  showCancel = true,
}: AlertDialogProps) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {showCancel && (
          <Button onClick={onClose} color="primary">
            {cancelText}
          </Button>
        )}
        <Button onClick={handleConfirm} color="warning" autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
