import * as SwaggerParser from '@apidevtools/swagger-parser'
import {OpenAPIV3_1} from 'openapi-types'

async function getProperties() {
  let api: OpenAPIV3_1.Document = await SwaggerParser.dereference(
    '../../test/swagger.json',
  )

  console.log(api)
}

export {getProperties}
