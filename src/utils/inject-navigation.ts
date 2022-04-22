import {Tree, SchematicsException, Rule, DirEntry} from '@angular-devkit/schematics'
import { InsertChange } from '../schematics-angular-utils/change'
import { addNavigation } from '../schematics-angular-utils/ast-utils'
import * as ts from 'typescript'
import { strings } from '@angular-devkit/core';

function findFileByName(file: string, path: string, host: Tree): string {
  let dir: DirEntry | null = host.getDir(path);

  while(dir) {
      let appComponentFileName = dir.path + '/' + file;
      if (host.exists(appComponentFileName)) {
          return appComponentFileName;
      }
      dir = dir.parent;
  }
  throw new SchematicsException(`File ${file} not found in ${path} or one of its anchestors`);
}


interface NavigationOptions {
  name: string;
  pluralName: string;
  appPath?: string;
  path?: string;
}

interface NavigationInjectionContext {
  navigationFileName: string;
}

function createNavigationContext(options: NavigationOptions, host: Tree): NavigationInjectionContext {
  let navigationFileName = findFileByName('navigation.ts', `${options.appPath}/shared` || '/', host);

  return ({
    navigationFileName,
  })
}

function injectNavigation(options: NavigationOptions) : Rule {
  return (host: Tree) => {
    const context = createNavigationContext(options, host);
    const path = context.navigationFileName
    let text = host.read(path);
    if (!text) throw new SchematicsException(`File does not exist.`);
    let sourceText = text.toString('utf-8');

    if (isAlreadyInjected(sourceText, options.pluralName))
      return host

    const addDeclaration = addNavigation(
      ts.createSourceFile(path, sourceText, ts.ScriptTarget.Latest, true),
      path,
      `{ labelKey: 'app.${strings.camelize(options.pluralName)}', permissions: [Permission.${strings.classify(options.name)}_List_Access], path: ['/${strings.dasherize(options.pluralName)}'] }`,
    ) as InsertChange;
  
    const declarationRecorder = host.beginUpdate(path);
    declarationRecorder.insertLeft(addDeclaration.pos, addDeclaration.toAdd);

    host.commitUpdate(declarationRecorder);

    return host;
  };
}

function isAlreadyInjected(text: string, entityName: string): boolean {
  return text.includes(`labelKey: 'app.${strings.camelize(entityName)}'`)
}

export {
  injectNavigation
}