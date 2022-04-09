import * as SwaggerParser from '@apidevtools/swagger-parser'
import * as OpenApi from 'openapi-types'

async function getProperties() {
  let api: ApiDocument = await SwaggerParser.dereference('../test/swagger.json')

  console.log(api)
}

export {getProperties}
