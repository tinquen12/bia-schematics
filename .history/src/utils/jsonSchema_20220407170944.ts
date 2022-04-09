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

  const getPath = Object.entries(document.paths)
    .filter(
      ([key, value]: [string, OpenAPIV3_1.PathItemObject]) =>
        key.includes(entityName) && value.get,
    )
    .map(([_, value]: [string, OpenAPIV3_1.PathItemObject]) => value.get)[0]

  console.log(getPath)

  return getPath
}

function getSuccessResponse(
  path: OpenAPIV3_1.PathItemObject,
): OpenAPIV3_1.SchemaObject | void {}

export {getProperties}
