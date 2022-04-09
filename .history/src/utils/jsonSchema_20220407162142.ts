import SwaggerParser from '@apidevtools/swagger-parser'

function getProperties() {
  let api = await SwaggerParser.dereference('../../test/swagger.json')
}
