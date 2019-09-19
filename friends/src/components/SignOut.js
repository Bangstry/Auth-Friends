import React, {useEffect} from 'react';

const SignOut = (props) => {

    useEffect(()=>{
        localStorage.setItem('token', null);
        props.setAuth(true);
        props.history.push('/');
    },[])
    return ( 
        <div>Sign Out</div>
     );
}
 
export default SignOut;