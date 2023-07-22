describe('Coderbyte cypress challenge', () => {
  it('Validate sign-up with sucess - Test 1 case', () => {
    cy.visit('https://www.demoblaze.com/')
    cy.get('#signin2').click()
    cy.get('#sign-username')
  })
})