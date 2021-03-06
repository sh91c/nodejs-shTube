import express from 'express';
import routes from '../routes';
import { deleteVideo, getEditVideo, postEditVideo, getUpload, home, postUpload, videoDetail } from '../controllers/videoController';
import { onlyPrivate, uploadVideo } from '../middlewares';

const videoRouter = express.Router();

videoRouter.get("/", home);

// 비디오 업로드
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload); // multer 미들웨어인 uploadVideo 추가

// /videos/:id
// 비디오 상세 글
videoRouter.get(routes.videoDetail(), videoDetail);
// 비디오 글 수정
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);
// 비디오 삭제
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;