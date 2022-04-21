import {
  Rule,
  schematic
} from '@angular-devkit/schematics'
import {Location} from '../utils/parse-name'
import {buildRelativePath} from '../utils/find-module'
import {isAbsolute, join, parse} from 'path'

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

function generateComponents(options: ComponentsOptions, location: Location): ComponentsPath {
  const {path, ...otherOptions} = options
  
  const componentsPath = options.componentsPath as string
  const relativePath = isAbsolute(componentsPath) ? buildRelativePath(join(process.cwd(), location.path, location.name), componentsPath) : componentsPath
  if (options.componentsPath === "")
    return ({
      rules: [schematic('form-component', otherOptions), schematic('table-component', otherOptions)],
      formPath: buildRelativePath(join(process.cwd(), location.path, location.name), join(process.cwd(), options.pluralName, "components", `${options.name}-form`, `${options.name}-form.component`)),
      tablePath: buildRelativePath(join(process.cwd(), location.path, location.name), join(process.cwd(), options.pluralName, "components", `${options.name}-table`, `${options.name}-table.component`))
    })

  const {dir} = parse(relativePath)

  return ({
    rules: [],
    formPath: join(dir, `${options.name}-form`, `${options.name}-form.component`),
    tablePath: join(dir, `${options.name}-table`, `${options.name}-table.component`)
  })
}

export {
  ComponentsPath,
  generateComponents
}