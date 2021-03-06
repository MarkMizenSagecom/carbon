import React from "react";
import { select, boolean } from "@storybook/addon-knobs";
import OptionsHelper from "../../utils/helpers/options-helper";
import Loader from ".";
import Button from "../button";

export default {
  title: "Design System/Loader/Test",
  component: Loader,
  parameters: {
    info: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

export const Default = () => {
  const size = select(
    "size",
    OptionsHelper.sizesBinary,
    Loader.defaultProps.size
  );
  const isInsideButton = boolean("isInsideButton", false);
  const isActive = isInsideButton
    ? boolean("isActive", Loader.defaultProps.isActive)
    : undefined;

  if (isInsideButton) {
    return (
      <Button buttonType="primary" disabled={!isActive}>
        <Loader
          size={size}
          isInsideButton={isInsideButton}
          isActive={isActive}
        />
      </Button>
    );
  }
  return <Loader size={size} />;
};

Default.story = {
  name: "default",
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};
