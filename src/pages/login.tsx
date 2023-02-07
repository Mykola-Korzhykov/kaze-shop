import React, { FC, useState } from 'react'
import LoginForm from '@/components/Forms/LoginForm'
import { NotAuthorized } from '@/hoc/OnlyNotAuthorized'
import Link from 'next/link'
import Image from 'next/image'
import AuthImg from '../assets/images/auth_photo.png'
import SpinnerLayout from '@/layouts/SpinnerLayout'
import { NextPage } from 'next'
const Login: NextPage = () => {
	return (
		<SpinnerLayout>
			<main className='content'>
				<div className='container'>
					<div className='page_coordinator'>
						<Link href={'/'}> Главная</Link> | <span>Вход</span>
					</div>
					<div className='auth_block'>
						<div className='auth_image'>
							<Image
								src={AuthImg}
								alt='link to user basket'
								width={390}
								height={550}
								quality={90}
								priority={true}
							/>
						</div>
						<div className='auth_form'>
							<h3 className='auth_title'>Вход</h3>
							<LoginForm />
						</div>
					</div>
				</div>
			</main>
		</SpinnerLayout>
	)
}

export const getServerSideProps = NotAuthorized(async context => {
	return { props: {} }
})

export default Login
