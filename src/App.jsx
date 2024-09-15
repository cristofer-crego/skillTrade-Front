import React from "react"
import { Route, Routes } from "react-router-dom"

import {HomeScreen, RegisterScreen, LoginScreen, Profile} from "./index.js"



function App() {
	return (
		<Routes>
			<Route path={'/'} element={<HomeScreen />} />
			<Route path={'/login'} element={<LoginScreen />} />
			<Route path={'/sign-up'} element={<RegisterScreen />} />
			<Route path={'/profile'} element={<Profile />} />
		</Routes>
	)
}

export default App