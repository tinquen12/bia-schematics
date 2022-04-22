import {
  Rule,
  schematic
} from '@angular-devkit/schematics'
import {buildRelativePath} from '../utils/find-module'
import {join, parse} from 'path'
import { normalize } from '@angular-devkit/core'

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

function generateStore(options: StoreOptions, targetPath: string): StorePath {
  const {path, ...otherOptions} = options
  const featurePath = options.path as string
  const storePath = options.storePath as string
  if (storePath === ""){
    return ({
      rule: schematic('store', otherOptions),
      actionsPath: buildRelativePath(`${targetPath}/whatever.ts`, normalize(join(featurePath, "store", `${options.pluralName}-actions`))),
      statePath: buildRelativePath(`${targetPath}/whatever.ts`, normalize(join(featurePath, "store", `${options.name}.state`))),
      effectsPath: buildRelativePath(`${targetPath}/whatever.ts`, normalize(join(featurePath, "store", `${options.pluralName}-effects`))),
    })
  }

  const {dir} = parse(storePath)

  return ({
    rule: undefined,
    actionsPath: normalize(join(dir, `${options.pluralName}-actions`)),
    statePath: normalize(join(dir, `${options.name}.state`)),
    effectsPath: normalize(join(dir, `${options.pluralName}-effects`)),
  })
}

export {
  StorePath,
  generateStore
}