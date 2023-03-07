import { FC, useEffect } from 'react'
import { parseCookies } from 'nookies'
import { setAuthState } from '@/redux/slices/user'
import { useAppDispatch } from '@/redux/hooks'
import cl from './spinner.module.scss'

type Props = {
	isShow?: boolean
}

const Spinner: FC<Props> = ({ isShow = true }) => {
	const dispatch = useAppDispatch()
	const cookies = parseCookies()
	useEffect(() => {
		dispatch(setAuthState(!!cookies.accessToken))
	}, [dispatch])
	useEffect(() => {
		console.log('work access token')
	}, [cookies.accessToken])
	return (
		<div className={`${cl.body} ${isShow ? cl.show : ''}`}>
			<div className={cl.waviy}>
				<span>K</span>
				<span>A</span>
				<span>Z</span>
				<span>E</span>
				<span>S</span>
				<span>H</span>
				<span>O</span>
				<span>P</span>
			</div>
		</div>
	)
}

export default Spinner
