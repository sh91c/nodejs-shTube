import routes from '../routes';
import { videos } from '../db';

export const home = (req, res) => {
  res.render('home', { pageTitle : 'Video', videos });
};
// render의 첫 번째 인자는 뷰(템플릿), 두 번째 인자로 데이터 전달 가능
export const search = (req, res) => {
  // const searchingBy = req.query.term; -> 구조 분해 할당으로 작성해보자
  const { query : { term : searchingBy }} = req; // term : 이름 할당 가능
  res.render('search', { pageTitle : 'Search' , searchingBy, videos }); // 현재 비디오 검색은 구현하지 않았음
};

// export const videos = (req, res) => res.render('videos', { pageTitle : 'Videos' });

export const getUpload = (req, res) => res.render('upload', { pageTitle : 'Upload' });
export const postUpload = (req, res) => {
  const { body : { file, title, description }} = req;
  // 비디오 업로드 및 저장 하기
  res.redirect(routes.videoDetail(324933));
};


export const editVideo = (req, res) => res.render('editVideo', { pageTitle : 'Edit Video' });
export const deleteVideo = (req, res) => res.render('deleteVideo', { pageTitle : 'Delete Video' });
export const videoDetail = (req, res) => res.render('videoDetail', { pageTitle : 'Video Detail' });