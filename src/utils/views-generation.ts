import {
  Rule,
  schematic
} from '@angular-devkit/schematics'
import {Location} from '../utils/parse-name'
import {buildRelativePath} from '../utils/find-module'
import {isAbsolute, join, parse} from 'path'

interface ViewsPath {
  rules: Rule[] | undefined;
  indexPath: string;
  newPath: string;
  editPath: string;
  itemPath: string;
}

interface ViewsOptions {
  name: string;
  pluralName: string;
  path?: string;
  viewsPath?: string;
}

function generateViews(options: ViewsOptions, location: Location): ViewsPath {
  const {path, ...otherOptions} = options
  
  const viewsPath = options.viewsPath as string
  const relativePath = isAbsolute(viewsPath) ? buildRelativePath(join(process.cwd(), location.path, location.name), viewsPath) : viewsPath
  if (options.viewsPath === ""){
    return ({
      rules: [schematic('views-index', otherOptions), schematic('views-edit', otherOptions), schematic('views-new', otherOptions), schematic('views-item', otherOptions) ],
      indexPath: buildRelativePath(join(process.cwd(), location.path, location.name), join(process.cwd(), options.pluralName, "views", `${options.pluralName}-index`, `${options.pluralName}-index.component`)),
      newPath: buildRelativePath(join(process.cwd(), location.path, location.name), join(process.cwd(), options.pluralName, "views", `${options.name}-new`, `${options.name}-new.component`)),
      editPath: buildRelativePath(join(process.cwd(), location.path, location.name), join(process.cwd(), options.pluralName, "views", `${options.name}-edit`, `${options.name}-edit.component`)),
      itemPath: buildRelativePath(join(process.cwd(), location.path, location.name), join(process.cwd(), options.pluralName, "views", `${options.name}-item`, `${options.name}-item.component`)),
    })
  }

  const {dir} = parse(relativePath)

  return ({
    rules: undefined,
    indexPath: join(dir, `${options.name}-index`, `${options.name}-index.component`),
    newPath: join(dir, `${options.name}-new`, `${options.name}-new.component`),
    editPath: join(dir, `${options.name}-edit`, `${options.name}-edit.component`),
    itemPath: join(dir, `${options.name}-item`, `${options.name}-item.component`),
  })
}

export {
  ViewsPath,
  generateViews
}