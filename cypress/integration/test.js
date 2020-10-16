// write tests here
describe('Form testing', () => {

    // schedule somethign to happen before each test
    // before each test we navigate to http://localhost:1234
    // EACH TEST NEEDS FRESH STATE
    beforeEach(() => {
      cy.visit('http://localhost:3000/pizza')
    })
    it("Fills out the form", () => {
        const name = "David Hall"
        const address = "18 Hillside ave";
        const price1 = "$14.99";
    const price2 = "$19.99";
    const price3 = "$24.99";
    

    //check to see if you can fill out the name
    cy.get('[placeholder="Full Name"]').type(name).should('have.value', name)

    //check to see if it can fill out the address
    cy.get('[name="address"]').type(address).should('have.value', address)
    
    //check to see ig it can select multiple checkboxes
    cy.get('[name="mushroom"], [name="onion"]').check().should('be.checked') //and it passes

    //select a size so the form can be submited
    cy.get('#select-tag').select(`Small ${price1}`).should('have.value', "small")
    
    //check to see if a user can submit the form
    cy.get('form').submit() //true shows that i can get a POST request so it passes AND THE button is being desabled
    })

    
})