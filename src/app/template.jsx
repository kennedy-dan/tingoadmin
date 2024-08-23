'use client';
import React, { useEffect } from 'react';
import Providers from '~/redux/provider';
import '~/public/fonts/Linearicons/Font/demo-files/demo.css';
import '~/public/fonts/font-awesome/css/font-awesome.css';
import 'public/css/bootstrap.min.css';
import '~/styles/style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
export const metadata = {
    // title: 'Martfury - Multipurpose Marketplace React Ecommerce Template',
    description: '',
}

export default function Template({ children }) {

    const dispatch = useDispatch()
    const router = useRouter();
    const {user} = useSelector(state => state.auth)
    useEffect(() => {
      if(!user){
        router.push('/account/login')
      }
    }, []);

    return (
        <div>
            {children}
        </div>
    );
}

