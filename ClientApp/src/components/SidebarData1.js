import React, { PureComponent } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import * as ImIcons from 'react-icons/im';
import * as RiIcons from 'react-icons/ri';
import * as BiIcons from 'react-icons/bi';

export const SidebarData1 = [
    {
        title: 'Support',
        path: '/support',
        icon: <BiIcons.BiSupport/>,
        cName: 'userTools-text'
    },
    {
        title: 'Log Out',
        path: '/logout',
        icon: <RiIcons.RiLogoutBoxLine/>,
        cName: 'userTools-text'
    }
]
