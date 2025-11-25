export enum ComponentTypeEnum {
  SERVER = 'Server',
  CLIENT = 'Client',
  ISOMORPHIC = 'Isomorphic',
}
export function detectActualType() {
  return typeof window === 'undefined'
    ? ComponentTypeEnum.SERVER
    : ComponentTypeEnum.CLIENT
}
