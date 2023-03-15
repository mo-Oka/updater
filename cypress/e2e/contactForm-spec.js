const testData = require('../fixtures/contactForm.json')
// in a real project all locators also would be in a separate file

describe('Creating New Contact Form', () => {
    beforeEach(() => {
        cy.visit('/new-contact'); // this will extent the base url from cypress config
    });

    it('should display the correct title', () => {
        cy.get('h1').should('contain', 'Creating New Contact');
    });

    it('should display the correct fields', () => {
        cy.get('label[for="contact-type"]').should('contain', 'Contact Type');
        cy.get('label[for="customer-number"]').should('contain', 'Customer Number');
        cy.get('label[for="first-name"]').should('contain', 'First Name');
        cy.get('label[for="office-phone"]').should('contain', 'Office Phone');
        cy.get('label[for="home-phone"]').should('contain', 'Home Phone');
        cy.get('label[for="primary-email"]').should('contain', 'Primary Email');
        cy.get('label[for="last-name"]').should('contain', 'Last Name');
        cy.get('label[for="mobile-phone"]').should('contain', 'Mobile Phone');
        cy.get('label[for="department"]').should('contain', 'Department');
        cy.get('label[for="secondary-email"]').should('contain', 'Secondary Email');
    });

    it('should require Contact Type in the Custom Information section', () => {
        cy.get('[data-cy=contact-type]').select(' '); // or another way to deselect the dropdown
        cy.get('[data-cy=save]').click();
        cy.get('.error').should('contain', 'Please select a Contact Type'); // all banners text is an assumption
    });

    it('should require Last Name in the Basic Information section', () => {
        cy.get('[data-cy=contact-type]').select(testData.contactType);
        cy.get('[data-cy=save]').click();
        cy.get('.error').should('contain', 'Please enter a Last Name');
    });

    it('should save with mandatory fields only', () => {
        cy.get('[data-cy=contact-type]').select(testData.contactType);  // Transferee is hardcoded
        cy.get('[data-cy=last-name]').type(testData.lastName);
        cy.get('[data-cy=save]').click();
        // it is unclear what should happen after saving. If a new conformation page should be open, here should be an assert for it

        // if the same form should be present, there should be a banner and the form should be cleared
        // or all info should be saved. The example below is for all info saved scenario
        cy.get('.error').should('not.exist');
        cy.get('.success').should('contain', 'Contact saved successfully');
        cy.url().should('contain', '/contact-details');
        cy.contains(testData.contactType);
        cy.contains(testData.customerNumber);
    });

    it('should allow optional fields to be filled in', () => {
        cy.get('[data-cy=contact-type]').select(testData.contactType);
        cy.get('[data-cy=customer-number]').type(testData.customerNumber);
        cy.get('[data-cy=last-name]').type(testData.lastName);
        cy.get('[data-cy=first-name]').type(testData.firstName);
        cy.get('[data-cy=office-phone]').type(testData.officePhone);
        cy.get('[data-cy=home-phone]').type(testData.homePhone);
        cy.get('[data-cy=primary-email]').type(testData.primaryEmail);
        cy.get('[data-cy=mobile-phone]').type(testData.mobilePhone);
        cy.get('[data-cy=department]').type(testData.department);
        cy.get('[data-cy=secondary-email]').type(testData.secondaryEmail);
        cy.get('[data-cy=save]').click();
        cy.get('.error').should('not.exist');
        cy.get('.success').should('contain', 'Contact saved successfully');
    });

    it('should be able to cancel the form', () => {
        cy.get('[data-cy=cancel]').click();
        cy.url().should('not.contain', '/new-contact'); // here should be an assertion for the previous or home page
    });
})

// Due to time limit I won't implement the details, but show the idea
describe('Negative scenarios for New Contact Form', () => {
    it('the form does not submit if invalid phone is entered', () => {});
    it('the form does not submit if invalid email is entered', () => {});
    it('the form correctly handles special characters in input fields', () => {});
    it('the form correctly handles long input strings or has max characters limit', () => {});
    it('the form does not allow duplicate entries', () => {});
    it('the form correctly handles multiple optional fields with the same name', () => {});
})

