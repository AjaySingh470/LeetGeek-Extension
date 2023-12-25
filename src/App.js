// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import gifloader from '../assets/loader.svg'
import { useTimer } from 'react-timer-hook';
// import {getData} from './QuestionsData/fetchGfg'
import {getCookie, getPotd} from './QuestionsData/fetchLeetcode'
import CountdownTimer from './Timer';
function App() {
  const expiryTime = new Date();
  expiryTime.setHours(5);
  expiryTime.setMinutes(30);
  expiryTime.setSeconds(0);
  expiryTime.setMilliseconds(0);

  const {
    hours,
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    reset,
  } = useTimer({
    expiryTimestamp: expiryTime,
    onExpire: () => console.warn('onExpire called'),
  });

    const [statusLC , setStatusLC] = useState(false);
    const [problemname,setProblemname] = useState("");
    const [lclink , setLclink] = useState("");
    const potdQuestion = JSON.stringify({
      query: "query questionOfToday {  activeDailyCodingChallengeQuestion {  date   userStatus  link   question {     acRate      difficulty     freqBar      frontendQuestionId: questionFrontendId    isFavor     paidOnly: isPaidOnly      status    title    titleSlug     hasVideoSolution      hasSolution      topicTags {       name       id       slug}}}}",
    })
  


  useEffect(()=>{
    async function getPotd()
{
	const data = await chrome.cookies.get({name : "LEETCODE_SESSION" , url : "https://leetcode.com/"});
	let header = new Headers()
	console.log(data)
  header.append("Content-Type", "application/json");

	header.append("LEETCODE_SESSION",data.value)
	let request = {
		method : 'POST',
		headers : header,
		body : potdQuestion
	}
	// fetch("https://leetcode.com/graphql", request)
	// .then(response => response.json())
	// .then(result => {return result})
	// .catch(err => console.log(err))
	const reponse = await fetch("https://leetcode.com/graphql", request)
	const dataques = await reponse.json();
	
	const finaldata = dataques.data.activeDailyCodingChallengeQuestion;
  console.log(dataques.data.activeDailyCodingChallengeQuestion)
	setProblemname(finaldata.question.title)
  setStatusLC(finaldata.userStatus == "Finish" ? true : false)
  setLclink("https://leetcode.com" + finaldata.link)
}
  getPotd()
  // restart(date)
  },[])



  return (
    <div className="w-80 h-auto bg-stone-800">
      <div className="header w-full h-12 bg-transparent text-white flex justify-center items-center text-2xl">
        <div>Lets Do It</div> 
      </div>
      <div className='data w-full h-auto '>
        <div className="gfg h-[calc(136px)] p-3  pb-0   w-full flex justify-center items-center bg-transparent">
          { problemname ? 
          <div className='h-full w-full flex flex-col justify-between rounded-lg  bg-neutral-900' >
              <div className='top flex justify-between p-3'>
                <div className='left-top text-[calc(16px)] text-white hover:underline cursor-pointer'><a href={lclink} target='#'>{problemname ? problemname : "loading..."}</a></div>
                <div className="icon w-9 h-9"><img className=' rounded-lg w-fit h-fit' src="https://iconape.com/wp-content/files/jf/122399/png/LeetCode_logo_white_no_text.png" alt="" srcset="" />
                </div>
              </div>
              <div className='bottom flex justify-between p-3 w-full  ' >
                <div className='text-[calc(14px)] text-white mt-2  pt-2 justify-center  '  >
                  <div className='w-auto h-2 flex gap-1 justify-center items-center '>

                  <img className='w-auto h-4 mt-1  ' src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Another-Clock.gif" alt="" srcset="" />
                  <div className='mt-1'>

                   <CountdownTimer></CountdownTimer>
                  </div>
                  </div>
                </div>
                { statusLC ?
                  <div  className="right-top border-1 pl-3 pr-3 p-1.5 text-sm rounded-lg text-white border-2 border-white   "> Solved ✅ </div> :
                 <div  className="right-top border-1 pl-3 pr-3 p-1.5 text-sm rounded-lg text-white bg-green-800  ">Lets Solve It</div> 
                }
              </div>
          </div> : <div className='w-screen h-full flex justify-center rounded-lg items-center bg-neutral-900'>
            <img src={gifloader} alt="llllll" className='w-10 h-10'   srcSet={`${gifloader} 1x, ${gifloader} 2x, ${gifloader} 3x `} />
          </div> }
        </div>
        <div className="leetcode p-3 bg-transparent h-1/2 w-full ">
        <div className='h-full w-full flex flex-col justify-between rounded-lg  bg-neutral-900' >
              <div className='top flex justify-between p-3'>
                <div className='left-top text-[calc(16px)] text-white'>Lorem ipsum dolor sit.</div>
                <div className="icon w-9 h-9"><img className=' rounded-lg w-fit h-fit' src="https://media.geeksforgeeks.org/gfg-gg-logo.svg" alt="" srcset="" />
                </div>
              </div>
              <div className='bottom flex justify-between p-3 w-full' >
                <div className='text-[calc(14px)] text-white  pt-2 justify-center  '  >
                  <div className='w-auto h-2 flex gap-1  '>
                  <img className='w-auto h-4 mt-1  ' src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Another-Clock.gif" alt="" srcset="" />
                   <p className='mt-0.5'> 00hh : 00m : 00s </p>
                  </div>
                </div>
                <div className="right-top border-1 pl-3 pr-3 p-1.5 text-sm rounded-lg text-white bg-green-800  ">Solved</div>
              </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
