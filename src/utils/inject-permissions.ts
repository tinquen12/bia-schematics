import {Tree, SchematicsException, Rule, DirEntry} from '@angular-devkit/schematics'
import { InsertChange } from '../schematics-angular-utils/change'
import { appendToPermissionsEnum } from '../schematics-angular-utils/ast-utils'
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


interface PermissionOptions {
  name: string;
  appPath?: string;
  path?: string;
  permissions: string[];
}

interface PermissionInjectionContext {
  permissionsFileName: string;
  standardPermissions: string[];
}

function createPermissionContext(options: PermissionOptions, host: Tree): PermissionInjectionContext {
  let permissionsFileName = findFileByName('permission.ts', `${options.appPath}/shared` || '/', host);

  return ({
    permissionsFileName,
    standardPermissions: options.permissions
  })
}

function injectPermissions(options: PermissionOptions) : Rule {
  return (host: Tree) => {

    const context = createPermissionContext(options, host);
    const path = context.permissionsFileName
    let text = host.read(path);
    if (!text) throw new SchematicsException(`File does not exist.`);
    let sourceText = text.toString('utf-8');

    if (isAlreadyInjected(sourceText, options.name))
      return host
    
    const declarationRecorder = host.beginUpdate(path);
    for (const permission of context.standardPermissions.map(e => `${strings.classify(options.name)}_${e}`)) {
      const enumAppend = appendToPermissionsEnum(ts.createSourceFile(path, sourceText, ts.ScriptTarget.Latest, true), path, `${permission} = '${permission}'`) as InsertChange
      declarationRecorder.insertLeft(enumAppend.pos, enumAppend.toAdd);
    }

    host.commitUpdate(declarationRecorder);

    return host;
  };
}

function isAlreadyInjected(text: string, entityName: string): boolean {
  return text.includes(`${strings.classify(entityName)}_`)
}

export {
  injectPermissions
}