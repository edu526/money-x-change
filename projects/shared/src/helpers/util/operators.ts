export function isDef(v: any): boolean {
  return v !== undefined && v !== null;
}

export function isObjNotEmpty(o: {}): boolean {
  return !!(o && Object.keys(o).length);
}

export function cloneObject<T>(o: T): T {
  return JSON.parse(JSON.stringify(o));
}
