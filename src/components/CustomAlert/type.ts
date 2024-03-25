export interface IAlert {
	type: string
	text: string
	isActive: boolean
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}
