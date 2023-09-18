export interface FieldOption {
    label: string;
    value: string;
};

export interface Field {
    id: string;
    label: string;
    type: 'text' | 'number' | 'checkbox' | 'select' | 'textarea';
    value: string | number | string[]; 
    options?: FieldOption[];
    touched?: boolean
  }
  

export interface UserData {
    fields: Field[];
};
