import multer from "multer";
import { __dirnameApp } from "../pathUtil.js";

const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, `${__dirnameApp}/public/images`);
  //   },
  destination: `${__dirnameApp}/public/images`,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });
