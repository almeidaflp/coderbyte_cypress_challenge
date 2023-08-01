import { faker } from '@faker-js/faker';

import homeLocators from '../support/pages/home/home-locators';
import signupLocators from '../support/pages/signup/signup-locators';

describe('Coderbyte Cypress challenge', () => {
    let username = faker.internet.userName();
    let password = faker.internet.password();

    beforeEach(() => {
        cy.visit('https://www.demoblaze.com/');
        cy.get(homeLocators.signUpButton).should('be.visible').click();
        cy.signupUser(username, password);
    });

    it.only('[TestCase - 1] - Validate sign-up success, error on try to signup existent user, login, logoff and error on invalid login', () => {
        let invalidUsername = faker.internet.userName();
        let invalidPassword = faker.internet.password();

        cy.get(homeLocators.signUpButton).should('be.visible').click();
        cy.get(signupLocators.signupButton).click();
        cy.validateAlertMessage('This user already exist.');
        cy.get(signupLocators.closeButton).click();
        cy.waitPageTransition();
        cy.get(homeLocators.loginButton).click();
        cy.loginUser(username, password);
        cy.get(homeLocators.loggedUsername)
            .should('be.visible')
            .should('contain', username);
        cy.logout();
        cy.get(homeLocators.loginButton).click();
        cy.loginUser(invalidUsername, invalidPassword);
        cy.validateAlertMessage('User does not exist.');
    });
});
