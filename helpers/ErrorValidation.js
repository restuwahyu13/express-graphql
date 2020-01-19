const { GraphQLError } = require('graphql');

//custome error validator and error handling
class ErrorValidation extends GraphQLError {
    constructor(errors) {

        super('');
        this.message = errors.reduce((result, error) => {

            return result;
        });
    }
}

module.exports = { ErrorValidation };