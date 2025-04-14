import { useState } from 'react';
import '../App.css'
import axios from 'axios';
import { HashLoader } from 'react-spinners';

const Chatbot=()=>{
    const [inpuData, setInputData] = useState();
    const [qns,setQns] = useState('Hi');
    const [ans,setAns] = useState('Hello, how can i help you');
    const [loading, setLoading]= useState(false);
    const [qnsClass,setQnsClass]=useState("show-ans")

    const API_KEY ='AIzaSyA73AuYkHGJJwIXwFuzxWgls_PC8DulLeM';
    const URL='https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key='

    const sendingData={
        "contents": [{
          "parts":[{"text": "Explain how AI works"}]
          }]
         }

    const handleonChange=(e)=>{
        console.log(e.target.value);
        const inputValue = e.target.value
        //setInputData(e.target.value);
        sendingData.contents[0].parts[0].text=inputValue
    }
    const getData = () => {
        setQnsClass("hide-qns")
        setAns('')
        setQns('')
        setLoading(true);
        const data=axios.post(`${URL}+${API_KEY}`,sendingData)
        .then((res)=>{
            console.log("RES",res);
            setAns(res.data.candidates[0].content.parts[0].text)
            setQns(sendingData.contents[0].parts[0].text);
            setLoading(false);
            setQnsClass("show-qns")
        }).catch((er)=>{
            console.log(er);
        })
    }
    return(
        <div className='container'>
            <div className='data-container'>
                <p className={qnsClass}>{qns}</p>
                <p className='ans'>{ans}</p>
                <HashLoader className ='loader' loading = {loading}/>
            </div>
            <div className='input-container'>
                <input type='text' placeholder='ask with ai' onChange={handleonChange}/>
                <button onClick={getData}>Submit</button>
            </div>
        </div>
    )
}
export default Chatbot