import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

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

  if (!process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME === "your-cloud-name") {
    return saveLocally(file, resourceType);
  }

  try {
    return await new Promise((resolve, reject) => {
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
  } catch (err) {
    console.warn("Cloudinary upload failed, falling back to local storage:", err);
    return saveLocally(file, resourceType);
  }
}

async function saveLocally(file: Buffer, resourceType: string): Promise<UploadResult> {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  const ext = resourceType === "video" ? "mp4" : "png";
  const filename = `${timestamp}_${randomStr}.${ext}`;
  const filePath = path.join(uploadsDir, filename);

  await fs.promises.writeFile(filePath, file);

  const localUrl = `/uploads/${filename}`;
  return {
    publicId: `local_${timestamp}_${randomStr}`,
    url: localUrl,
    secureUrl: localUrl,
    width: 800,
    height: 600,
    format: ext,
    size: file.length,
    resourceType,
  };
}

export async function deleteFromCloudinary(publicId: string, resourceType = "image") {
  if (publicId.startsWith("local_")) {
    return { result: "ok" };
  }
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

export { cloudinary };
