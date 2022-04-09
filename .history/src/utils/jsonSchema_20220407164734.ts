import * as SwaggerParser from '@apidevtools/swagger-parser'
import {Document} from 'openapi-types'

async function getProperties() {
  let api = await SwaggerParser.dereference('../test/swagger.json')

  console.log(api)
}

export {getProperties}
