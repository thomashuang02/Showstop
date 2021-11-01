import {React, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import './List.css';

const List = (props) => {
    const [user, setUser] = [props.user, props.setUser];
    useEffect(() => {
        if(user) {
            document.title = `${user.username}'s List`;
        }
        else {
            document.title = `Your List`;
        }
    }, [user]);

    /* ----------------------------------- jsx ---------------------------------- */
    if(user) {
        return (
            <div>
                <p>{user.username}</p>
            </div>
        );
    }
    else {
        return (<Redirect to="/" />)
    }
}

export default List;
