import { JSONArrayValidator, JSONSchemaValidator } from "../../src/utilities/JSONValidation";

describe('Testing JSON Validation', () => {
    test('Object with primitives', () => {
        const validator: JSONSchemaValidator = new JSONSchemaValidator().add('key0', 'string').add('key1', 'number').add('key2', 'boolean');
        const validObject = {'key0': 'hello', 'key1': 3.14, 'key2': true};
        const invalidObject0 = {'key0': 42, 'key1': 78, 'key2': false};
        const invalidObject1 = {'key0': 'hi', 'key1': 78};
        expect(validator.validate(validObject)).toBe(true);
        expect(validator.validate(invalidObject0)).toBe(false);
        expect(validator.validate(invalidObject1)).toBe(false);
    });
    test('Nested objects', () => {
        const innerVal: JSONSchemaValidator = new JSONSchemaValidator().add('inner0', 'string');
        const outerVal: JSONSchemaValidator = new JSONSchemaValidator().add('outer0', 'number').add('inner', innerVal);
        const validObject = {'outer0': 42, 'inner': {'inner0': 'hello'}};
        const invalidObject = {'outer0': 13, 'inner': {'inner0': false}};
        expect(outerVal.validate(validObject)).toBe(true);
        expect(outerVal.validate(invalidObject)).toBe(false);
    });
    test('Optional values', () => {
        const validator = new JSONSchemaValidator().add('optionalKey0', 'string', true).add('key0', 'boolean');
        const validObject = {'key0': false};
        const invalidObject = {'optionalKey0': 'howdy'};
        expect(validator.validate(validObject)).toBe(true);
        expect(validator.validate(invalidObject)).toBe(false);
    });
    test('Array object', () => {
        const validator = new JSONArrayValidator({'type': 'string', 'optional': true});
        const validArray0 = ['abc', 'def', 'ghi'];
        const validArray1 = ['xyz', undefined];
        const invalidArray0 = ['abc', 42];
        const invalidArray1 = [null];
        expect(validator.validate(validArray0)).toBe(true);
        expect(validator.validate(validArray1)).toBe(true);
        expect(validator.validate(invalidArray0)).toBe(false);
        expect(validator.validate(invalidArray1)).toBe(false);
        expect(validator.validate(undefined)).toBe(false);
        expect(validator.validate(null)).toBe(false);
    });
});