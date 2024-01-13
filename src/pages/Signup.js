import React,{useState} from 'react'
import Logo from '../pictures/logo.png'
import Password from '../components/Password'
import Input from '../components/inputGroup'
import Arrow from '../pictures/Arrow.png'
import Line from '../pictures/Line.png'
import Apple from '../pictures/apple.png'
import { supabase } from '../client';

export default function Signup() {
    
    const toLogin = () => {
        window.location.replace("/login")

    }
    const [formData, setFormData] = useState({
        email: '', password: ''
    })
    function handleChangeEmail(event) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            email: event.target.value,
        }));
    }
    
    function handleChange(event) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }

        })

    }
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const { data, error } = await supabase.auth.signUp(
                {
                    email: formData.email,
                    password: formData.password,
                }
            )
            if (error) throw error
            alert('Check your email for verification link');
            window.location.replace('/login')


        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className='flex font-inter flex-col bg-background min-h-screen h-full'>
            <div className='ml-7'>
                <img src={Logo} />
            </div>
            <div className='flex justify-center text-3xl font-bold mt-7'>
                Create your account
            </div>
            <div className='flex flex-col'>
                <div className='flex justify-center mt-8'>
                    <input type="email" placeholder="Email address" onChange={handleChangeEmail} className="w-3/12 md:w-[410px] pl-6 py-4 border border-gray-300 rounded-md" />
                </div>
                <div className='flex justify-center mt-6'>
                    <Password value="Password" handleChange={handleChange} />
                </div>
                <div className='flex justify-center mt-6'>
                    <Password value="Confirm Password" handleChange={handleChange} />
                </div>
               
                <div className='flex justify-center mt-10'>
                    <button className='w-3/12 md:w-[410px] py-4 bg-Green flex justify-between pr-4 rounded-md'>
                        <div></div>
                        <div onClick={handleSubmit} className='text-white text-lg font-semibold rounded-md'>Sign Up</div>
                        <img className='mr-2' src={Arrow} />
                    </button>

                </div>

                <div className='flex justify-center text-xs mt-10'>
                    <div>
                    Already have an account?
                    </div>
                    <div className='text-Green font-semibold ml-1'>
                        Login
                    </div>
                </div>
                {/* <div className='flex justify-center mt-10'>
                   <img src={Line} className='self-center' />
                   <div className='text-xs ml-2 mr-2 text-Gray'> OR </div>
                   <img src={Line} className='self-center' />

                </div>

                <div className='flex justify-center text-xs mt-5'>
                   Sign up with
                </div>


                <div className='flex justify-center mt-5'>
                    <img src={Apple}/>
                     
                </div> */}


            </div>
        </div>
    )
}
