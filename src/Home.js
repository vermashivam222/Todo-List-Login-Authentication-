import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Main from "./Main"
const Home = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        let username=sessionStorage.getItem('username');
        if(username==='' || username === null){
            navigate('/login');
        }
    }, []);

    return (
        <div>
            <div className="nav">    
                <Link className="linkh"  to={'/login'}>Logout</Link>
            </div>            
            <Main/>
        </div>

        
    );
}

export default Home;
