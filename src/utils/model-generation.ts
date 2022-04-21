import {
  Rule,
  schematic
} from '@angular-devkit/schematics'
import {Location} from '../utils/parse-name'
import {buildRelativePath} from '../utils/find-module'
import {isAbsolute, join} from 'path'

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

function generateModel(options: ModelOptions, location: Location): ModelPath {
  const {path, ...otherOptions} = options

  const modelPath = options.modelPath as string
  const relativePath = isAbsolute(modelPath) ? buildRelativePath(join(process.cwd(), location.path, location.name), modelPath) : modelPath
  if (options.modelPath === "")
    return ({
      rule: schematic('model', otherOptions),
      path: buildRelativePath(join(process.cwd(), location.path, location.name), join(process.cwd(), options.pluralName, "model", `${options.name}`))
    })

  return ({
    rule: undefined,
    path: relativePath
  })
}

export {
  ModelPath,
  generateModel
}