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

function getPropertiesFromInterface<TInterface>(): Property[] {
  const test = JSON.parse(Plane)
  return [{key: 'test', type: 'string'}]
}
