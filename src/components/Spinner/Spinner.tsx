import {FC} from 'react'
import cl from './spinner.module.scss'

type Props = {
	isShow?: boolean;
}

const Spinner: FC<Props> = ({isShow = true}) => {
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
