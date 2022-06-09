'use strict'
import type { Options } from './index.types'

export * from './index.types'
export * from './createAutoImportTask'

/*
  Loosely based on the code used in Gulp Concat
  https://github.com/gulp-community/gulp-concat/blob/master/index.js
*/

// npm
const through = require('through2')
const fileExists = require('file-exists')
const c = require('chalk')

// helpers
const err = require('./core/helpers/err')
const log = require('./core/helpers/log')
const join = require('./core/helpers/join')
const get_relative_path = require('./core/content-generators/get_relative_path')
const read_file = require('./core/file_manipulation/read_file')
const generate_content = require('./core/content-generators/generate_content')
const create_file = require('./core/file_manipulation/create_file')
const order_content = require('./core/content-generators/order_content')

const presets = require('./core/content-generators/preset-settings')

const dest_error = require('./core/error-messages/dest')
const format_error = require('./core/error-messages/format')
const fileName_error = require('./core/error-messages/fileName')

interface File {
   isNull: () => boolean
   isStream: () => boolean
   stat?: {
      mtime: number
   }
}
type Done = () => void

const autoImports = function (opt: Options): any {
   if (opt.preset) {
      opt = Object.assign({}, presets[opt.preset], opt)
   }

   err(!opt.fileName, fileName_error)
   err(!opt.format, format_error)
   err(!opt.dest, dest_error)

   let lastFile: File
   let latestMod: number | undefined
   const generatedFilePath = join([opt.dest, opt.fileName])

   const relativePaths: Array<string> = []

   function bufferContents(file: File, _enc: any, done: Done) {
      // ignore empty files
      if (file.isNull()) {
         return done()
      }

      // gulp-auto-imports doesn't support streams
      err(file.isStream(), 'Streaming is not supported')

      // set latest file if not already set,
      // or if the current file was modified more recently.
      if (!latestMod || (file.stat && file.stat.mtime > latestMod)) {
         lastFile = file
         latestMod = file.stat && file.stat.mtime
      }

      relativePaths.push(get_relative_path(file, opt.dest))

      done()
   }

   function endStream(done: Done) {
      // no files passed in, no file goes out
      if (!lastFile) {
         return done()
      }

      const new_content = () =>
         generate_content({ pathsArray: relativePaths, opt })

      const generate_file = (content: string) => {
         const newFile = create_file(lastFile, opt, content)
         log(`Generated ${c.magenta(join([opt.dest, c.yellow(opt.fileName)]))}`)
         this.push(newFile)
         done()
      }

      fileExists(generatedFilePath, (error: any, exists: boolean) => {
         err(error, error)
         if (exists) {
            read_file(generatedFilePath).then((oldContent: string) => {
               const orderedContent = opt.retainOrder
                  ? order_content({ oldContent, newPaths: relativePaths, opt })
                  : new_content()

               if (orderedContent === oldContent) {
                  //Skip file generation
                  done()
               } else {
                  generate_file(orderedContent)
               }
            })
         } else {
            generate_file(new_content())
         }
      })
   }

   return through.obj(bufferContents, endStream)
}

export default autoImports
