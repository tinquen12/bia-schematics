import * as SwaggerParser from '@apidevtools/swagger-parser'
import {OpenAPI, OpenAPIV3_1} from 'openapi-types'

async function getProperties() {
  let api: OpenAPI.Document = await SwaggerParser.dereference(
    '../test/swagger.json',
  )

  console.log(api)
}

function getPathForEntity(entityName: string): OpenAPI {}

export {getProperties}
