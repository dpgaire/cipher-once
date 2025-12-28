import { useCallback } from 'react'
import heic2any from 'heic2any'
import { ConvertResult } from '../types'



export function useHeicToJpeg() {
  const convertIfNeeded = useCallback(
    async (file: File): Promise<ConvertResult> => {
      const isHeic =
        file.type === 'image/heic' ||
        file.type === 'image/heif' ||
        /\.(heic|heif)$/i.test(file.name)

      if (!isHeic) {
        return { file, converted: false }
      }

      const convertedBlob = (await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.85,
      })) as Blob

      const convertedFile = new File(
        [convertedBlob],
        file.name.replace(/\.(heic|heif)$/i, '.jpg'),
        {
          type: 'image/jpeg',
          lastModified: Date.now(),
        }
      )

      return {
        file: convertedFile,
        converted: true,
      }
    },
    []
  )

  return {
    convertIfNeeded,
  }
}
