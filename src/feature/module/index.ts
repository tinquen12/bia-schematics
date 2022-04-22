import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  template,
  url,
  mergeWith,
  move,
  chain,
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
import { injectRoute } from '../../utils/inject-routing'
import { injectPermissions } from '../../utils/inject-permissions'
import { injectNavigation } from '../../utils/inject-navigation'

export default function (options: Schema): Rule {
  return async (host: Tree, _: SchematicContext) => {
    // context.logger.debug('View index options: ' + JSON.stringify(options))
    await setupOptions(options as SetupOptions, host);

    const parsedName = parseName(options.path as string, options.name)
    const {rule: createModelRule, path: modelPath} = generateModel(options, parsedName.path)
    const {rule: createActionRule, actionsPath: actionPath, statePath, effectsPath} = generateStore(options, parsedName.path)
    const {rules: createViewsRule, indexPath, editPath, itemPath, newPath } = generateViews(options, parsedName.path)
    const {rules: createComponentsRule, tablePath, formPath} = generateComponents(options, parsedName.path)
    const {rule: createConstantsRule, path: constantsPath} = generateConstants(options, parsedName.path)
    const {rules: createServiceRules, signalrServicePath, dasServicePath, optionsServicePath, globalServicePath} = generateServices(options, parsedName.path)

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

    if (options.injectRouting)
      standardRule = chain([injectRoute(options), standardRule])

    // Only inject Navigation with permissions because permission must be present
    if (options.injectPermissions)
    {
      standardRule = chain([injectPermissions(options), standardRule])
      standardRule = chain([injectNavigation(options), standardRule])
    }


    return standardRule
  }
}
