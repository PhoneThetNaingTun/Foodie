import { config } from "@/config";
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

const s3Client = new S3Client({
  endpoint: config.spaceEndPoint,
  region: "sgp1",
  credentials: {
    accessKeyId: config.spaceAccessKeyId,
    secretAccessKey: config.spaceScretAccessKey,
  },
});

export const assetUpload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "msquarefdc",
    acl: "public-read",
    key: (request, file, cb) => {
      cb(
        null,
        `foodie-pos/msquarefdc-batch3/phone-thet-naing-tun/${Date.now()}_${
          file.originalname
        }`
      );
    },
  }),
}).single("file");
