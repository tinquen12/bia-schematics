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
import {setupOptions, SetupOptions} from '../../utils/setup-options'
import {generateModel} from '../../utils/model-generation'
import {generateStore} from '../../utils/store-generation'
import {generateServices} from '../../utils/services-generation'

export default function (options: Schema): Rule {
  return async (host: Tree, _: SchematicContext) => {
    // context.logger.debug('View index options: ' + JSON.stringify(options))

    await setupOptions(options as SetupOptions, host);

    const parsedName = parseName(options.path as string, options.name)
    const targetPath = `${parsedName.path}/views/${strings.dasherize(options.name)}-edit`

    const {rule: createModelRule, path: modelPath} = generateModel(options, targetPath)
    const {rule: createActionRule, actionsPath: actionPath, statePath} = generateStore(options, targetPath)
    const {rules: createServiceRules, signalrServicePath, dasServicePath, optionsServicePath, globalServicePath } = generateServices(options, targetPath)

    let standardRule = mergeWith(
      apply(url('./files'), [
        template({
          ...strings,
          ...options,
          modelRelativePath: modelPath,
          actionRelativePath: actionPath,
          stateRelativePath: statePath,
          signalrServiceRelativePath: signalrServicePath,
          dasServiceRelativePath: dasServicePath,
          optionsServiceRelativePath: optionsServicePath,
          globalServiceRelativePath: globalServicePath,
        }),
        move(targetPath),
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
