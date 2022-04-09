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
import {parseName} from '../utils/parse-name'

function buildDefaultPath(name: string): string {
  return `${name}/components`
}

export default function (options: Schema): Rule {
  return async (_: Tree, context: SchematicContext) => {
    context.logger.info('Form component options: ' + JSON.stringify(options))

    if (options.path === undefined) {
      options.path = buildDefaultPath(options.name)
    }

    const parsedPath = parseName(options.path as string, options.name)
    console.log(parsedPath)

    const properties = await getProperties('pets')
    console.log(properties)
    return mergeWith(
      apply(url('./files'), [
        template({
          ...strings,
          ...options,
          properties,
          modelRelativePath: '../test.ts',
          isNested: false,
        }),
        move(parsedPath.path),
      ]),
    )
  }
}
