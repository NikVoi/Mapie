import React from 'react'

export interface IProps {
	handleInputEmail: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleInputPassword: (e: React.ChangeEvent<HTMLInputElement>) => void
}
