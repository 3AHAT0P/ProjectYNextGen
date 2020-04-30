export default async (url: string): Promise<ImageBitmap> => {
  const request = await fetch(url);
  const data = await request.blob();
  return createImageBitmap(data);
};