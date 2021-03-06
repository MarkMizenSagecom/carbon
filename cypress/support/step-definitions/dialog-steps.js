import {
  alertDialogPreview as dialogPreview,
  dialogStickyFormFooterButton,
  dialogStickyFormFooter,
  openPreviewButton,
} from "../../locators/dialog/index";
import { backgroundUILocatorIFrame, dlsRoot } from "../../locators/index";
import { positionOfElement } from "../helper";
import { dialogPreviewIFrame } from "../../locators/confirm";

Then("Dialog height is set to {int}", (height) => {
  dialogPreview()
    .should("have.attr", "style")
    .should("contain", `min-height: ${height}px`);
});

Then("Dialog height is not set to {word}", (height) => {
  dialogPreview()
    .should("have.attr", "style")
    .should("not.contain", `min-height: ${height}px`);
});

Then("Dialog size property on preview is {string}", (size) => {
  dialogPreview().should("have.css", "width", `${size}px`);
});

Then("Dialog is visible in IFrame", () => {
  dialogPreviewIFrame().should("be.visible");
});

Then("Dialog is not visible in IFrame", () => {
  dialogPreviewIFrame().should("not.exist");
});

Then("Dialog stickyFormFooter is visible", () => {
  dialogStickyFormFooter().should("be.visible");
});

When("I click on {string} outside dialog", (position) => {
  dlsRoot().click(position, { force: true });
});

When("I click on background {string} outside dialog", (position) => {
  backgroundUILocatorIFrame().click(position, { force: true });
});

Then(
  "footer buttons have color {string} and has {int} px border",
  (color, px) => {
    dialogStickyFormFooterButton(positionOfElement("first"))
      .should("have.css", "border", `${px}px solid ${color}`)
      .and("have.css", "color", color);
    dialogStickyFormFooterButton(positionOfElement("first"))
      .children()
      .should("have.css", "color")
      .and("contain", color);
    dialogStickyFormFooterButton(positionOfElement("first"))
      .children()
      .should("have.css", "border-color", color);
    dialogStickyFormFooterButton(positionOfElement("second"))
      .should("have.css", "border", `${px}px solid rgba(0, 0, 0, 0)`)
      .and("have.css", "color", "rgb(255, 255, 255)");
    dialogStickyFormFooterButton(positionOfElement("second"))
      .should("have.css", "background-color")
      .and("contain", color);
  }
);

Then("Dialog is visible", () => {
  dialogPreview().should("be.visible");
});

When("I scroll to the bottom of the dialog", () => {
  dialogPreview().children().eq(1).scrollTo("bottom");
});

Then("The footer is not sticky", () => {
  dialogStickyFormFooter().should("not.have.class", "sticky");
});

When("I click on Open Preview button", () => {
  openPreviewButton().click();
});
