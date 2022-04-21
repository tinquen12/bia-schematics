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
import {parseName} from '../../utils/parse-name'
import {getProperties} from '../../utils/jsonSchema'
import {setupOptions, SetupOptions} from '../../utils/setup-options'
import {generateModel} from '../../utils/model-generation'
import {generateStore} from '../../utils/store-generation'

export default function (options: Schema): Rule {
  return async (host: Tree, context: SchematicContext) => {
    context.logger.info('Service options: ' + JSON.stringify(options))

    await setupOptions(options as SetupOptions, host);

    const parsedName = parseName(options.path as string, options.name)

    const id = (await getProperties(options.swaggerPath, options.pluralName)).filter(
      ({name}) => name === 'id',
    )[0]

    const {rule: createModelRule, path: modelPath} = generateModel(options, parsedName)
    const {rule: createActionRule, actionsPath: actionPath, statePath} = generateStore(options, parsedName)

    let standardRule = mergeWith(
      apply(url('./files'), [
        template({
          ...strings,
          ...options,
          modelRelativePath: modelPath,
          actionRelativePath: actionPath,
          stateRelativePath: statePath,
          idType: id.type,
        }),
        move(parsedName.path),
      ]))

    
    if (createModelRule)
      standardRule = chain([createModelRule, standardRule])

    if (createActionRule)
      standardRule = chain([createActionRule, standardRule])

    return standardRule
  }
}
