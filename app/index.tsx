import { UserProvider } from '@/context/UserContext'
import { Redirect } from 'expo-router'
import React from 'react'

const Page = () => {
  return (
      <Redirect href="/(main)/(tabs)/home" />
  );
}

export default Page