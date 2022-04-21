import {
  Rule,
  schematic
} from '@angular-devkit/schematics'
import {Location} from '../utils/parse-name'
import {buildRelativePath} from '../utils/find-module'
import {isAbsolute, join, parse} from 'path'

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
  storePath?: string;
  path?: string;
}

function generateServices(options: ServiceOptions, location: Location): ServicesPath {
  const {path, ...otherOptions} = options
  
  const storePath = options.storePath as string
  const actionPath = isAbsolute(storePath) ? buildRelativePath(join(process.cwd(), location.path, location.name), storePath) : storePath
  if (options.storePath === "")
    return ({
      rules: [schematic('service-service', otherOptions), schematic('service-das', otherOptions), schematic('service-options', otherOptions), schematic('service-signalr', otherOptions)],
      signalrServicePath: buildRelativePath(join(process.cwd(), location.path, location.name), join(process.cwd(), options.pluralName, "services", `${options.name}-signalr.service`)),
      dasServicePath: buildRelativePath(join(process.cwd(), location.path, location.name), join(process.cwd(), options.pluralName, "services", `${options.name}-das.service`)),
      optionsServicePath: buildRelativePath(join(process.cwd(), location.path, location.name), join(process.cwd(), options.pluralName, "services", `${options.name}-options.service`)),
      globalServicePath: buildRelativePath(join(process.cwd(), location.path, location.name), join(process.cwd(), options.pluralName, "services", `${options.name}.service`)),
    })

  const {dir} = parse(actionPath)

  return ({
    rules: undefined,
    signalrServicePath: join(dir, `${options.name}-signalr.service`),
    dasServicePath: join(dir, `${options.name}-das.service`),
    optionsServicePath: join(dir, `${options.name}-options.service`),
    globalServicePath: join(dir, `${options.name}.service`)
  })
}

export {
  ServicesPath,
  generateServices
}
