export function coerceBooleanProp(value: any): boolean {
    return value !== null && value !== undefined && `${value}`.toLowerCase() !== 'false';
}
