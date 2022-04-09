import {Rule, SchematicContext, Tree} from '@angular-devkit/schematics'
import {Schema} from './schema'
import {getProperties} from '../utils/jsonSchema'

export default function (options: Schema): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    context.logger.info('Table component options: ' + JSON.stringify(options))
    return tree
  }
}

export function test(options: Schema): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    return tree
  }
}