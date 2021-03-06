import * as fs from 'fs-extra'
import * as path from 'path'

import { Images } from '../types'

export async function copyImageFilesAsync(
  images: Images,
  options: { outputDirectory: string }
): Promise<void> {
  for (const originalFilePath in images) {
    if ((await fs.pathExists(originalFilePath)) === false) {
      throw new Error(`Image not found: ${originalFilePath}`)
    }
    const newFilePath = path.join(
      options.outputDirectory,
      images[originalFilePath]
    )
    await fs.ensureDir(path.dirname(newFilePath))
    await fs.copyFile(originalFilePath, newFilePath)
  }
}
