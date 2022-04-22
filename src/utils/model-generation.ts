import {
  Rule,
  schematic
} from '@angular-devkit/schematics'
import {join} from 'path'
import { normalize } from '@angular-devkit/core'
import { buildRelativePath } from './find-module'

interface ModelPath {
  rule: Rule | undefined;
  path: string;
}

interface ModelOptions {
  name: string;
  pluralName: string;
  modelPath?: string;
  path?: string
}

function generateModel(options: ModelOptions, targetPath: string): ModelPath {
  const {path, ...otherOptions} = options
  const modelPath = options.modelPath as string
  const featurePath = options.path as string

  if (modelPath === "")
    return ({
      rule: schematic('model', otherOptions),
      path: buildRelativePath(`${targetPath}/whatever.ts`, normalize(join(featurePath, "model", `${options.name}`)))
    })

  return ({
    rule: undefined,
    path: modelPath
  })
}

export {
  ModelPath,
  generateModel
}