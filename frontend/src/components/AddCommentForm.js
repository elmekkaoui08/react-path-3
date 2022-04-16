import {useState} from "react";


export const AddCommentForm = ({setArticleInfo, articleName})=>{
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    let newComment = {username: username, comment: comment};
    const submitComment = async ()=>{
        const result = await fetch(`/api/articles/${articleName}/add-comment`, {
            method: 'post',
            body: JSON.stringify(newComment),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const body = await result.json();
        setUsername('');
        setComment('');
        setArticleInfo(body);
    }

    return (<div id='add-comment-form'>
        <h3>Add Comment</h3>
        <label >Name:
            <input type='text' placeholder='Entre your username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
        </label>
        <label>Comment:
            <textarea  rows={4} cols={50} value={comment} onChange={(e)=>setComment(e.target.value)}/>
        </label>
        <button onClick={()=>submitComment()}>Send</button>
</div>)
}
