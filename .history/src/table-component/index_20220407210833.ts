import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  template,
} from '@angular-devkit/schematics'
import {Schema} from './schema'
import {getProperties} from '../utils/jsonSchema'

export default function (options: Schema): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    context.logger.info('Table component options: ' + JSON.stringify(options))

    apply(url('./files'), [
      template({
        INDEX: options.index,
        name: options.name,
      }),
    ])

    const properties = await getProperties('pets')
    tree
    console.log(properties)
  }
}
