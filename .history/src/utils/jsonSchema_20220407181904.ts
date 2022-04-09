import * as SwaggerParser from '@apidevtools/swagger-parser'
import {OpenAPI, OpenAPIV3_1} from 'openapi-types'

interface Property {
  [name: string]: 'string' | 'integer' | 'boolean'
}

async function getProperties(entityName: string) {
  let document: OpenAPI.Document = await SwaggerParser.dereference(
    '../test/swagger.json',
  )

  // TODO: add the validation of the version

  const getPath = getPathForEntity(document, entityName)
  if (!getPath) throw 'No Get path found for the entity ' + entityName
  const response = getSuccessResponse(getPath)
  if (!response) throw 'No response found'
  getResponseProperties(response)
}

function getPathForEntity(
  document: OpenAPI.Document,
  entityName: string,
): OpenAPIV3_1.OperationObject | void {
  if (!document.paths) throw 'No get path is present in swagger file.'

  const getPath = Object.entries(document.paths)
    .filter(
      ([key, value]: [string, OpenAPIV3_1.PathItemObject]) =>
        key.endsWith(entityName) && value.get,
    )
    .map(([_, value]: [string, OpenAPIV3_1.PathItemObject]) => value.get)[0]

  return getPath
}

function getSuccessResponse(
  path: OpenAPIV3_1.OperationObject,
  mediaType: 'application/json' = 'application/json',
): OpenAPIV3_1.SchemaObject | void {
  if (!path.responses?.['200']) throw 'No 200 status found.'

  const successResponse = path.responses['200'] as OpenAPIV3_1.ResponseObject
  if (!successResponse.content?.[mediaType])
    throw `The mediatype ${mediaType} is not known`

  return successResponse.content[mediaType]
    .schema as OpenAPIV3_1.ArraySchemaObject
}

function getResponseProperties(
  response: OpenAPIV3_1.SchemaObject,
): Property[] | void {
  console.log(response)
}

export {getProperties}
