import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  template,
  url,
  mergeWith,
  move,
} from '@angular-devkit/schematics'
import {strings} from '@angular-devkit/core'
import {Schema} from './schema'
import {getProperties} from '../utils/jsonSchema'

function buildDefaultPath(name: string): string {
  return `${name}/components`
}

export default function (options: Schema): Rule {
  return async (_: Tree, context: SchematicContext) => {
    context.logger.info('Table component options: ' + JSON.stringify(options))

    const componentPath = buildDefaultPath(options.name)

    const properties = await getProperties('pets')
    return mergeWith(
      apply(url('./files'), [
        template({
          ...strings,
          ...options,
          properties,
          modelRelativePath: '../test.ts',
          isNested: false,
        }),
        move,
      ]),
    )
  }
}
