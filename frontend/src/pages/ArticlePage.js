import {useParams} from "react-router-dom";
import articles from "../shared/article-content";
import {ArticleList} from "../components/ArticleList";
import {ResourceNotFound} from "./ResourceNotFound";
import {useEffect, useState} from "react";
import {CommentList} from "../components/CommentList";
import {ArticleUpvote} from "../components/ArticleUpvote";
import {AddCommentForm} from "../components/AddCommentForm";

export const ArticlePage = () => {
    let {name} = useParams();
    const [articleInfo, setArticleInfo] = useState({upvotes: 0, comments:[]});

    useEffect(() => {
        async function getData(){
            const result = await fetch(`/api/articles/${name}`);
            const body = await result.json();
            console.log('Body is: ', body);
            setArticleInfo(body);
        }
        getData();
    }, [name]);
    const article = articles.find(art => art.name === name);
    const otherArticles = articles.filter(art => art.name !== name);
    //
    // const onAddComment = (comment)=>{
    //     articleInfo.comments=[...articleInfo.comments, comment];
    //     setArticleInfo(articleInfo)
    //
    //     console.log('---------- Comment added -------------', articleInfo);
    // }

    if(!article) return <ResourceNotFound />;
    return (
        <>

            <h1>{article.title}</h1>
            <ArticleUpvote articleName={name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo}/>
            {
                article.content.map((para, key) => <p key={key}>{para}</p>)
            }
            <CommentList comments={articleInfo.comments} />
            <AddCommentForm setArticleInfo={setArticleInfo} articleName={name} />
            <h2>Other Articles</h2>
            <ArticleList articles={otherArticles}/>
        </>
    );
}
