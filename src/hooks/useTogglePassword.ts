import React from 'react'
export const useToggle = (initialState = false) => {
	console.log('soon add')
	const [state, setState] = React.useState<boolean>(initialState)

	const toggle = React.useCallback(() => setState(state => !state), [])

	return [state, toggle]
}
