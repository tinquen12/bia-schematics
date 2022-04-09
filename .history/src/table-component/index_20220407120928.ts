import {Rule, SchematicContext, Tree} from '@angular-devkit/schematics'
import {Schema} from './schema'

export default function (options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Table component options: ' + JSON.stringify(options))

    // At the end, you can either return a Tree (that will be used), or an observable of a
    // Tree (if you have some asynchronous tasks).
    return tree
  }
}
