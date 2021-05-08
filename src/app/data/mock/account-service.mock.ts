import { of } from 'rxjs';

import { LoginInfo } from '../models';


export const AccountServiceMock = {
  signIn: (loginInfo: LoginInfo) => of('')
};
