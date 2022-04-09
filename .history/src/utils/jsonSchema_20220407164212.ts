import * as SwaggerParser from '@apidevtools/swagger-parser'

async function getProperties() {
  let api = await SwaggerParser.dereference('../../test/swagger.json')
  console.log(api)
}
