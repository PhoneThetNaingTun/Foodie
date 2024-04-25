import { config } from "@/config";
import {
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import QRCode from "qrcode";

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

export const generateQrCode = (tableID: number) => {
  return `${config.orderAppUrl}?tableId=${tableID}`;
};

export const qrImageUpload = async (tableId: number) => {
  try {
    const imageQr = await QRCode.toDataURL(generateQrCode(tableId), {
      scale: 20,
    });
    const input = {
      Bucket: "msquarefdc",
      Key: `foodie-pos/msquarefdc-batch3/phone-thet-naing-tun/qrcode/tableId-${tableId}.png`,
      ACL: ObjectCannedACL.public_read,
      Body: Buffer.from(
        imageQr.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      ),
    };
    const command = new PutObjectCommand(input);
    await s3Client.send(command);
    return `https://msquarefdc.sgp1.cdn.digitaloceanspaces.com/foodie-pos/msquarefdc-batch3/phone-thet-naing-tun/qrcode/tableId-${tableId}.png`;
  } catch (err) {
    console.log(err);
  }
};
