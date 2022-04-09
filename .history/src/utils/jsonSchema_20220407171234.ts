import * as SwaggerParser from '@apidevtools/swagger-parser'
import {OpenAPI, OpenAPIV3_1} from 'openapi-types'

async function getProperties(entityName: string) {
  let document: OpenAPI.Document = await SwaggerParser.dereference(
    '../test/swagger.json',
  )

  const getPath = getPathForEntity(document, entityName)
  if (!getPath) throw 'No Get path found for the entity ' + entityName
  getSuccessResponse(getPath)
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

  return getPath
}

function getSuccessResponse(
  path: OpenAPIV3_1.PathItemObject,
): OpenAPIV3_1.SchemaObject | void {
  console.log(path)
}

export {getProperties}
