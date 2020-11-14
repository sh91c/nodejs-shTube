import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: 'File URL is required.',
  },
  title: {
    type: String,
    required: 'Title is required.'
  },
  description: String,
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // 비디오에 댓글 모델과 관계를 형성시키도록 작성 방법 2
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

const model = mongoose.model("Video", VideoSchema);

export default model;