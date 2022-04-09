import * as SwaggerParser from '@apidevtools/swagger-parser'

function async getProperties(): any {
  let api = await SwaggerParser.dereference('../../test/swagger.json')
}
