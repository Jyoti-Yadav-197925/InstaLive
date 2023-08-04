const Post = require('../model/post');
const User = require('../model/user');

module.exports.home = async (req, res) => {
  
    try {
    const posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
      path:'comments',
      populate:{
        path:'user'
      }
    })
    
        console.log(posts);
    
    let users = await User.find({});
    console.log(users);
    return res.render("home", {
      title: "Codeial | Home",
      posts: posts,
      all_users: users
     });
  } catch (e) {
    console.log("Error in post", e);
    res.status(500).send("Internal Server Error");
  }
};
