import { useState } from "react";
import {Helmet} from "react-helmet";


import {useDispatch} from 'react-redux'
import { useNavigate, Link } from "react-router-dom"
import {login} from "../../actions/user"

import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css"
import "./fonts/Linearicons-Free-v1.0.0/icon-font.min.css"
import "./css/util.css"
import "./css/main.css"



const LoginForm =()=>{
    const [userlogin, setUserLogin] = useState("")
    const [password, setPassword] = useState("");
	const dispatch = useDispatch()

	const navigate = useNavigate();
    const gotoMain = ()=> navigate('/', {replace: true});

	const onLogin =()=>{
		dispatch(login(userlogin, password)).then((res)=>{if(res)gotoMain()})
	}

    return(   
        <div className="limiter">
             <Helmet>
                <meta charSet="utf-8" />
                <title>Hall Booking</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            </Helmet>
		<div className="container-login100">
			<div className="wrap-login100">
				<div className="login100-form-title" >
					<span className="login100-form-title-1">
						Вхід
					</span>
				</div>

				<form className="login100-form validate-form"
                         onSubmit={(e)=>{
                            e.preventDefault();
                        }}
						>
					<div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
						<span className="label-input100">Логін</span>
						<Input 
                                 type="text" 
                                //  name="username" 
                                 placeholder="Введіть ім'я користувача"
								setValue={setUserLogin}
                                //  onChange={(e) => {setUserLogin(e.target.value);}}
                                 value={userlogin}
                                 />
						<span className="focus-input100"></span>
					</div>

					<div className="wrap-input100 validate-input m-b-18" data-validate = "Password is required">
						<span className="label-input100">Пароль</span>
						<Input 
                           type="password"
                        //    name="pass"
                           placeholder="Введіть проль"
						   setValue={setPassword}
                        //    onChange={(e) => {setPassword(e.target.value);}}
                           value={password}/>
						<span className="focus-input100"></span>
					</div>

					<div className="flex-sb-m w-full p-b-30">
						<div className="contact100-form-checkbox">
							<input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"/>
							{/* <label className="label-checkbox100" for="ckb1">
								Remember me
							</label> */}
						</div>

						<div>
							<Link to="#" className="txt1">
								Forgot Password?
							</Link>
						</div>
					</div>

					<div className="container-login100-form-btn">
						<button className="login100-form-btn"
								onClick={onLogin}>
							УВІЙТИ
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>

    )
}




const Input = (props) => {
    return (
        <input onChange={(event)=> props.setValue(event.target.value)}
               value={props.value}
               type={props.type}
               placeholder={props.placeholder}
			   className="input100"/>
    );
};

export default LoginForm