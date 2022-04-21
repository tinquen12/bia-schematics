import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  template,
  url,
  mergeWith,
  move,
  chain
} from '@angular-devkit/schematics'
import {strings} from '@angular-devkit/core'
import {Schema} from './schema'
import {getProperties} from '../../utils/jsonSchema'
import {parseName} from '../../utils/parse-name'
import {setupOptions, SetupOptions} from '../../utils/setup-options'
import {generateModel} from '../../utils/model-generation'

export default function (options: Schema): Rule {
  return async (host: Tree, context: SchematicContext) => {
    context.logger.info('Table component options: ' + JSON.stringify(options))

    await setupOptions(options as SetupOptions, host);
    
    const parsedName = parseName(options.path as string, options.name)
    const {rule, path: modelPath} = generateModel(options, parsedName)

    const properties = await getProperties(options.swaggerPath, options.pluralName)
    let standardRule = mergeWith(
      apply(url('./files'), [
        template({
          ...strings,
          ...options,
          properties,
          modelRelativePath: modelPath,
          isNested: false,
        }),
        move(parsedName.path),
      ]))

    if (rule)
      return chain([rule, standardRule])

    return standardRule
  }
}
