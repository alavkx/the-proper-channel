import * as React from "react";
import {
  Dialog as BaseDialog,
  DialogProps as BaseDialogProps,
} from "@reach/dialog";
import "@reach/dialog/styles.css";
import "./Dialog.css";

interface DialogProps {
  label: string;
  heading?: string | React.ReactElement;
  actionButtons?: [];
  isOpen?: BaseDialogProps["isOpen"];
  onDismiss?: BaseDialogProps["onDismiss"];
}
export const Dialog: React.FC<DialogProps> = ({
  label,
  heading,
  children,
  ...props
}) => (
  <BaseDialog {...props} aria-label={label}>
    {typeof heading === "string" ? <h1>{heading}</h1> : heading}
    {children}
  </BaseDialog>
);
