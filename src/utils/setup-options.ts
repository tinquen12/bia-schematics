import {
  Tree,
  SchematicsException
} from '@angular-devkit/schematics'
import { buildDefaultPath, getWorkspace } from '../schematics-angular-utils/workspace';
import {parseName} from '../schematics-angular-utils/parse-name'
// import {findModuleFromOptions} from '../schematics-angular-utils/find-module'

interface SetupOptions {
  module?: string;
  project?: string;
  path: string;
  name: string;
  pluralName: string;
}

async function setupOptions(options: SetupOptions, host: Tree) {
  const workspace = await getWorkspace(host);
  const project = workspace.projects.get(options.project as string)

  if (!project) {
    throw new SchematicsException(`Project "${options.project}" does not exist.`);
  }

  if (options.path === undefined) {
    options.path = `${buildDefaultPath(project)}/features/${options.pluralName}`;
  }

  //options.module = findModuleFromOptions(host, options);

  const parsedPath = parseName(options.path as string, options.name);
  options.name = parsedPath.name;
  options.path = parsedPath.path;
}

export {
  SetupOptions,
  setupOptions
}