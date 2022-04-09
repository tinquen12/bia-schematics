import * as SwaggerParser from '@apidevtools/swagger-parser'
import {OpenAPI} from 'openapi-types'

async function getProperties() {
  let api: OpenAPI.Document = await SwaggerParser.dereference(
    '../test/swagger.json',
  )

  console.log(api)
}

export {getProperties}
