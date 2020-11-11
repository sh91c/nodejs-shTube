import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: 'Text is required.',
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // 댓글을 각 비디오 모델과 관계를 형성시키도록 작성 방법 1
  // video: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Video'
  // }
});

const model = mongoose.model('Comment', CommentSchema);
export default model;