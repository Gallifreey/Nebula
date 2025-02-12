import type { ImageClassificationLabel, ObjectDetectionLabel } from './structure'

export interface BufferType {
  annotationBuffer: ImageClassificationLabel[] | ObjectDetectionLabel[]
}
