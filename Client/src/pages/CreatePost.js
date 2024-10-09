import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import {Navigate} from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost()
{
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState([]);
    const [files, setFiles] = useState('');
    const[redirect, setRedirect] = useState(false);

    async function createNewPost(event)
    {
        event.preventDefault();
      const data = new FormData();
      data.set('title',title);
      data.set('summary',summary);
      data.set('content',content);
      if(files.length > 0)
      data.set('file',files[0]);       
    
      const response = await fetch('http://localhost:4000/post',{
        method:'POST',
        body: data,
        credentials: 'include',
      });      
      if(response.ok){
        setRedirect(true);
      }
    }

    if(redirect){
        return <Navigate to={'/'} />;
    }
    
    return(
        <form onSubmit={createNewPost}>
            <input type="title"          placeholder={'Title'} 
                value={title}
                onChange={event => setTitle(event.target.value)} />
            
            <input type="summary"
            placeholder={'Summary'}
            value={summary}
            onChange={event => setSummary(event.target.value)}/>
            
            <input type="file"
            onChange={event => setFiles(event.target.files)}/>
            
            <Editor value={content} onChange={setContent}/>

            <button style={{marginTop: '5px'}}>Create Post</button>
        </form>
    );
}