const loginLocators = require('../pages/login/login-locators').ELEMENTS
const homeLocators = require('../pages/home/home-locators').ELEMENTS;

Cypress.Commands.add('selectPhonePerPosition', (position) => {
    return cy.get(`:nth-child(${position}) > .card > .card-block > .card-title > .hrefch`)
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

Cypress.Commands.add('deleteRandomPhone', () => {
    const randomFirstChild = getRandomInt(1, 3)
    return cy.get(`:nth-child(${randomFirstChild}) > :nth-child(4) > [href="#"]`)
})

Cypress.Commands.add('validateTotalValue', () => {
    cy.get('#tbodyid > :nth-child(1) > :nth-child(3)').then(($element1) => {
        const value1 = parseFloat($element1.text())

        cy.get('#tbodyid > :nth-child(2) > :nth-child(3)').then(($element2) => {
            const value2 = parseFloat($element2.text())

            cy.get('#totalp').then(($totalElement) => {
                const totalValue = parseFloat($totalElement.text())

                const expectedSum = value1 + value2

                expect(expectedSum).to.equal(totalValue)
            })
        })
    })
})

Cypress.Commands.add('validateValuesAfterDelete', () => {
    cy.wait(1200)
    cy.get('.success > :nth-child(3)').then(($element1) => {
        const value1 = $element1.text().trim();

        cy.get('#totalp').then(($totalElement) => {
            const totalValue = $totalElement.text().trim();

            expect(value1).to.equal(totalValue);
        });
    });
});
