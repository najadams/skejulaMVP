import { Redirect } from 'expo-router'
import React from 'react'

const index = () => {
  return (
    <Redirect href="/(main)/(tabs)" />
  )
}

export default index