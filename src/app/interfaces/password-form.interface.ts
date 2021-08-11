export interface EmailResetForm {
  email: string;
}

export interface PassResetForm {
  password: string;
  password2?: string;
}

export interface ComparePassForm {
  password: string;
}
