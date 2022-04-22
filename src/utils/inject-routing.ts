import {Tree, DirEntry, SchematicsException, Rule} from '@angular-devkit/schematics'
import { InsertChange } from '../schematics-angular-utils/change'
import { addRouteDeclarationToModule } from '../schematics-angular-utils/ast-utils'
import * as ts from 'typescript'
import { strings } from '@angular-devkit/core';
import { buildRelativePath } from './find-module';

interface AddRoutingContext {
  routingFileName: string;            // e. g. /src/app/app-routing.module.ts
  featureRelativeFileName: string;    // e. g. ./features/aircrafts/aircraft-type.module
  moduleName: string;                // e. g. AircraftTypeModule
}

interface RoutingOptions {
  name: string;
  pluralName: string;
  path: string;
}

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

function createAddRoutingContext(options: RoutingOptions, host: Tree): AddRoutingContext {
  let routingFileName = findFileByName('app-routing.module.ts', options.path || '/', host);

  return {
    routingFileName,
    featureRelativeFileName: buildRelativePath(routingFileName, `${options.path}/${options.name}.module`),
    moduleName: strings.classify(`${options.name}Module`)
  }
}

function injectRoute(options: RoutingOptions) : Rule {
  return (host: Tree) => {

    const context = createAddRoutingContext(options, host)
    const path = context.routingFileName;
    let text = host.read(path);
    if (!text) throw new SchematicsException(`File does not exist.`);
    let sourceText = text.toString('utf-8');

    if (isAlreadyInjected(sourceText, options.pluralName))
      return host
    
    const addDeclaration = addRouteDeclarationToModule(
      ts.createSourceFile(path, sourceText, ts.ScriptTarget.Latest, true),
      path,
      `{ path: '${options.pluralName}', data: { breadcrumb: 'app.${strings.camelize(options.pluralName)}', canNavigate: true}, loadChildren: () => import('${context.featureRelativeFileName}').then((m) => m.${context.moduleName}) }`,
    ) as InsertChange;
    
    const declarationRecorder = host.beginUpdate(path);
    declarationRecorder.insertLeft(addDeclaration.pos, addDeclaration.toAdd);

    host.commitUpdate(declarationRecorder);

    return host;
  };
}

function isAlreadyInjected(text: string, entityName: string) {
  return text.includes(`app.${strings.camelize(entityName)}`)
}

export {
  createAddRoutingContext,
  injectRoute
}