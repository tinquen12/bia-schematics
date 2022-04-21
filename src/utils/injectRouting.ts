// import {
//   Tree,
//   DirEntry
// } from '@angular-devkit/schematics'
// import * as ts from 'typescript'
// import {Project} from 'ts-morph'
// import {strings} from '@angular-devkit/core'
// import { InsertChange, Change } from '../schematics-angular-utils/change';

// function findFileByName(file: string, path: string, host: Tree): string {
//   let dir: DirEntry | null = host.getDir(path);
//   while(dir) {
//     let appComponentFileName = dir.path + '/' + file;
//     if (host.exists(appComponentFileName)) {
//       return appComponentFileName;
//     }
//     dir = dir.parent;
//   }
//   throw new Error(`File ${file} not found in ${path} or one of its anchestors`);
// }

// function injectStandardRouting(options: { name: string, pluralName: string }, routingFileName: string): Change {
//   const moduleRelativePath = `./features/${strings.dasherize(options.name)}/${strings.dasherize(options.name)}.module`
//     const project = new Project();
//     const sourceFile = project.createSourceFile("temp.ts", routingFileName)
//     if (!sourceFile)
//       throw `The ${sourceFile} cannot be found !`

//     const routesDeclaration = sourceFile.getVariableDeclarationOrThrow("routes")
//     const arrayLiteralExpression = routesDeclaration.getInitializerIfKindOrThrow(ts.SyntaxKind.ArrayLiteralExpression)
//     const route = arrayLiteralExpression
//     .getChildrenOfKind(ts.SyntaxKind.ObjectLiteralExpression).filter(e => 
//       e.getProperty("path")?.getFirstChildByKindOrThrow(ts.SyntaxKind.StringLiteral)
//       .getLiteralValue() ===  "")
//     const children = route[0].getProperty("children")?.getFirstChildByKindOrThrow(ts.SyntaxKind.ArrayLiteralExpression)

//     const innerRoute = children?.asKindOrThrow(ts.SyntaxKind.ArrayLiteralExpression)
//     .getChildrenOfKind(ts.SyntaxKind.ObjectLiteralExpression).filter(e => 
//       e.getProperty("path")?.getFirstChildByKindOrThrow(ts.SyntaxKind.StringLiteral)
//       .getLiteralValue() ===  "")

//     if (!innerRoute)
//       throw "InnerRoute not found"

//     const innerChildren = innerRoute[0].getProperty("children")?.getFirstChildByKindOrThrow(ts.SyntaxKind.ArrayLiteralExpression)
//     const lastChild = innerChildren?.getLastChildByKind(ts.SyntaxKind.ObjectLiteralExpression)
//     if (!lastChild)
//       throw 'No object is present on array'
//     const position = lastChild.getLastChildByKind(ts.SyntaxKind.ObjectLiteralExpression)?.getPos()
//     if (!position)
//       throw 'Not possible !'
//     // innerChildren?.addElement(writer => writer.block(() => {
//     //       writer.writeLine(`path: '${strings.dasherize(options.pluralName)}',`)
//     //       writer.write("data: ")
//     //       writer.block(() => {
//     //         writer.writeLine(`breadcrumb: 'app.${strings.camelize(options.pluralName)}',`)
//     //         writer.writeLine("canNavigate: true")
//     //       })
//     //       writer.write(",")
//     //       writer.writeLine(`loadChildren: () => import('${moduleRelativePath}}').then((m) => m.${strings.classify(options.name)}Module)`)
//     //   }))


//     // TODO: remove the logic from that file
//     // TODO: Create a rule that update the file with the new content
//   //   const toAdd = `,{
//   //     path: 'drivers',
//   //     data: {
//   //         breadcrumb: 'app.drivers',
//   //         canNavigate: true
//   //     },
//   //     loadChildren: () => import('./features/driver/driver.module}').then((m) => m.DriverModule)
//   // }`
//   //   return new InsertChange(routingFileName, position, toAdd)
// }

// export {
//   findFileByName,
//   injectStandardRouting
// }