import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
  publicId: string;
  url: string;
  secureUrl: string;
  width?: number;
  height?: number;
  format: string;
  size: number;
  resourceType: string;
}

export async function uploadToCloudinary(
  file: Buffer,
  options: { folder?: string; resourceType?: "image" | "raw" | "video" } = {}
): Promise<UploadResult> {
  const { folder = "school-cms", resourceType = "image" } = options;

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder, resource_type: resourceType },
        (error, result) => {
          if (error || !result) return reject(error ?? new Error("Upload failed"));
          resolve({
            publicId: result.public_id,
            url: result.url,
            secureUrl: result.secure_url,
            width: result.width,
            height: result.height,
            format: result.format,
            size: result.bytes,
            resourceType: result.resource_type,
          });
        }
      )
      .end(file);
  });
}

export async function deleteFromCloudinary(publicId: string, resourceType = "image") {
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

export { cloudinary };
