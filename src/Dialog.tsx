import * as React from "react";
import {
  Dialog as BaseDialog,
  DialogProps as BaseDialogProps,
} from "@reach/dialog";
import "@reach/dialog/styles.css";
import "./Dialog.css";

interface DialogProps {
  label?: string | React.ReactElement;
  actionButtons?: [];
  isOpen?: BaseDialogProps["isOpen"];
  onDismiss?: BaseDialogProps["onDismiss"];
}
export const Dialog: React.FC<DialogProps> = ({
  label,
  children,
  ...props
}) => (
  <BaseDialog {...props}>
    {typeof label === "string" ? <h1>{label}</h1> : label}
    {children}
  </BaseDialog>
);
