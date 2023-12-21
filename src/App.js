// import logo from './logo.svg';
import { useEffect } from 'react';
import './App.css';
import {getData} from './QuestionsData/fetchGfg'
import {fetchDailyCodingChallenge} from './QuestionsData/fetchLeetcode'
function App() {
  async function getData()
  {
    const cokk = await chrome.cookies.get({name : "LEETCODE_SESSION" , url : "https://leetcode.com/"});
    const data= await cokk;
    console.log(data);
  }
  useEffect(()=>{
    getData();

  },[])
  return (
    <div className="w-80 h-auto bg-stone-800">
      <div className="header w-full h-12 bg-transparent text-white flex justify-center items-center text-2xl">
        <div>Lets Do It</div> 
      </div>
      <div className='data w-full h-auto '>
        <div className="gfg h-1/2 p-3   pb-0   w-full flex justify-center items-center bg-transparent">
          <div className='h-full w-full flex flex-col justify-between rounded-lg  bg-neutral-900' >
              <div className='top flex justify-between p-3'>
                <div className='left-top text-[calc(16px)] text-white'>Lorem ipsum dolor sit.</div>
                <div className="icon w-9 h-9"><img className=' rounded-lg w-fit h-fit' src="https://iconape.com/wp-content/files/jf/122399/png/LeetCode_logo_white_no_text.png" alt="" srcset="" />
                </div>
              </div>
              <div className='bottom flex justify-between p-3 w-full  ' >
                <div className='text-[calc(14px)] text-white  pt-2 justify-center  '  >
                  <div className='w-auto h-2 flex gap-1  '>

                  <img className='w-auto h-4 mt-1  ' src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Another-Clock.gif" alt="" srcset="" />
                   <p className='mt-0.5'> 00hh : 00m : 00s </p>
                  </div>
                </div>
                <div onClick={()=>getData()} className="right-top border-1 pl-3 pr-3 p-1.5 text-sm rounded-lg text-white bg-green-800  ">Solved</div>
              </div>
          </div>
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
