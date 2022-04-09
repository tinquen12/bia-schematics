import * as SwaggerParser from '@apidevtools/swagger-parser'
import {Document as ApiDocument} from 'openapi-types'

async function getProperties() {
  let api: ApiDocument = await SwaggerParser.dereference('../test/swagger.json')

  console.log(api)
}

export {getProperties}
