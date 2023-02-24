import {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'https://techcrunch.com/wp-json/wp/v2/posts?per_page=20&context=embed'

function App() {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState('');
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    setLoading(true)
    const fetchPosts = async () => {
        try{
          const res = await axios.get(API_URL);
          console.log(res.data);
          setPosts([...res.data]);
        }catch(err){
          console.log(err)
          setError(err)
        }finally{
          setLoading(false);
        }
    }

    fetchPosts();
  },[])

  return (
    <div className="App">
      {
        isLoading ? 
          <div>Loading...</div> :
          <div id='postList'>
            {
              isError ? <div>error</div> : 
              <>
                {
                   posts.map( (post) => (
                    <div key={post.id} className='post' style={{width:"300px", height:"500px", border:"1px solid red"}} > 
                      <div className='post-title'>{post.slug}</div>
                      <div className='post-image'><img src={post.jetpack_featured_media_url} alt='No Image' width="300" height="400"/></div>
                      <div></div>
                      <br/>
                    </div>
                    ) )
                }
              </>
              
            }
          </div>
      }
    </div>
  );
}

export default App;
