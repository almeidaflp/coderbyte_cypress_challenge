import signupLocators from '../pages/signup/signup-locators';

Cypress.Commands.add('signupUser', (username, password) => {
    cy.get(signupLocators.usernameInput)
        .click()
        .type(username, { delay: 0 })
        .should('have.value', username);
    cy.get(signupLocators.passwordInput)
        .click()
        .type(password, { delay: 0 })
        .should('have.value', password);
    cy.get(signupLocators.signupButton).click();
    cy.waitPageTransition();
});

Cypress.Commands.add('validateAlertMessage', (message) => {
    const alertShown = cy.stub().as('alertShown');

    cy.on('window:alert', alertShown);

    cy.get('@alertShown').should('have.been.calledOnceWith', message);
});

Cypress.Commands.add('waitPageTransition', () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1500);
});
