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
import {parseName} from '../../utils/parse-name'
import {setupOptions, SetupOptions} from '../../utils/setup-options'

export default function (options: Schema): Rule {
  return async (host: Tree, context: SchematicContext) => {
    context.logger.info('SignalR service: ' + JSON.stringify(options))

    await setupOptions(options as SetupOptions, host);
    const parsedPath = parseName(options.path as string, options.name)
    
    return mergeWith(
      apply(url('./files'), [
        template({
          ...strings,
          ...options,
        }),
        move(parsedPath.path),
      ]),
    )
  }
}
