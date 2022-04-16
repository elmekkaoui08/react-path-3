import {Link} from "react-router-dom";

export const ArticleList = ({articles}) =>(
    <>
        {
            articles.map((item, index) =>

                <Link key={index} className='article-list-item' to={'/article/' + item.name}>
                    <h2> {item.title} </h2>
                    <p>{item.content[0].substring(0, 100)}</p>
                </Link>
            )
        }
    </>
)
