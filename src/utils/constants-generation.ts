import {
  Rule,
  schematic
} from '@angular-devkit/schematics'
import {buildRelativePath} from '../utils/find-module'
import {join, parse} from 'path'
import { normalize } from '@angular-devkit/core'

interface ConstantsPath {
  rule: Rule | undefined,
  path: string;
}

interface ConstantsOptions {
  name: string;
  pluralName: string;
  path?: string;
  constantsPath?: string;
}

function generateConstants(options: ConstantsOptions, targetPath: string): ConstantsPath {
  const {path, ...otherOptions} = options
  
  const constantsPath = options.constantsPath as string
  const featurePath = options.path as string

  if (constantsPath === "")
    return ({
      rule: schematic('feature-constants', otherOptions),
      path: buildRelativePath(`${targetPath}/whatever.ts`, normalize(join(featurePath, `${options.name}.constants`)))
    })

  const {dir} = parse(constantsPath)

  return ({
    rule: undefined,
    path: normalize(join(dir, `${options.name}.constants`))
  })
}

export {
  ConstantsPath,
  generateConstants
}