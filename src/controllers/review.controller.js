import { Review } from "../models/Review.js";
import { Post } from "../models/Post.js";

export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.json(reviews);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createReview = async (req, res) => {
    try {
        let { value, guestName } = req.body;
        const { id } = req.params;
        if(req.userAuth)
            guestName = req.userAuth.username;
            
        if(!value || !guestName)
            return res.status(400).json( {message: "all input is required"} )    
            
        const post = await Post.findByPk(id);
        
        if(!post)
            return res.status(404).json( {message: "post not found"} )

        const newReview = await Review.create({
            value,
            guestName,
            userId: !req.userAuth? null : req.userAuth.id,
            postId: id
        })
        res.json(newReview);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: error.message})
    }   
}