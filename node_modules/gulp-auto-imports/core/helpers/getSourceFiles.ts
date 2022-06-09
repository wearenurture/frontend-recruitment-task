const ext = (fileExtension?: string) =>
   fileExtension ? `.${fileExtension}` : ''

export interface GetSourceFilesProps {
   sourceFolder: string | Array<string>
   fileExtension?: string
   ignoreCharacter?: string
   ignoreImporterFile?: boolean
   importerFile?: string
}

export default function getSourceFiles({
   sourceFolder,
   fileExtension,
   ignoreCharacter = '#',
   ignoreImporterFile = true,
   importerFile = `auto-imports.${fileExtension}`,
}: GetSourceFilesProps): Array<string> {
   const getSrc = (src: string) => `${src}/**/*${ext(fileExtension)}`
   const source = Array.isArray(sourceFolder)
      ? sourceFolder.map(getSrc)
      : [getSrc(sourceFolder)]
   const sourceDirs = Array.isArray(sourceFolder)
      ? sourceFolder
      : [sourceFolder]

   let ignoredPaths: Array<string> = []

   if (ignoreCharacter && Array.isArray(sourceDirs)) {
      ignoredPaths = sourceDirs.map(src => {
         // Ignore files and folders that start with the ignore character
         if (ignoreImporterFile) {
            // Also ignores the file that ends up getting outputted by the plugin
            return `!${src}/{**/${ignoreCharacter}*,**/${ignoreCharacter}*/**,**/${importerFile}}`
         } else {
            return `!${src}/{**/${ignoreCharacter}*,**/${ignoreCharacter}*/**}`
         }
      })
   }
   return [...source, ...ignoredPaths]
}
