export type FileWithPreview = File & {
  preview: string
  portrait: boolean
}

export type ImageValue = FileWithPreview | null | string

export function createPhotoPreview(file: File) {
  return new Promise<FileWithPreview>((resolve, reject) => {
    if (file && file.name.match(/.(jpg|jpeg|png)$/i)) {
      const url = URL.createObjectURL(file)
      const img = new Image()

      img.onload = function () {
        resolve(
          Object.assign(file, {
            preview: url,
            portrait: img.width < img.height,
          })
        )
      }

      img.src = url
    } else {
      resolve(
        Object.assign(file, {
          preview: '',
          portrait: false,
        })
      )
    }
  })
}

export function getImagePreview(value: ImageValue) {
  if (typeof value === 'string') return value
  return value?.preview || ''
}
