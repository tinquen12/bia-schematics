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
import {getProperties} from '../utils/jsonSchema'
import {parseName} from '../utils/parse-name'
import {setupOptions, SetupOptions} from '../utils/setup-options'
import {generateModel} from '../utils/model-generation'


export default function (options: Schema): Rule {
  return async (host: Tree, context: SchematicContext) => {
    context.logger.info('Store options: ' + JSON.stringify(options))

    await setupOptions(options as SetupOptions, host);
    const parsedName = parseName(options.path as string, options.name)

    const id = (await getProperties(options.swaggerPath, options.pluralName)).filter(
      ({name}) => name === 'id',
    )[0]

    if (!id)
      throw "No id field found and one is required."

    const {rule, path: modelPath} = generateModel(options, parsedName)

    let standardRule = mergeWith(
      apply(url('./files'), [
        template({
          ...strings,
          ...options,
          modelRelativePath: modelPath,
          isNested: false,
          idType: id.type,
        }),
        move(parsedName.path),
      ]))

    if (rule)
      return chain([rule, standardRule])

    return standardRule
  }
}
