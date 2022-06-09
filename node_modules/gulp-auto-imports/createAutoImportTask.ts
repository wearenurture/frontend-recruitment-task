import * as gulp from 'gulp'
import getSourceFiles from './core/helpers/getSourceFiles'
import {
   CreateAutoImportTaskProps,
   GetTaskNamesProps,
   GetTaskNamesReturn,
   CreateAutoImportTaskReturn,
} from './createAutoImportTask.types'
import autoImports from './index'

export * from './createAutoImportTask.types'

/** last portion of sourceFolder after the last "/" */
const getName = (sourceFolder: string): string => {
   const regexMatch = /.*\/(.+)$/.exec(sourceFolder) || []
   return regexMatch[1] || ''
}

const getTaskNames = ({
   fileExtension = 'all-files',
   name,
   taskPrefix,
}: GetTaskNamesProps): GetTaskNamesReturn => {
   const prefix = (taskPrefix ? `${taskPrefix}:` : '') + fileExtension
   return {
      taskName: `${prefix}:auto-imports:${name}`,
      watchName: `${prefix}:auto-imports-watcher:${name}`,
   }
}

/**
 * Generate an auto-import gulp compiler tasks alongside a matching watcher task.
 *
 * @returns [ 'compiler task name', 'watcher task name' ]
 */
export const createAutoImportTask = ({
   sourceFolder,
   fileExtension,
   taskPrefix,
   ignoreCharacter,
   ignoreImporterFile,
   importerSettings = {},
}: CreateAutoImportTaskProps): CreateAutoImportTaskReturn => {
   const defaultSettings = importerSettings.preset
      ? require(`./presets/${importerSettings.preset}`)
      : {}

   const fullImporterSettings = {
      dest: sourceFolder,
      ...defaultSettings,
      ...importerSettings,
   }

   const name = getName(sourceFolder)
   const { taskName, watchName } = getTaskNames({
      fileExtension,
      name,
      taskPrefix,
   })

   gulp.task(taskName, () =>
      gulp
         .src(
            getSourceFiles({
               sourceFolder,
               fileExtension,
               ignoreCharacter,
               ignoreImporterFile,
               importerFile: fullImporterSettings.fileName,
            })
         )
         .pipe(autoImports(fullImporterSettings))
         .pipe(gulp.dest(fullImporterSettings.dest))
   )

   gulp.task(watchName, done => {
      const watcher = gulp.watch(
         getSourceFiles({
            sourceFolder,
            fileExtension,
            ignoreCharacter,
            ignoreImporterFile,
            importerFile: fullImporterSettings.fileName,
         })
      )
      watcher.on('add', gulp.series(taskName))
      watcher.on('unlink', gulp.series(taskName))
      done()
   })

   return [taskName, watchName]
}
