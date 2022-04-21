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
import {parseName} from '../utils/parse-name'
import {compile, JSONSchema} from 'json-schema-to-typescript'
import {getSchema} from '../utils/jsonSchema';
import {setupOptions, SetupOptions} from '../utils/setup-options'


export default function (options: Schema): Rule {
  return async (host: Tree, context: SchematicContext) => {
    context.logger.info('Model options: ' + JSON.stringify(options))

    await setupOptions(options as SetupOptions, host);
    
    const parsedPath = parseName(options.path as string, options.name)
    const schema = getSchema(options.swaggerPath, options.pluralName)
    const tsModel = await compile(schema as JSONSchema, strings.classify(options.name), { bannerComment: "" });

    return mergeWith(
      apply(url('./files'), [
        template({
          ...strings,
          ...options,
          modelContent: tsModel
        }),
        move(parsedPath.path),
      ]),
    )
  }
}
