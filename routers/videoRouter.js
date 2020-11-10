import express from 'express';
import { deleteVideo, editVideo, getUpload, home, postUpload, upload, videoDetail } from '../controllers/videoController';
import routes from '../routes';

const videoRouter = express.Router();

videoRouter.get("/", home);

videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, postUpload);

// /videos/:id
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);
videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;