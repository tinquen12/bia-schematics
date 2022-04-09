import {Rule, SchematicContext, Tree} from '@angular-devkit/schematics'
import {Schema} from './schema'
import {getProperties} from '../utils/jsonSchema'

export default function (options: Schema): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    context.logger.info('Table component options: ' + JSON.stringify(options))

    const properties = await getProperties('pets')
    console.log(properties)
    return tree
  }
}

export function updateWorkspace(
  updaterOrWorkspace:
    | workspaces.WorkspaceDefinition
    | ((
        workspace: workspaces.WorkspaceDefinition,
      ) => void | Rule | PromiseLike<void | Rule>),
): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    const host = createHost(tree)

    if (typeof updaterOrWorkspace === 'function') {
      const {workspace} = await workspaces.readWorkspace('/', host)

      const result = await updaterOrWorkspace(workspace)

      await workspaces.writeWorkspace(workspace, host)

      return result || noop
    } else {
      await workspaces.writeWorkspace(updaterOrWorkspace, host)

      return noop
    }
  }
}
