import {
  Rule,
  schematic
} from '@angular-devkit/schematics'
import {buildRelativePath} from '../utils/find-module'
import {join, parse} from 'path'
import { normalize } from '@angular-devkit/core'

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

function generateViews(options: ViewsOptions, targetPath: string): ViewsPath {
  const {path, ...otherOptions} = options
  
  const viewsPath = options.viewsPath as string
  const featurePath = options.path as string

  if (viewsPath === ""){
    return ({
      rules: [schematic('views-index', otherOptions), schematic('views-edit', otherOptions), schematic('views-new', otherOptions), schematic('views-item', otherOptions) ],
      indexPath: buildRelativePath(`${targetPath}/whatever.ts`, normalize(join(featurePath, "views", `${options.pluralName}-index`, `${options.pluralName}-index.component`))),
      newPath: buildRelativePath(`${targetPath}/whatever.ts`, normalize(join(featurePath, "views", `${options.name}-new`, `${options.name}-new.component`))),
      editPath: buildRelativePath(`${targetPath}/whatever.ts`, normalize(join(featurePath, "views", `${options.name}-edit`, `${options.name}-edit.component`))),
      itemPath: buildRelativePath(`${targetPath}/whatever.ts`, normalize(join(featurePath, "views", `${options.name}-item`, `${options.name}-item.component`))),
    })
  }

  const {dir} = parse(viewsPath)

  return ({
    rules: undefined,
    indexPath: normalize(join(dir, `${options.name}-index`, `${options.name}-index.component`)),
    newPath: normalize(join(dir, `${options.name}-new`, `${options.name}-new.component`)),
    editPath: normalize(join(dir, `${options.name}-edit`, `${options.name}-edit.component`)),
    itemPath: normalize(join(dir, `${options.name}-item`, `${options.name}-item.component`)),
  })
}

export {
  ViewsPath,
  generateViews
}