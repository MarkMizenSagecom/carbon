import {
  SAVE_BUTTON, CANCEL_BUTTON, FOOTER, ADDITIONAL_ACTIONS, LEFT_ALIGNED_ACTIONS,
  RIGHT_ALIGNED_ACTIONS, ERRORS, ERROR_MESSAGE, INPUT_VALIDATION,
} from './locators';

// component preview locators
export const saveButton = () => cy.iFrame(SAVE_BUTTON);
export const cancelButton = () => cy.iFrame(CANCEL_BUTTON);
export const buttons = () => cy.iFrame(FOOTER);
export const additionalActions = () => cy.iFrame(ADDITIONAL_ACTIONS);
export const leftAlignedActions = () => cy.iFrame(LEFT_ALIGNED_ACTIONS);
export const rightAlignedActions = () => cy.iFrame(RIGHT_ALIGNED_ACTIONS);
export const errorsSummary = () => cy.iFrame(ERRORS);
export const errorMessage = () => cy.iFrame(ERROR_MESSAGE);
export const inputValidation = () => cy.iFrame(INPUT_VALIDATION);
