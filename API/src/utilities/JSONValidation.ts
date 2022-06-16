type FieldType = 'string'

interface ValidationType {
    type: FieldType;
    optional: boolean;
}

export class JSONValidator {

    private schema: Record<string, ValidationType>;

    constructor() {
        this.schema = {};
    }

    public validate(object: unknown): boolean {
        return true; //todo
    }

    public add(key: string, type: FieldType, optioanl?: boolean) {
        this.schema[key] = {
            type: type,
            optional: !!optioanl
        };
        return this;
    }
}