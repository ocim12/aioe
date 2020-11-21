import React, { PureComponent } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import * as ImIcons from 'react-icons/im';

export const SidebarData = [

    {
        title: 'AppleCasino',
        path: '/',
        icon: <GiIcons.GiShinyApple/>,
        cName: 'nav-text'
    },
    {
        title: 'Black, Red, Green',
        path: '/brgGame',
        icon: <GiIcons.GiCube/>,
        cName: 'nav-text'
    },
    {
        title: 'Coinflip',
        path: '/coinflipGame',
        icon: <ImIcons.ImCoinDollar/>,
        cName: 'nav-text'
    },
    {
        title: 'Twisted Fate',
        path: '/tfgame',
        icon: <FaIcons.FaDiceThree/>,
        cName: 'nav-text'
        
    }
]
