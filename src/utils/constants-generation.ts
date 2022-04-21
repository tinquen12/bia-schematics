import {
  Rule,
  schematic
} from '@angular-devkit/schematics'
import {Location} from '../utils/parse-name'
import {buildRelativePath} from '../utils/find-module'
import {isAbsolute, join, parse} from 'path'

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

function generateConstants(options: ConstantsOptions, location: Location): ConstantsPath {
  const {path, ...otherOptions} = options
  
  const constantsPath = options.constantsPath as string
  const relativePath = isAbsolute(constantsPath) ? buildRelativePath(join(process.cwd(), location.path, location.name), constantsPath) : constantsPath
  if (options.constantsPath === "")
    return ({
      rule: schematic('feature-constants', otherOptions),
      path: buildRelativePath(join(process.cwd(), location.path, location.name), join(process.cwd(), options.pluralName, `${options.name}.constants`))
    })

  const {dir} = parse(relativePath)

  return ({
    rule: undefined,
    path: join(dir, `${options.name}.constants`)
  })
}

export {
  ConstantsPath,
  generateConstants
}