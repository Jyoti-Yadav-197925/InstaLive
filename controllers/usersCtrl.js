const User = require('../model/user');

// module.exports.home = (req,res)=>{
//     return res.render('home',{
//         title: "Home||Insta"
//     });
// }

module.exports.profile = async(req,res)=>{
    
    // console.log(req.user);
   
        try {
          const user = await User.findById(req.params.id);
          return res.render('profile', {
            title: "User Profile",
            profile_user: user
          });
        } catch (err) {
          console.log("Error in finding the user", err);
          return res.status(500).send('Internal Server Error');
        }
      

}

module.exports.update = async(req,res)=>{
    try{
        if(req.user.id == req.params.id){
            await User.findByIdAndUpdate(req.params.id,req.body);
            return res.redirect('/');
        }
    }catch(e){
        console.log("error in update",e);
    }
}

    
    
    
    // return res.render('profile',{
    //     title: "Profile||Insta"
    // });
// }

module.exports.signup = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    
    return res.render('signup',{
        title: "Home||Insta"
    });
}

module.exports.signin = (req,res)=>{
    
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    
    return res.render('signin',{
        title: "Home||Insta"
    });
}

//sign-in
module.exports.create= async(req,res)=>{
    // const data = await
    // console.log(req.body,"gilbert");
    // try{
    //     const data = await User.findOne({email:req.body.email});
    //     if(data){
    //         if(data.password != req.body.password ){
    //             console.log('Username/Password is incorrect');
    //             return res.redirect('back');
    //         }
    //        res.cookie('user_id',data.id);
    //        return res.redirect('/');
    //     }else{
    //         console.log('user does not exist');
    //         return res.redirect('/users/signup');
    //     }
    
    // } catch(e){
    //     console.log("error in sign-in create",e);
    // }
    req.flash('success','Logged in Successfulll');
    return res.redirect('/');

}
//sign-up
module.exports.create_session= async(req,res)=>{
    console.log(req.body,"********01");
    if(req.body.password != req.body.confirm_password){
        console.log('passwords does not match');
        return res.redirect('back');
    }
   
    
    try{
        const data = await User.findOne({email: req.body.email});
        
        if(!data){
            User.create(req.body);
            console.log('a new user has been logged');
            return res.redirect('/users/signin');
        }else{
            console.log('user already exists with this userId');
            return res.status(409).json({error:"User with this emailId alreday exist in database"});
            // return res.redirect('/users/signup');
        }
    }catch(e){
        console.log("Error",e.message);
        return res.status(500).json({
            error:"error in signup/Internal server"
        })
    }
}

module.exports.destroySession = (req, res) => {
    req.logout((err) => {
      if (err) {
        console.log('Error while logging out:', err);
    }
    req.flash('success','Logged-out Successfulll');
      return res.redirect('/');
    });
   
  };
  