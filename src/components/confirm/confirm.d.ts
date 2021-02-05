import * as React from 'react';

export interface ConfirmProps {
  onConfirm: () => void;
  // ** Customise the confirm button label */
  confirmLabel: string;
  // ** Customise the cancel button label */
  cancelLabel: string;
  /** Apply destructive style to the buttons */
  destructive: boolean;
  /** Defines an Icon type within the button (see Icon for options) */
  iconType: "error" | "warning";
  /** Makes cancel button disable */
  disabledCancel: boolean;
  /** Makes confirm button disable */
  disabledConfirm: boolean;
  /** Allows to setup buttonType into cancel button */
  cancelButtonType: 'primary' | 'secondary' | 'tertiary' | 'dashed' | 'destructive' | 'darkBackground';
  /** Adds isLoading state into confirm button */
  isLoading: boolean;
}

declare const Confirm: React.ComponentClass<ConfirmProps>;

export default Confirm;
