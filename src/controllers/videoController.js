import routes from '../routes';
import Video from '../models/Video';
import Comment from '../models/Comment'

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({_id: -1 }); // 모든 비디오 Select
    res.render('home', { pageTitle : 'Video', videos });
  } catch (error) {
    console.log(error);
    res.render('home', { pageTitle : 'Video', videos : [] });
  }
};
// render의 첫 번째 인자는 뷰(템플릿), 두 번째 인자로 데이터 전달 가능
export const search = async (req, res) => {
  // const searchingBy = req.query.term; -> 구조 분해 할당으로 작성해보자
  const { query : { term : searchingBy }} = req; // term : 이름 할당 가능
  let videos = [];
  try {
    videos = await Video.find({
      // $regex : 정규표현식, searchingBy 단어를 포함한, $option: i : 대소문자 구분 X
      title : { $regex : searchingBy, $options: 'i' },
    });
  } catch (error) {
    console.log(error);
  }
  res.render('search', { pageTitle : 'Search' , searchingBy, videos }); // 현재 비디오 검색은 구현하지 않았음
};

export const getUpload = (req, res) => res.render('upload', { pageTitle : 'Upload' });
export const postUpload = async (req, res) => {
  // 비디오 업로드 및 저장 하기
  const {
    body : { title, description },
    file : { path }, // 업로드된 비디오의 경로
  } = req;

  try {
    const newVideo = await Video.create({ // row 생성(도큐먼트 생성), id 자동 할당된다는 것을 잊지말자
      fileUrl : path,
      title,
      description,
      creator : req.user.id
    });
    req.flash('success', '업로드 완료!');
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id)); // <- 해당 업로드된 비디오 디테일 페이지로
  } catch (error) {
    req.flash('error', '업로드 실패..');
    console.log(error);
  }
};

// 비디오 클릭시 상세 페이지(본문)
export const videoDetail = async (req, res) => {
  const { params : { id } } = req;
  try {
    const video = await Video.findById(id)
      .populate('creator')
      .populate('comments');
    res.render('videoDetail', { pageTitle : video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

// 비디오 게시글 수정
export const getEditVideo = async (req, res) => {
  const { params : { id } } = req;
  try {
    const video = await Video.findById(id).populate('creator');
    // console.log('videoCreator', video.creator, 'userId', req.user.id);
    if (video.creator.id !== req.user.id) { // /:id/edit으로 요청시 업로더와 현재 로그인된 유저와 일치하지 않으면 수정하지 못하게..
      throw Error('error');
    } else {
      res.render('editVideo', { pageTitle : `Edit ${video.title}`, video });
    }
  } catch (error) {
    console.log('errrrrrror: ', error);
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
    req.flash('success', '수정 완료!');
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    req.flash('error', '실패! 다시 시도해주세요.');
    res.redirect(routes.home);
  }
};

// 비디오 게시글 삭제
export const deleteVideo = async (req, res) => {
  const { params : { id } } = req;
  try {
    const video = await Video.findById(id).populate('creator');
    if (video.creator.id !== req.user.id) {
      throw Error();
    } else {
      await Video.findByIdAndDelete({ _id : id });
      req.flash('success', '삭제 완료!');
      res.redirect(routes.home);
    }
  } catch (error) {
    req.flash('error', '삭제를 실패했습니다. 다시 시도해주세요.');
    res.redirect(routes.home);
  }
};


// Register video view
export const postRegisterView = async(req, res) => {
  const { params : { id } } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    await video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// add comment
export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body : { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id).populate('comments');
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
      name: user.name,
    });
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};