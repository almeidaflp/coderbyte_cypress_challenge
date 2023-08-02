import checkoutLocators from '../pages/checkout/checkout-locators';

Cypress.Commands.add('selectPhonePerPosition', (position) => {
    return cy.get(
        `:nth-child(${position}) > .card > .card-block > .card-title > .hrefch`,
    );
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

Cypress.Commands.add('deleteRandomPhone', () => {
    const randomFirstChild = getRandomInt(1, 3);
    return cy.get(
        `#tbodyid > :nth-child(${randomFirstChild}) > :nth-child(4) > [href="#"]`,
    );
});

Cypress.Commands.add('validateTotalValue', () => {
    cy.get('#tbodyid > :nth-child(1) > :nth-child(3)').then(($element1) => {
        const value1 = parseInt($element1.text());

        cy.get('#tbodyid > :nth-child(2) > :nth-child(3)').then(($element2) => {
            const value2 = parseInt($element2.text());

            cy.get('#totalp').then(($totalElement) => {
                const totalValue = parseInt($totalElement.text());

                const expectedSum = value1 + value2;

                expect(expectedSum).to.equal(totalValue);
            });
        });
    });
});

Cypress.Commands.add('validateValuesAfterDelete', () => {
    cy.get('.success > :nth-child(3)').then(($element1) => {
        const value1 = $element1.text().trim();
        cy.log(value1);

        cy.get('#totalp').then(($totalElement) => {
            const totalValue = $totalElement.text().trim();

            expect(value1).to.equal(totalValue);
        });
    });
});

Cypress.Commands.add(
    'placeOrder',
    (name, country, city, ccnumber, month, year) => {
        cy.get(checkoutLocators.placeOrderButton).should('be.visible').click();
        cy.get(checkoutLocators.orderName)
            .type(name, { delay: 1 })
            .should('have.value', name);
        cy.get(checkoutLocators.orderCity)
            .type(city, { delay: 1 })
            .should('have.value', city);
        cy.get(checkoutLocators.orderCountry)
            .type(country, { delay: 0 })
            .should('have.value', country);
        cy.get(checkoutLocators.orderCreditCard)
            .type(ccnumber, { delay: 0 })
            .should('have.value', ccnumber);
        cy.get(checkoutLocators.orderCardMonth)
            .type(month, { delay: 0 })
            .should('have.value', month);
        cy.get(checkoutLocators.orderCardYear)
            .type(year, { delay: 0 })
            .should('have.value', year);
        cy.get(checkoutLocators.purchaseButton).should('be.visible').click();
    },
);
