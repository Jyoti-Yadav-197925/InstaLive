// const User = require('../model/user');
const Comment = require('../model/comments');
const Post = require('../model/post');

module.exports.create = async (req, res) => {
  try {
    const post = await Post.findById(req.body.post);
    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user.id
      });
      console.log("Comments has added...****");
      post.comments.push(comment);
      post.save();
      const populatedComment = await comment.populate('user', 'name email');
      console.log(req.body.comments);
      req.flash("success","One comment has been added to the post");
      return res.redirect('/');
    }
  } catch (e) {
    // console.log("error is present in cmtsCtrl", e);
    req.flash("error ",e);
  }
};

module.exports.destroy = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);
    console.log(comment.user);
    if (comment.user == req.user.id) {

        let postId = comment.post;

        await comment.deleteOne();

        let post = Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
        req.flash("success","One comment has been deleted");

        //CHANGE:: destroy the associated likes for this comment
        // await Like.deleteMany({likeable: comment._id, onModel: 'comment'});

        // if (req.xhr) {
        //     return res.status(200).json({
        //         data: {
        //             comment_id: req.params.id
        //         },
        //         message: "Post deleted"
        //     });
        // }


        // req.flash('success', 'Comment deleted!');

        return res.redirect('back');
    } else {
        return res.redirect('back');
    }
} catch (err) {
    // console.log('Error', err);
    req.flash("error",err);
    return;
}

}



