// const User = require('../model/user');
const Post = require('../model/post');
const Comment = require('../model/comments');

module.exports.create = async(req,res)=>{
    try{
        const post = await Post.create({
            content: req.body.content,
            user: req.user.id,
        });
        req.flash("success","One post has been published");
        return res.redirect('/');
    }catch(e){
        console.log("error in post controller", e);
        return;
    }
}

// module.exports.destroy = async(req,res)=>{
//     try{
//         const post = await Post.findById(req.params.id);
//         console.log('Post:', post);
//         if(post.user == req.user.id){
//             post.remove();
//             await Comment.deleteMany({post:req.params.id});
//             return res.redirect('/');
//         }
    
//     }catch(e){
//         console.log("error in the postCtrl",e);
//         // return res.redirect('/')
//     }
// }

module.exports.destroy = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      console.log('Post:', post);
      console.log('req.params.id:', req.params.id);
  
      if (post && post.user == req.user.id) {
        await post.deleteOne(); // Use deleteOne() instead of remove()
        await Comment.deleteMany({ post: req.params.id });
        req.flash("success","One Post with the comments has been deleted");
        return res.redirect('/');

      } else {
        console.log('Post not found or user not authorized.');
        return res.redirect('/');
      }
    } catch (e) {
      console.log('Error in the postCtrl', e);
      return res.status(500).send('Internal Server Error');
    }
  };
  