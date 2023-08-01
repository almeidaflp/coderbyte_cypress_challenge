import './commands/signup-commands';
import './commands/login-commands';
import './commands/checkout-commands';

Cypress.SelectorPlayground.defaults({
    selectorPriority: [
        'id',
        'data-testid',
        'data-cy',
        'data-test',
        'class',
        'attributes',
        'tag',
        'nth-child',
    ],
});
