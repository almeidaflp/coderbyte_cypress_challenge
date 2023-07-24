import { faker } from '@faker-js/faker';

const homeLocators = require('../support/pages/home/home-locators').ELEMENTS;
const signupLocators = require('../support/pages/signup/signup-locators').ELEMENTS

describe('Coderbyte Cypress challenge', () => {
  let username = faker.internet.userName()
  let password = faker.internet.password()

  beforeEach(() => {
    cy.visit('https://www.demoblaze.com/')
    cy.get(homeLocators.signUpButton)
      .should('be.visible')
      .click()
    cy.signupUser(username, password)
  })

  it('[TestCase - 1] - Validate sign-up success, error on try to signup existent user, login, logoff and error on invalid login', () => {
    let invalidUsername = faker.internet.userName()
    let invalidPassword = faker.internet.password()

    cy.get(homeLocators.signUpButton)
      .should('be.visible')
      .click()
    cy.get(signupLocators.signupButton).click()
    cy.validateAlertMessage('This user already exist.')
    cy.waitModalTransition()
    cy.get(signupLocators.closeButton).click({ force: true })
    cy.get(homeLocators.loginButton).click()
    cy.loginUser(username, password)
    cy.get(homeLocators.loggedUsername)
      .should('be.visible')
      .should('contain', username)
    cy.logout()
    cy.get(homeLocators.loginButton).click()
    cy.loginUser(invalidUsername, invalidPassword)
    cy.validateLoginMessage('User dont exists.')
  })

  it.only('[TestCase - 2] - Validate place order and populate modal', () => {
    let firstPhone = 1;
    let secondPhone = 4;
    cy.get(homeLocators.loginButton).click()
    cy.loginUser(username, password)

    cy.get(homeLocators.phonesButton).click()
    cy.selectPhonePerPosition(firstPhone).click()
    cy.contains('Add to cart').click()
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.eq('Product added.')
    })
    cy.get(homeLocators.homeBuutton).click()
    cy.get(homeLocators.phonesButton).click()
    cy.selectPhonePerPosition(secondPhone).click()
    cy.contains('Add to cart').click()
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.eq('Product added.')
    })
    cy.get(homeLocators.cartButton).click()
    cy.validateTotalValue()
    cy.deleteRandomPhone().click()
    cy.wait(1500)
    cy.validateValuesAfterDelete()
  })
})