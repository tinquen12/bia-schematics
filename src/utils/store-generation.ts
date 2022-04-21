import {
  Rule,
  schematic
} from '@angular-devkit/schematics'
import {Location} from '../utils/parse-name'
import {buildRelativePath} from '../utils/find-module'
import {isAbsolute, join, parse} from 'path'

interface StorePath {
  rule: Rule | undefined;
  actionsPath: string;
  statePath: string;
  effectsPath: string;
}

interface StoreOptions {
  name: string;
  pluralName: string;
  path?: string;
  storePath?: string;
}

function generateStore(options: StoreOptions, location: Location): StorePath {
  const {path, ...otherOptions} = options
  
  const storePath = options.storePath as string
  const actionPath = isAbsolute(storePath) ? buildRelativePath(join(process.cwd(), location.path, location.name), storePath) : storePath
  if (options.storePath === ""){
    return ({
      rule: schematic('store', otherOptions),
      actionsPath: buildRelativePath(join(process.cwd(), location.path, location.name), join(process.cwd(), options.pluralName, "store", `${options.pluralName}-actions`)),
      statePath: buildRelativePath(join(process.cwd(), location.path, location.name), join(process.cwd(), options.pluralName, "store", `${options.name}.state`)),
      effectsPath: buildRelativePath(join(process.cwd(), location.path, location.name), join(process.cwd(), options.pluralName, "store", `${options.pluralName}-effects`)),
    })
  }

  const {dir} = parse(actionPath)

  return ({
    rule: undefined,
    actionsPath: join(dir, `${options.pluralName}-actions`),
    statePath: join(dir, `${options.name}.state`),
    effectsPath: join(dir, `${options.pluralName}-effects`),
  })
}

export {
  StorePath,
  generateStore
}