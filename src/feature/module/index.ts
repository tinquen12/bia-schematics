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
import {generateModel} from '../../utils/model-generation'
import {generateStore} from '../../utils/store-generation'
import {generateViews} from '../../utils/views-generation'
import {generateComponents} from '../../utils/components-generation'
import {generateServices} from '../../utils/services-generation'
import {generateConstants} from '../../utils/constants-generation'
import {parseName} from '../../utils/parse-name'
import {setupOptions, SetupOptions} from '../../utils/setup-options'

export default function (options: Schema): Rule {
  return async (host: Tree, context: SchematicContext) => {
    context.logger.info('View index options: ' + JSON.stringify(options))

    await setupOptions(options as SetupOptions, host);

    const parsedName = parseName(options.path as string, options.name)
    const {rule: createModelRule, path: modelPath} = generateModel(options, parsedName)
    const {rule: createActionRule, actionsPath: actionPath, statePath, effectsPath} = generateStore(options, parsedName)
    const {rules: createViewsRule, indexPath, editPath, itemPath, newPath } = generateViews(options, parsedName)
    const {rules: createComponentsRule, tablePath, formPath} = generateComponents(options, parsedName)
    const {rule: createConstantsRule, path: constantsPath} = generateConstants(options, parsedName)
    const {rules: createServiceRules, signalrServicePath, dasServicePath, optionsServicePath, globalServicePath} = generateServices(options, parsedName)

    let standardRule = mergeWith(
      apply(url('./files'), [
        template({
          ...strings,
          ...options,
          modelRelativePath: modelPath,
          actionRelativePath: actionPath,
          stateRelativePath: statePath,
          effectsRelativePath: effectsPath,
          signalrServiceRelativePath: signalrServicePath,
          dasServiceRelativePath: dasServicePath,
          optionsServiceRelativePath: optionsServicePath,
          globalServiceRelativePath: globalServicePath,
          indexViewRelativePath: indexPath,
          editViewRelativePath: editPath,
          itemViewRelativePath: itemPath,
          newViewRelativePath: newPath,
          tableRelativePath: tablePath,
          formRelativePath: formPath,
          constantsRelativePath: constantsPath,
        }),
        move(parsedName.path),
      ]))

    
    if (createModelRule)
      standardRule = chain([createModelRule, standardRule])

    if (createActionRule)
      standardRule = chain([createActionRule, standardRule])

    if (createServiceRules)
      standardRule = chain([...createServiceRules, standardRule])

    if (createViewsRule)
      standardRule = chain([...createViewsRule, standardRule])

    if (createComponentsRule)
      standardRule = chain([...createComponentsRule, standardRule])

    if (createConstantsRule)
      standardRule = chain([createConstantsRule, standardRule])

    return standardRule
  }
}
