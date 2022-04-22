import {
  Rule,
  schematic
} from '@angular-devkit/schematics'
import {buildRelativePath} from '../utils/find-module'
import {join, parse} from 'path'
import { normalize } from '@angular-devkit/core'

interface ServicesPath {
  rules: Rule[] | undefined;
  signalrServicePath: string;
  dasServicePath: string;
  optionsServicePath: string;
  globalServicePath: string;
}

interface ServiceOptions {
  name: string;
  pluralName: string;
  servicePath?: string;
  path?: string;
}

function generateServices(options: ServiceOptions, targetPath: string): ServicesPath {
  const {path, ...otherOptions} = options
  
  const featurePath = options.path as string
  const servicePath = options.servicePath as string
  if (options.servicePath === "")
    return ({
      rules: [schematic('service-service', otherOptions), schematic('service-das', otherOptions), schematic('service-options', otherOptions), schematic('service-signalr', otherOptions)],
      signalrServicePath: buildRelativePath(`${targetPath}/whatever.ts`, normalize(join(featurePath, "services", `${options.pluralName}-signalr.service`))),
      dasServicePath: buildRelativePath(`${targetPath}/whatever.ts`, normalize(join(featurePath, "services", `${options.pluralName}-das.service`))),
      optionsServicePath: buildRelativePath(`${targetPath}/whatever.ts`, normalize(join(featurePath, "services", `${options.name}-options.service`))),
      globalServicePath: buildRelativePath(`${targetPath}/whatever.ts`, normalize(join(featurePath, "services", `${options.name}.service`))),
    })

  const {dir} = parse(servicePath)

  return ({
    rules: undefined,
    signalrServicePath: normalize(join(dir, `${options.name}-signalr.service`)),
    dasServicePath: normalize(join(dir, `${options.name}-das.service`)),
    optionsServicePath: normalize(join(dir, `${options.name}-options.service`)),
    globalServicePath: normalize(join(dir, `${options.name}.service`))
  })
}

export {
  ServicesPath,
  generateServices
}
