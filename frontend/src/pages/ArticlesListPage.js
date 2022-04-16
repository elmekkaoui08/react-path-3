import {ArticleList} from "../components/ArticleList";
import articles from "../shared/article-content";


export const ArticlesListPage = () => {
    return (
        <>
            <h1>You are in the Article List Page</h1>
                <ArticleList articles={articles}/>
        </>
    );
}
