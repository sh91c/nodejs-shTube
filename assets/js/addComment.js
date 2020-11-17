import axios from 'axios';

const addCommentForm = document.getElementById('jsAddComment');
const commentList = document.getElementById('jsCommentList');

const commentNumber = document.getElementById('jsCommentNumber');
const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = (comment, author) => {
  const li = document.createElement('li');
  const text = document.createElement('span');
  const auth = document.createElement('h1');
  auth.innerHTML = '<span style="font-weight: 600; margin-bottom:15px;">' + author + '</span> <br><br>' + comment;
  // text.innerHTML = comment;
  li.appendChild(auth);
  // li.appendChild(text);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async (comment, author) => {
  const videoId = window.location.href.split('/videos/')[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: 'POST',
    data: {
      comment,
    }
  });
  if (response.status === 200) {
  addComment(comment, author);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInputText = addCommentForm.querySelector('.input-text');
  const commentInputAuthor = addCommentForm.querySelector('.input-author');
  const comment = commentInputText.value;
  const author = commentInputAuthor.value;
  sendComment(comment, author);
  commentInputText.value = '';
};

function init(){
  addCommentForm.addEventListener('submit', handleSubmit);
}

if (addCommentForm) {
  init();
}