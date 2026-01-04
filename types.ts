
export interface Account {
  id: string;
  serviceName: string;
  accessLink: string;
  accountName: string;
  username: string;
  passwordRules: string;
  helpText: string;
  notes: string;
  updatedAt: number;
}

export type ViewState = 'LIST' | 'FORM' | 'DETAIL' | 'ASSISTANT';
