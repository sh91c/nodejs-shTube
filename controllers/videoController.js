import routes from '../routes';
import Video from '../models/Video';

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}); // 모든 비디오 Select
    res.render('home', { pageTitle : 'Video', videos });
  } catch (error) {
    console.log(error);
    res.render('home', { pageTitle : 'Video', videos : [] });
  }
};
// render의 첫 번째 인자는 뷰(템플릿), 두 번째 인자로 데이터 전달 가능
export const search = (req, res) => {
  // const searchingBy = req.query.term; -> 구조 분해 할당으로 작성해보자
  const { query : { term : searchingBy }} = req; // term : 이름 할당 가능
  res.render('search', { pageTitle : 'Search' , searchingBy, videos }); // 현재 비디오 검색은 구현하지 않았음
};

export const getUpload = (req, res) => res.render('upload', { pageTitle : 'Upload' });
export const postUpload = async (req, res) => {
  // 비디오 업로드 및 저장 하기
  const {
    body : { title, description },
    file : { path } // 업로드된 비디오의 경로
  } = req;

  try {
    const newVideo = await Video.create({ // row 생성(도큐먼트 생성), id 자동 할당된다는 것을 잊지말자
      fileUrl : path,
      title,
      description,
    });
    console.log(newVideo);
    res.redirect(routes.videoDetail(newVideo.id)); // <- 해당 업로드된 비디오 디테일 페이지로
  } catch (error) {
    console.log(error);
    // res.render('')
  }
};

// 비디오 클릭시 상세 페이지(본문)
export const videoDetail = async (req, res) => {
  const { params : { id } } = req;
  try {
    const video = await Video.findById(id);
    res.render('videoDetail', { pageTitle : video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

// 비디오 게시글 수정
export const getEditVideo = async (req, res) => {
  const { params : { id } } = req;
  try {
    const video = await Video.findById(id);
    res.render('editVideo', { pageTitle : `Edit ${video.title}`, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const postEditVideo = async (req, res) => {
  const {
    params : { id },
    body : { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id : id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
}

// 비디오 게시글 삭제
export const deleteVideo = async (req, res) => {
  const { params : { id } } = req;
  try{
    await Video.findByIdAndDelete({ _id : id });
    // fs.unlink 구현 예정
    res.redirect(routes.home);
  } catch (error) {
    res.redirect(routes.home)
  }
}