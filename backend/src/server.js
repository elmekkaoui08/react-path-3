import express from 'express';
import bodyParser from 'body-parser';
import {MongoClient} from "mongodb";
import path from "path";

const DB_URL = 'mongodb://localhost:27017'
const DB_NAME = 'my-blog';
const DB_COLLECTION = 'articles';

const app = express();
app.use(express.static(path.join(__dirname, '/build')));

app.use(bodyParser.json());

const withDB = async (operation, res) => {
    try {
        const mongoClient = await MongoClient.connect(DB_URL);
        const db = await mongoClient.db(DB_NAME);
        await operation(db);
        await mongoClient.close();
    } catch (error) {
        res.status(500).send('500 Error please contact the administration!')
    }


}

app.get('/api/articles/:name', async (req, res) => {
    await withDB(async (db) => {
        const articleName = req.params.name;
        const article = await db.collection(DB_COLLECTION).findOne({name: articleName});
        res.status(200).json(article);
    }, res);
})

app.post('/api/articles/:name/upvote', async (req, res) => {
    await withDB(async (db) => {
        const articleName = req.params.name;
        const article = await db.collection(DB_COLLECTION).findOne({name: articleName});
        await db.collection(DB_COLLECTION).updateOne({name: articleName}, {
            '$set': {
                upvotes: article.upvotes + 1
            }
        });
        const updatedArticle = await db.collection(DB_COLLECTION).findOne({name: articleName});
        res.status(200).json(updatedArticle);
    }, res);

});


app.post('/api/articles/:name/add-comment', async (req, res) => {

    await withDB(async (db) => {
        console.log(req.body)
        const {username, comment} = req.body;
        const articleName = req.params.name;
        const article = await db.collection(DB_COLLECTION).findOne({name: articleName});
        article.comments.push({username, comment});
        await db.collection(DB_COLLECTION).updateOne({name: articleName}, {
            '$set': {
                comments: article.comments,
            }
        });
        const updatedArticle = await db.collection(DB_COLLECTION).findOne({name: articleName});
        res.status(200).json(updatedArticle);
    }, res);


});

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
})

app.listen(8000, () => console.log('Server is running on port 8000'));

