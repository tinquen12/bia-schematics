import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  template,
  url,
  mergeWith,
} from '@angular-devkit/schematics'
import {strings} from '@angular-devkit/core'
import {Schema} from './schema'
import {getProperties} from '../utils/jsonSchema'

export default function (options: Schema): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    context.logger.info('Table component options: ' + JSON.stringify(options))

    const properties = await getProperties('pets')
    return mergeWith(
      apply(url('./files'), [
        template({
          ...strings,
          ...options,
          properties,
        }),
      ]),
    )
    tree
    console.log(properties)
  }
}
