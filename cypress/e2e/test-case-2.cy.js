import { faker } from '@faker-js/faker';

import homeLocators from '../support/pages/home/home-locators';

describe('Coderbyte Cypress challenge', () => {
    let username = faker.internet.userName();
    let password = faker.internet.password();

    beforeEach(() => {
        cy.visit('https://www.demoblaze.com/');
        cy.get(homeLocators.signUpButton).should('be.visible').click();
        cy.signupUser(username, password);
    });

    it('[TestCase - 2] - Validate place order and populate modal', () => {
        const firstPhone = 1;
        const secondPhone = 4;
        let randomName = faker.person.fullName;
        let randomCountry = faker.location.country;
        let randomCity = faker.location.city;
        let randomCreditCard = faker.finance.creditCardNumber;
        let randomCCMonth = faker.date.month;
        let randomCCYear = faker.finance.year;

        cy.get(homeLocators.loginButton).click();
        cy.loginUser(username, password);
        cy.get(homeLocators.phonesButton).click();
        cy.selectPhonePerPosition(firstPhone).click();
        cy.contains('Add to cart').click();
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.eq('Product added.');
        });
        cy.get(homeLocators.homeBuutton).click();
        cy.get(homeLocators.phonesButton).click();
        cy.selectPhonePerPosition(secondPhone).click();
        cy.contains('Add to cart').click();
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.eq('Product added.');
        });
        cy.waitPageTransition();
        cy.get(homeLocators.cartButton).click();
        cy.validateTotalValue();
        cy.deleteRandomPhone().click();
        cy.waitPageTransition();
        cy.validateValuesAfterDelete();
        cy.placeOrder();
    });
});
