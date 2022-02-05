
import Article from '../models/Article';
import User from '../models/User';

//Get all Articles
export const getAllArticles = async function (req, res) {
    try{
        const article = await Article.find();
        res.json(article)
    }catch(err){
        res.json({message:err})
        console.log(err)
    }
}

//Add article
export const addOneArticle = async (req,res)=>{
    const article = new Article( {
        title: req.body.title,
        body: req.body.body,
        message: req.body.message
    });

    try{
        const savedAricle = await article.save();
        res.json(savedAricle);
    } catch(err) {
        res.json({message: err})
    }
}

//Get a specific article
export const getOneArticle =  async (req,res)=>{
    try{
        const article = await Article.findById(req.params.articleId);
        res.json(article)
    }catch(err){
        res.json({message:err})
    } 
}


//delete a specific contact
export const deleteOneArticle = async (req,res)=>{
    try{
        const removedArticle = await Article.deleteOne({_id:req.params.articleId})
        res.json(removedArticle)
    }catch(err){
        res.json({message:error})
    } 
}

//update a specific article
export const updateOneArticle = async (req,res)=>{
    try{
        const updatedArticle = await Article.updateOne(
            {_id:req.params.contactId}, 
            { $set:{body: req.body.body} }
            )
        res.json(updatedArticle)
    }catch(err){
        res.json({message:error})
    } 
}