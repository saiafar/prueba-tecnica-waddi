const authRole = (roles) => async (req, res ,next) => {
    const user = req.userAuth;
    if(!roles.includes(user.role)){
        res.status(403).json({message: "Access denied"})
    }else{
        next();
    }
}

export default authRole;