import {Rule, SchematicContext, Tree} from '@angular-devkit/schematics'
import {Schema} from './schema'
import {getProperties} from '../utils/jsonSchema'

export default async function (options: Schema): Promise<Rule> {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Table component options: ' + JSON.stringify(options))

    const properties = await getProperties('pets')
    console.log(properties)
    return tree
  }
}
