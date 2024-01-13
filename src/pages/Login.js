import React,{useState} from 'react'
import Logo from '../pictures/logo.png'
import Microsoft from '../pictures/Microsoft.png'
import Google from '../pictures/Google.png'
import Password from '../components/Password'
import Input from '../components/inputGroup'
import Arrow from '../pictures/Arrow.png'
import Line from '../pictures/Line.png'
import Apple from '../pictures/apple.png'
import { supabase } from '../client';
import LoadingScreen from '../components/Loading'
//login

export default function Login() {
  const [check,setCheck]=useState(false)

    const [formData,setFormData]=useState({
        email: '', password: ''
       })
  console.log(formData)

  function handleChange(event){
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }

    })

  }
  const loginwithGoogle=async()=>
  {
    localStorage.setItem('token',JSON.stringify("abcd"))
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/files'
      }
    })
    
  }
  
  function handleChangeEmail(event) {
    setFormData((prevFormData) => ({
        ...prevFormData,
        email: event.target.value,
    }));
}

  async function handleSubmit(e){
    setCheck(true)
    e.preventDefault()

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          })

      if (error) throw error
      console.log("data",data)
      localStorage.setItem('token',JSON.stringify(data));
      console.log("token1",localStorage.getItem('token'))
      
    //   props.setToken(data)
      window.location.replace('/files')
      


    //   alert('Check your email for verification link')

      
    } catch (error) 
    {
      setCheck(false)
      alert(error)
    }
  }

    return (
        <div className='flex flex-col bg-background font-inter'>
           <div>
        {
          check &&(<div className="absolute top-0">

          <LoadingScreen/>
          </div>)
        }
      </div>
            <div>
                <img className='ml-7' src={Logo} />
            </div>
            <div className='flex justify-center text-3xl font-bold mt-7'>
                Welcome Back
            </div>
            <div className='flex flex-col'>
                <div className='flex justify-center mt-16'>
                    <input onChange={handleChangeEmail} placeholder="Email Adress" className="w-3/12 md:w-[410px] pl-6 py-4 border border-gray-300 rounded-md" />
                </div>
                <div className='flex justify-center mt-10'>
                    <Password value="Password" handleChange={handleChange} />
                </div>
                <div className='flex justify-center mt-4'>
                        {/* <div className='text-xs ml-80'>
                            Forgot password?
                        </div> */}

                        <div className='w-3/12 md:w-[410px] flex justify-between'>
                            <div>

                            </div>
                           
                            <div className='text-Black1 text-xs'>
                                Forgot password?
                            </div>

                        </div>

                </div>
                <div className='flex justify-center mt-10'>
                    <button className='w-3/12 md:w-[410px] py-4 bg-Green flex justify-between pr-4 rounded-md'>
                        <div></div>
                        <div onClick={handleSubmit} className='text-white text-xl font-semibold rounded-md'>Login</div>
                        <img src={Arrow} />
                    </button>

                </div>

                <div className='flex justify-center text-xs mt-8'>
                    <div>
                    New here? 
                    </div>
                    <div className='text-Green font-semibold pl-1'>
                    Sign Up
                    </div>
                </div>
                <div className='flex justify-center mt-10'>
                   <img src={Line} className='self-center' />
                   <div className='text-xs ml-2 mr-2 text-Gray'> OR </div>
                   <img src={Line} className='self-center' />

                </div>

                <div className='flex justify-center text-xs mt-4'>
                   Login with
                </div>


                <div className='flex justify-center mt-6'>
                  
                   <img src={Apple}/>
                    <img onClick={loginwithGoogle} className="ml-5" src={Google}/>
                    <img className="ml-5" src={Microsoft}/>
                  
                     
                </div>


            </div>
        </div>
    )
}
