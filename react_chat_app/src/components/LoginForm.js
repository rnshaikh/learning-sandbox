import { useState } from 'react';
import axios from 'axios';


const LoginForm = () =>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit= async(e)=>{
        debugger;
        e.preventDefault()
        if (username && password) {
            const authObject = { 'Project-ID' : 'ccb33ba6-ec40-4631-830e-b474b3b7d302', 
                                'User-Name': username, 'User-Secret': password }

            try{
                await axios.get('https://api.chatengine.io/chats', {headers:authObject})
                localStorage.setItem('username', username)
                localStorage.setItem('password', password)
                window.location.reload()

            }
            catch(err){
                setError('Oops incorrect credentails')
            }

        }

    }

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title"> Chat App</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                    className="input"
                    type="text"
                    value = {username}
                    placeholder="Username"
                    onChange = {(e)=>{setUsername(e.target.value)}}
                    >
                    </input>

                    <input 
                    className="input"
                    type="password"
                    value = {password}
                    placeholder= "Password"
                    onChange = {(e)=>{setPassword(e.target.value)}}
                    >
                    </input>
                    <div align="center">
                        <button type="submit" className="button">
                            <span> Start Chatting</span>
                        </button>   
                    </div>
                    <h2 className="error">{error}</h2>
                </form>
            </div>
        </div>


    )

}

export default LoginForm;