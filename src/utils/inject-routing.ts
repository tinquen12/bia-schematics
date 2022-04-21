import {Tree, DirEntry, SchematicsException} from '@angular-devkit/schematics'

interface AddRoutingContext {
  routingFileName: string;            // e. g. /src/app/app-routing.module.ts
  featureRelativeFileName: string;    // e. g. ./features/aircrafts/aircraft-type.module
  moduleName: string;                // e. g. AircraftTypeModule
}

interface RoutingOptions {
  name: string;
  pluralName: string;
  path?: string;
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
    featureRelativeFileName: "",
    moduleName: ""
  }
}

export {
  createAddRoutingContext
}