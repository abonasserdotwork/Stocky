import React from 'react'
import notFoundImage from '../../assets/images/Not-Found.jpeg'

export default function NotFound() {
  return (
    <div
      className="bg-cover bg-center h-screen flex flex-col justify-center items-center text-gray-800"
      style={{ backgroundImage: `url(${notFoundImage})` }}
    >
      <h1 className="text-4xl font-bold text-center text-surface mb-4">404 - Page Not Found</h1>
      <p className="text-surface text-lg text-center">
        The page you are looking for does not exist. Please check the URL or return to the homepage.
      </p>
    </div>
  )
}
