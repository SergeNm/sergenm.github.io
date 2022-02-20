
import Article from '../models/article.model';
// import User from '../models/User';

class ArticlesController {

    //Get all Articles
    async getAllArticles(req, res) {
        try {
            const article = await Article.find();
            res.json(article)
        } catch (err) {
            res.json({ message: err })
            console.log(err)
        }
    }

    //Add article
    async addOneArticle(req, res) {
        const article = new Article({
            title: req.body.title,
            body: req.body.body,
            // images: req.body.images
            image: req.body.image
        });

        try {
            const savedAricle = await article.save();
            res.json(savedAricle);
        } catch (err) {
            res.json({ message: err })
        }
    }

    //Get a specific article
    async getOneArticle(req, res) {
        try {
            const article = await Article.findById(req.params.articleId);
            res.json(article)
        } catch (err) {
            res.json({ message: err })
        }
    }


    //delete a specific contact
    async deleteOneArticle(req, res) {

        
            const article = await Article.findById(req.params.articleId);

            const removedArticle = await Article.deleteOne(article, (err, docs) => {
                if (err) res.json({ message: err })
                else res.json(removedArticle)
            })
       


    }

    //update a specific article
    async updateOneArticle(req, res) {

        await Article.updateOne(
            { _id: req.params.articleId },
            { $set: { body: req.body.body, title: req.body.title } },
            (err, docs) => {
                if (err) res.json({ message: err })
                else res.json({ message: "Updated Successfully" });
            }
        ).clone().catch(function (err) { console.log(err) })  // Allowing excution of query multiple times


    }
}

export default ArticlesController;