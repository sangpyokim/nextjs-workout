import Head from 'next/head'
import React, { ReactElement, useState } from 'react'
import styles from '../styles/Landing.module.css'
import Header from '../components/organisms/Header';
import { NextPageWithLayout } from './_app';
import { Layout } from 'antd';
import NestedLayout from '../components/layout/nested-layout';
import GoogleLogInButton from '../components/atoms/GoogleLogInButton';


const Landing = () => {
  

  return (
    <main className={styles.container} >

      <GoogleLogInButton />
    </main> 
  )
}



export default Landing