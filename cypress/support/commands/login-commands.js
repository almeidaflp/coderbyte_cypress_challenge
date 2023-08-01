import loginLocators from '../pages/login/login-locators';
import homeLocators from '../pages/home/home-locators';

Cypress.Commands.add('loginUser', (username, password) => {
    cy.get(loginLocators.usernameInput)
        .click()
        .type(username, { delay: 0 })
        .should('have.value', username);
    cy.get(loginLocators.passwordInput)
        .click()
        .type(password, { delay: 0 })
        .should('have.value', password);
    cy.get(loginLocators.loginButton).click();
});

Cypress.Commands.add('logout', () => {
    cy.get(homeLocators.logoutButton).should('be.visible').click();
    cy.get(homeLocators.loginButton, { timeout: 10000 }).should('be.visible');
});

Cypress.Commands.add('validateLoginMessage', (message) => {
    cy.on('window:alert', (alertText) => {
        expect(alertText).to.eq(message);
    });
});
