const signupLocators = require('../pages/signup/signup-locators').ELEMENTS
const homeLocators = require('../pages/home/home-locators').ELEMENTS;

Cypress.Commands.add('signupUser', (username, password) => {
    cy.get(signupLocators.usernameInput)
        .click()
        .type(username, { delay: 0 })
        .should('have.value', username)
    cy.get(signupLocators.passwordInput)
        .click()
        .type(password, { delay: 0 })
        .should('have.value', password)
    cy.get(signupLocators.signupButton).click()
    cy.waitModalTransition()
})

Cypress.Commands.add('validateAlertMessage', message => {
    cy.on('window:alert', (alertText) => {
        expect(alertText).to.eq(message)
    })
})

Cypress.Commands.add('waitModalTransition', () => {
    cy.wait(1500)
})