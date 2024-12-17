import React,{useEffect,useState,useRef} from 'react';
import ChatgptLogo from '../assets/chatgpt-icon.svg';
import myProfilePics from '../assets/profile.jpg';
import { MdSend } from "react-icons/md";
import './main.scss';
import {sendMsgToGemini} from '../api/chatgptApi';

const main = ({themes}) => {
  const [input, setInput] = useState("");
  const [count,setCount] = useState(0)
  const [responses, setResponses] = useState([
    {
      message:"Happy day",
      isbot:false
    },
  ])
  const scrollTarget = useRef(null);
  const inputTarget = useRef(null);

  useEffect(()=>{
    scrollTarget.current.scrollIntoView();
    if(responses.length > 1){
      setCount(1)
    }else{
      setCount(0)
    }
  },[responses])
  
  const sendMsg = async (e)=>{
    const inputText =input;
    setResponses([
      ...responses,{message:inputText,isbot:false}
    ]);
    setInput("");
    inputTarget.current.focus();
    try{
      const response = await sendMsgToGemini(inputText);
    await setResponses([
      ...responses,
      {message:inputText,isbot:false},
      {message:response,isbot:true}
    ]);
    }catch(err){
      alert(err);
    }
    console.log(responses);
    
  
  }
  return (
    <div className="main__container">
      <section className={`message__section ${themes === 'light'?'dark-text':''}`}>
        <div className="scroll__div">
          {
            responses.map((response,i)=> {
              if(i>0){
                return (
                <div key={i} className={`prompt-text ${response.isbot?"ai__bg":""}`}>
            <div className="image">
            <img src={response.isbot?ChatgptLogo:myProfilePics} alt="logo" />
            </div>
            <div className="paragraph">
            <p>
              {response.message}
            </p>
            </div>
          </div>
                )

              }else{
                return(
                count === 0 && (
                  <p className={`${themes === 'light'?'dark-adjust-text':''}`} style={{textAlign:"center",position:'absolute',top:"50%",left:"50%",transform:"translate(-50% ,-50%)", fontSize:"1.3rem"}}>Ask me anything, your dearest friend Gemini</p>
                )
              )
              }
            }
          )
          }

        {/* <div className="prompt-text ai__bg">
          <div className="image">
          <img src={ChatgptLogo} alt="ChatGPT logoo" />
          </div>
          <div className="paragraph">
          <p>Hi,I am ChatGpt, a state-of-the-art language model developed by OpenAI. Im designed to understand and generate human like text based on the input I recieve. You can ask me  questions, have conversations, seek information or even request assistance with various task. Just let me know how i can help you!</p>

          </div>
        </div>
        <div className="prompt-text">
          <div className="image">
          <img src={ChatgptLogo} alt="ChatGPT logo" />
          </div>
          <div className="paragraph">
          <p>Introduce your self</p>
          </div>
        </div> */}


        <div ref={scrollTarget}/>
        </div>
      </section>

      <section className="input__section">
        <div className="input__container">
        <input className={`${themes === 'light'?'input-whiteMode':''}`} ref={inputTarget} type="text" placeholder='Send a message' 
        onChange={(e)=>{
          setInput(e.target.value);
        }}
        value={input}
        onKeyDown={(e)=>{
          if(e.keyCode === 13 || e.which === 13){
            sendMsg();
          }
        }}
        />
        <div className={`input__icon ${themes === 'light'?'sendBtnLight':''}`} onClick={sendMsg}><MdSend/></div>
        </div>
      </section>
      <footer>
        ChatGPT may produce inaccurate about people places or facts. ChatGPT August 10 version
      </footer>
    
    </div>
  );
};

export default main;
