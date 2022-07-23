const multer = require("multer")
const path = require("path")
const crypto = require("crypto")
const aws = require("aws-sdk")
const multerS3 = require("multer-s3")

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', 'uploads', 'images'))
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(8, (err, hash) => {
        if (err) cb(err);

        file.key = `${hash.toString("hex")}-dzf-${file.originalname}`;

        cb(null, file.key)
      })
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'upload-for-my-use',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(8, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString("hex")}-dzf-${file.originalname}`;

        cb(null, fileName)
      })
    }
  })
}

module.exports = {
  dest: path.resolve(__dirname, '..', 'uploads', 'images'),
  storage: storageTypes[process.env.SAVE_ON_UPLOADS],
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {

    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error("Formato não permitido"))
    }
  },
}