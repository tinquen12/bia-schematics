import {Rule, SchematicContext, Tree} from '@angular-devkit/schematics'
import {Schema} from './schema'

export default function (options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Table component options: ' + JSON.stringify(options))

    return tree
  }
}
