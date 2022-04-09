interface Property {
  key: string
  type: 'string' | 'boolean' | 'number'
}

type Properties<T> = {
  [Key in keyof T]: T[Key]
}

function getPropertiesFromInterface<TInterface>(): Property[] {
  type test = Properties<Property>
  return [{key: 'test', type: 'string'}]
}
