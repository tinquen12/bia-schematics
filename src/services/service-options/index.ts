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

export default function (options: Schema): Rule {
  return async (host: Tree, _: SchematicContext) => {
    // context.logger.debug('Service options options: ' + JSON.stringify(options))

    await setupOptions(options as SetupOptions, host);
    const parsedPath = parseName(options.path as string, options.name)
    const targetPath = `${parsedPath.path}/services`

    const {rule, path: modelPath} = generateModel(options, targetPath)

    
    let standardRule =  mergeWith(
      apply(url('./files'), [
        template({
          ...strings,
          ...options,
          modelRelativePath: modelPath,
        }),
        move(targetPath),
      ]),
    )

    if (rule)
      standardRule = chain([standardRule, rule])

    return standardRule
  }
}
