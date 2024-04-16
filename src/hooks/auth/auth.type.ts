export interface IUserData {
  email: string;
  password: string;
  message: string;
  typeAlert: string;
  isActive: boolean;
}

export interface IProps {
  userData: IUserData;
  setUserData: (data: Partial<IUserData>) => void;
}
