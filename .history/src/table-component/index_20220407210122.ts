import {Rule, SchematicContext, Tree} from '@angular-devkit/schematics'
import {Schema} from './schema'
import {getProperties} from '../utils/jsonSchema'
import {Observable} from 'rxjs'

export default function (options: Schema): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    context.logger.info('Table component options: ' + JSON.stringify(options))

    const properties = await getProperties('pets')
    console.log(properties)
    console.log(tree)
    return Observable.of(tree)
  }
}
