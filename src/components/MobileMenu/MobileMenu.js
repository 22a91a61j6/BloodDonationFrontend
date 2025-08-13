import React, { Fragment, useState } from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import { Link } from "react-router-dom";

const menus = [
    {
        id: 1,
        title: 'Home',
        link: '/home',
    },
    // {
    //     id: 4,
    //     title: 'Events',
    //     link: '/events',
    // },

    {
        id: 4,
        title: 'Events',
        link: '/events',
        submenu: [
            {
                id: 41,
                title: 'Events',
                link: '/events'
            },
            {
                id: 42,
                title: 'Gallery',
                link: '/gallery'
            }
        ]
    },
    {
        id: 3,
        title: 'Donations',
        link: '/donation-listing',
        submenu: [
            {
                id: 31,
                title: 'Donations Process',
                link: '/donation-listing'
            },
            {
                id: 32,
                title: 'Our Volunteers',
                link: '/volunteers'
            }
        ]
    },

    {
        id: 8,
        title: 'Live Counts',
        link: '/live-counts',
    },

    {
        id: 5,
        title: 'Statistics',
        link: '/stats',
    },
    
    
    // {
    //     id: 6,
    //     title: 'Gallery',
    //     link: '/gallery',
    // },
    {
        id: 2,
        title: 'About',
        link: '/about',
    },
    {
        id: 7,
        title: 'Contact',
        link: '/contact',
    },
    {
        id: 8,
        title: 'My Team',
        link: '/myTeamPage'
    }
]

const MobileMenu = () => {
    const [openId, setOpenId] = useState(0);

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <ul className="main_menu_list clearfix">
            {menus.map((item, mn) => {
                return (
                    <ListItem className={item.id === openId ? 'active' : null} key={mn}>
                        {item.submenu ? (
                            <Fragment>
                                <p onClick={() => setOpenId(item.id === openId ? 0 : item.id)}>
                                    {item.title}
                                    <i className={item.id === openId ? 'ti-minus' : 'ti-plus'}></i>
                                </p>
                                <Collapse in={item.id === openId} timeout="auto" unmountOnExit>
                                    <List className="subMenu">
                                        {item.submenu.map((submenu, i) => (
                                            <ListItem key={i}>
                                                <Link onClick={ClickHandler} className="active" to={submenu.link}>
                                                    {submenu.title}
                                                </Link>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            </Fragment>
                        ) : (
                            <Link onClick={ClickHandler} className="active" to={item.link}>
                                {item.title}
                            </Link>
                        )}
                    </ListItem>
                );
            })}
        </ul>
    );
};

export default MobileMenu;