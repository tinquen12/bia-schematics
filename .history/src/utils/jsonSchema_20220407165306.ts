import * as SwaggerParser from '@apidevtools/swagger-parser'
import {OpenAPI, OpenAPIV3_1} from 'openapi-types'

async function getProperties() {
  let api: OpenAPI.Document = await SwaggerParser.dereference(
    '../test/swagger.json',
  )

  console.log(api)
}

function getPathForEntity(
  document: OpenAPI.Document,
  entityName: string,
): OpenAPIV3_1.PathItemObject {
  if (!document.paths) throw 'No path is present in swagger file'
}

export {getProperties}
