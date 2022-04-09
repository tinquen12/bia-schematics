import {keys} from 'ts-transformer-keys'

interface Property {
  key: string
  type: 'string' | 'boolean' | 'number'
}

interface Plane {
  id: number
  msn: string
  isActive: boolean
  lastFlightDate: Date
  deliveryDate: Date
  syncTime: string
  capacity: number
  siteId: number
}

type Properties<T> = {
  [Key in keyof T]: T[Key]
}

function getPropertiesFromInterface<TInterface>(): Property[] {
  return [{key: 'test', type: 'string'}]
}
