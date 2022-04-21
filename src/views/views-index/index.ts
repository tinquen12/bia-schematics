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
import {generateServices} from '../../utils/services-generation'

export default function (options: Schema): Rule {
  return async (host: Tree, context: SchematicContext) => {
    context.logger.info('View index options: ' + JSON.stringify(options))

    await setupOptions(options as SetupOptions, host);

    const properties = await getProperties(options.swaggerPath, options.pluralName)
    const id = (properties).filter(
      ({name}) => name === 'id',
    )[0]

    const parsedName = parseName(options.path as string, options.name)
    const {rule: createModelRule, path: modelPath} = generateModel(options, parsedName)
    const {rule: createActionRule, actionsPath: actionPath, statePath} = generateStore(options, parsedName)
    const {rules: createServiceRules, signalrServicePath, dasServicePath, optionsServicePath } = generateServices(options, parsedName)

    let standardRule = mergeWith(
      apply(url('./files'), [
        template({
          ...strings,
          ...options,
          properties,
          modelRelativePath: modelPath,
          actionRelativePath: actionPath,
          stateRelativePath: statePath,
          signalrServiceRelativePath: signalrServicePath,
          dasServiceRelativePath: dasServicePath,
          optionsServiceRelativePath: optionsServicePath,
          idType: id.type,
        }),
        move(parsedName.path),
      ]))

    
    if (createModelRule)
      standardRule = chain([createModelRule, standardRule])

    if (createActionRule)
      standardRule = chain([createActionRule, standardRule])

    if (createServiceRules)
      standardRule = chain([...createServiceRules, standardRule])

    return standardRule
  }
}
