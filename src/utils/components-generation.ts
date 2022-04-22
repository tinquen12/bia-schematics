import {
  Rule,
  schematic
} from '@angular-devkit/schematics'
import {buildRelativePath} from '../utils/find-module'
import {join, parse} from 'path'
import { normalize } from '@angular-devkit/core'

interface ComponentsPath {
  rules: Rule[] | undefined;
  formPath: string;
  tablePath: string;
}

interface ComponentsOptions {
  name: string;
  pluralName: string;
  path?: string;
  componentsPath?: string;
}

function generateComponents(options: ComponentsOptions, targetPath: string): ComponentsPath {
  const {path, ...otherOptions} = options
  
  const componentsPath = options.componentsPath as string
  const featurePath = options.path as string

  if (componentsPath === "")
    return ({
      rules: [schematic('form-component', otherOptions), schematic('table-component', otherOptions)],
      formPath: buildRelativePath(`${targetPath}/whatever.ts`, normalize(join(featurePath, "components", `${options.name}-form`, `${options.name}-form.component`))),
      tablePath: buildRelativePath(`${targetPath}/whatever.ts`, normalize(join(featurePath, "components", `${options.name}-table`, `${options.name}-table.component`))),
    })

  const {dir} = parse(componentsPath)

  return ({
    rules: [],
    formPath: normalize(join(dir, `${options.name}-form`, `${options.name}-form.component`)),
    tablePath: normalize(join(dir, `${options.name}-table`, `${options.name}-table.component`))
  })
}

export {
  ComponentsPath,
  generateComponents
}