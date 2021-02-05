import React from "react";
import I18n from "i18n-js";
import classNames from "classnames";
import PropTypes from "prop-types";
import Dialog from "../dialog";
import { StyledConfirmButtons, StyledConfirmHeading } from "./confirm.style";
import Button from "../button/button.component";
import Icon from "../icon";
import Loader from "../loader";
import OptionsHelper from "../../utils/helpers/options-helper";

class Confirm extends Dialog {
  // ** Returns main classes for the component combined with dialog main classes. */
  get mainClasses() {
    return classNames(super.mainClasses);
  }

  renderCancelButton() {
    if (!this.props.onCancel) return null;

    return (
      <Button
        onClick={this.props.onCancel}
        data-element="cancel"
        buttonType={this.props.cancelButtonType}
        destructive={this.props.destructive}
        disabled={this.props.disabledCancel}
      >
        {this.props.cancelLabel || I18n.t("confirm.no", { defaultValue: "No" })}
      </Button>
    );
  }

  renderConfirmButton() {
    return (
      <Button
        onClick={this.props.onConfirm}
        data-element="confirm"
        buttonType="primary"
        destructive={this.props.destructive}
        disabled={this.props.isLoading || this.props.disabledConfirm}
        ml={this.props.cancelButtonType === "tertiary" ? 0 : 2}
      >
        {this.props.isLoading ? (
          <Loader isInsideButton isActive />
        ) : (
          this.props.confirmLabel ||
          I18n.t("confirm.yes", { defaultValue: "Yes" })
        )}
      </Button>
    );
  }

  // ** Get the yes and no buttons for the confirm dialog */
  additionalContent() {
    return (
      <StyledConfirmButtons>
        {this.renderCancelButton()}
        {this.renderConfirmButton()}
      </StyledConfirmButtons>
    );
  }

  getTitle(title) {
    const { iconType } = this.props;
    if (this.props.iconType) {
      return (
        <StyledConfirmHeading type={iconType} data-element={iconType}>
          <Icon type={iconType} fontSize="large" />
          {title}
        </StyledConfirmHeading>
      );
    }
    return title;
  }

  componentTags(props) {
    return {
      "data-component": "confirm",
      "data-element": props["data-element"],
      "data-role": props["data-role"],
    };
  }
}

Confirm.defaultProps = {
  ...Dialog.defaultProps,
  size: "extra-small",
  showCloseIcon: false,
  destructive: false,
  iconType: null,
  cancelButtonType: "secondary",
};

Confirm.propTypes = {
  ...Dialog.propTypes,
  // ** A custom event handler when a confirmation takes place */
  onConfirm: PropTypes.func.isRequired,
  // ** Customise the confirm button label */
  confirmLabel: PropTypes.string,
  // ** Customise the cancel button label */
  cancelLabel: PropTypes.string,
  /** Apply destructive style to the buttons */
  destructive: PropTypes.bool,
  /** Defines an Icon type within the button (see Icon for options) */
  iconType: PropTypes.oneOf(["error", "warning"]),
  /** Makes cancel button disable */
  disabledCancel: PropTypes.bool,
  /** Makes confirm button disable */
  disabledConfirm: PropTypes.bool,
  /** Allows to setup buttonType into cancel button */
  cancelButtonType: PropTypes.oneOf(OptionsHelper.buttonTypes),
  /** Adds isLoading state into confirm button */
  isLoading: PropTypes.bool,
};

export default Confirm;
