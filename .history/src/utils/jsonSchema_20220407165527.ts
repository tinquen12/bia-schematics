import * as SwaggerParser from '@apidevtools/swagger-parser'
import {OpenAPI, OpenAPIV3_1} from 'openapi-types'

async function getProperties() {
  let document: OpenAPI.Document = await SwaggerParser.dereference(
    '../test/swagger.json',
  )

  getPathForEntity(document, 'pet')
}

function getPathForEntity(
  document: OpenAPI.Document,
  entityName: string,
): OpenAPIV3_1.PathItemObject | void {
  if (!document.paths) throw 'No path is present in swagger file'

  console.log(entityName)
  console.log(document.paths)
  return
}

export {getProperties}
