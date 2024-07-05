import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { fetchNotification } from '../../../services/operations/admin';
import './SearchBox.css';
import { Link } from 'react-router-dom';
function Notification({ isOpen, toggleNoti }) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotificationsList = async () => {
            try {
                const response = await fetchNotification();
                setNotifications(response || []); // Ensure response is an array
                console.log(response.length);

                localStorage.setItem("item",response?.length)
            } catch (error) {
                console.error("Error fetching notification news:", error);
            }
        };

        fetchNotificationsList();
    }, []);

    return (
        <CSSTransition
            in={isOpen}
            timeout={300}
             classNames="search-box"

            unmountOnExit
        >
                 <div className="absolute right-0 top-10 mt-2 w-[40%] h-[40vh] bg-gray-400 text-black rounded-lg shadow-lg p-4 overflow-y-auto">

                <h2>Notifications</h2>
                <ul className=' flex flex-col gap-4'>
                    {notifications?.map((notification) => (
                        <Link
                  to={`/newsdetails/${notification?.news._id}`}
                        
                        key={notification._id}>
                          <div className=' flex gap-3'>
                          <img src={notification?.news?.images[0]?.url} alt="Notification Image" className=' h-[80px]' />
                          <h3 className=' text-[13px]'>{notification?.news?.title}</h3>
                          
                          </div>
                        </Link>
                    ))}
                </ul>
                <button onClick={toggleNoti}>Close</button>
            </div>
        </CSSTransition>
    );
}

export default Notification;
