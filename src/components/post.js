import {useState,useEffect} from 'react'
const Post = () =>{
    const [loading,setLoading] = useState(true)
    const [data,setData] =useState(null)
    const [error,setError] =useState(null)
    useEffect(()=>{
        fetch('https://swapi.dev/api/films')
        .then((response) => response.json())
        .then((actualData) => {
            setData(actualData.results)
            setError(null)
        })
        .catch((error)=> {
            console.log(error)
            setError(error)
            setData(null)
        })
        .finally(()=>{
            setLoading(false)
        })
    },[])
    return(
        <div className='main'>
            <h1 style={{color:'white',textAlign:'center',paddingBlock:'30px'}}> STAR WARS</h1>
            {loading && <div>Data is loading,please wait..</div>}
            {error &&<div>{`there is a problem fetching your data- ${error}`}</div>}
            <ul>
                {data && data.map((item)=>{
                    return(
                        <li className='card' key={item.episode_id}>
                            <h3>{item.title}</h3>
                            <p>{item.release_date}</p>
                            <p style={{marginTop:'15px'}}>{item.opening_crawl.split('').splice(0,200).join('')}</p>
                            <p className='hr-line'></p>
                            <a href={'/'} style={{color:'yellow'}}>more info</a>

                        </li>
                    )

                })}
            </ul>
        </div>
    )
}
export default Post