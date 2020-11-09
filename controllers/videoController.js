import routes from '../routes';

export const home = (req, res) => res.render('home', { pageTitle : 'Home' });
// render의 첫 번째 인자는 뷰(템플릿), 두 번째 인자로 데이터 전달 가능
export const search = (req, res) => {
  // const searchingBy = req.query.term; -> 구조 분해 할당으로 작성해보자
  const { query : { term : searchingBy }} = req; // term : 이름 할당 가능
  res.render('search', { pageTitle : 'Search' , searchingBy : searchingBy });
};

export const videos = (req, res) => res.render('videos', { pageTitle : 'Videos' });
export const upload = (req, res) => res.render('upload', { pageTitle : 'Upload' });
export const videoDetail = (req, res) => res.render('videoDetail', { pageTitle : 'Video Detail' });
export const editVideo = (req, res) => res.render('editVideo', { pageTitle : 'Edit Video' });
export const deleteVideo = (req, res) => res.render('deleteVideo', { pageTitle : 'Delete Video' });