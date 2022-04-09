import {Plane} from '../../test/plane'

interface Property {
  key: string
  type: 'string' | 'boolean' | 'number'
}

function getPropertiesFromInterface<TInterface>(): Property[] {
  type Props = {
    [Name in keyof TInterface]: TInterface[Name]
  }

  return [{key: 'test', type: 'string'}]
}
