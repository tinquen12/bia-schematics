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
  type test = keyof Plane
  return [{key: 'test', type: 'string'}]
}
