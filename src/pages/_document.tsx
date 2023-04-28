import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
		<Html style={{ scrollBehavior: 'smooth' }}>
			<Head />
			<link
				href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap"
				rel="stylesheet"
			/>
			<link
				href="https://fonts.googleapis.com/css2?family=Georama:wght@300;400;500&display=swap"
				rel="stylesheet"
			></link>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
