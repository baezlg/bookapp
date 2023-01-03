import axios, { EndPoints } from 'api/axios';
import { Subscription } from 'models/user-type';
export type UserModel = {
  email: string;
  password: string;
};

export type RegisterModel = {
  id?: string;
  email: string;
  password: string;
  country?: string;
  isPublic?: boolean;
  phone?: string;
  role?: string;
  state?: string;
  tier?: string;
  name: string;
  avatar?: string;
  city?: string;
  canHire?: boolean;
  subscription?: Subscription;
};

export type ChangePasswordModel = {
  email: string;
  password: string;
  id: string;
};

/*The return object will be an object with an access token of type string. We're expecting an access token from the json-server-auth */
export async function loginAxios(userModel: UserModel) {
  return await axios.post<{ accessToken: string }>(EndPoints.login, userModel);
}

export async function registerAxios(registerModel: RegisterModel) {
  return await axios.post<{ accessToken: string }>(
    EndPoints.usersDb,
    registerModel,
  );
}

export async function changePassWordAxios(
  changePasswordModel: ChangePasswordModel,
) {
  return await axios.put<void>(
    `${EndPoints.users}/${changePasswordModel.id}`,
    changePasswordModel,
  );
}
