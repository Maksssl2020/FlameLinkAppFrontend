export interface Image {
  id: number;
  imageData: string;
}

export interface ImageToPreviewProps {
  src: string;
  file: File;
}
