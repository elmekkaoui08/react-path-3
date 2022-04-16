import {BiUpvote} from "react-icons/bi";


export const ArticleUpvote = ({articleName, upvotes, setArticleInfo})=>{

    const upvoteArticle = async ()=>{
       const article = await fetch(`/api/articles/${articleName}/upvote`, {method:'post'});
       setArticleInfo(await article.json());
    }

    return (<>
        <p>This article has {upvotes} upvotes</p>
        <BiUpvote onClick={()=>upvoteArticle()}/>
    </>)
}
