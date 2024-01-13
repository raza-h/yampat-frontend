import React from 'react'
import Logo from '../pictures/logo.png'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function HomePage() {
    const toLogin=()=>
    {
        window.location.replace("/login")
    }
    const toSignup=()=>
    {
        window.location.replace("/signup")
    }
  return (
    <div className='flex font-inter'>
        <div className='flex flex-col w-[50vw] bg-custom-gradient h-[100vh] justify-between'>
           <div></div>
           <div></div>
           <div>

           </div>
           <div></div>

            <div className='flex ml-7 md:ml-0 justify-center text-2xl md:text-4xl text-myWhite'>
            Introducing Gradecheckr

            </div>
            <div className='ml-0 md:ml-3 flex justify-center text-sm md:text-lg text-myWhite'>
              <div className="w-[85%] md:w-[60%]">
              We are pioneering a transformative approach to evaluating student work by leveraging artificial intelligence. Our groundbreaking system will allow teachers to offload the repetitive and laborious task of assignment marking to AI, which will generate personalised feedback. By combining the consistency of automated scoring with human insight, we hope to shape the future of assessment.

              </div>
             

            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>

        </div>
        <div className='flex flex-col justify-between w-[50vw] h-[100vh] bg-background'>
            <div></div>
            <div className='flex justify-center'>
                <img src={Logo}/>

            </div>
            <div></div>
            <div></div>
            <div className='flex justify-center font-bold text-Black1 text-3xl'>Get Started</div>
            <div></div>


            <div className='flex justify-center w-full'>
                <button onClick={toLogin} className='bg-Green w-[55%] text-myWhite py-3 rounded-md '>
                    Login

                </button>

            </div>
            <div className='flex justify-center w-full'>
                <button onClick={toSignup} className='bg-Green w-[55%] text-myWhite py-3 rounded-md '>
                    Sign up

                </button>

            </div>
            <div></div>
            <div></div>
            <div></div>

            <div></div>

            <div></div>
            <div></div>

            <div></div>
            <div></div>

            <div></div>



        </div>
    </div>
  )
}
