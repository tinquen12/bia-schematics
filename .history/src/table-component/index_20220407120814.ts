import {Rule, SchematicContext, Tree} from '@angular-devkit/schematics'
import {Schema} from './schema'

export default function (options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('My Schematic: ' + JSON.stringify(options))

    // Create a single file. This is the simplest example of transforming the tree.
    // If a file with that name already exists, the generation will NOT fail until the tool
    // is trying to commit this to disk. This is because we allow you to work on what is
    // called a "staging" area, and only finalize those changes when the schematics is
    // done. This allows you to create files without having to verify if they exist
    // already, then rename them later. Templating works in a similar fashion.
    tree.create('hello', 'world')

    // At the end, you can either return a Tree (that will be used), or an observable of a
    // Tree (if you have some asynchronous tasks).
    return tree
  }
}
