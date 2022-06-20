type FieldType = 'string' | 'number' | 'boolean' | JSONSchemaValidator | JSONArrayValidator | JSONMatchValidator

interface ValidationType {
    type: FieldType;
    optional: boolean;
}

function containsError(expected: FieldType, value: any, optional: boolean): boolean {
    if (value === undefined) {
        if (!optional) return true;
    }
    else if (expected == 'string' || expected == 'number' || expected == 'boolean') {
        if (typeof value != expected) return true;
    }
    else if (!expected.validate(value)) return true;
    
    return false;
}

export class JSONMatchValidator {

    private regExp: RegExp;

    constructor(regEx: RegExp) {
        this.regExp = regEx;
    }

    public validate(object: unknown): boolean {
        if (typeof object != 'string') return false;
        return object.match(this.regExp) !== null;
    }
}

export class JSONArrayValidator {

    private schema: ValidationType;

    constructor(type: ValidationType) {
        this.schema = type;
    }

    public validate(object: unknown): boolean {
        if (typeof object !== 'object' || object === null || !Array.isArray(object)) return false;
        for (const item of object) {
            if (containsError(this.schema.type, item, this.schema.optional)) return false;
        }
        return true;
    }
}

export class JSONSchemaValidator {

    private schema: Record<string, ValidationType>;

    constructor() {
        this.schema = {};
    }

    public validate(object: unknown): boolean {
        if (typeof object !== 'object' || object === null || Array.isArray(object)) return false;
        const objectRecord = object as Record<string, any>;

        for (const key in this.schema) {
            const expected = this.schema[key].type;
            const value = objectRecord[key];
            if (containsError(expected, value, this.schema[key].optional)) {
                return false;
            }
        }
        return true;
    }

    public add(key: string, type: FieldType, optional?: boolean): JSONSchemaValidator {
        this.schema[key] = {
            type: type,
            optional: !!optional
        };
        return this;
    }
}