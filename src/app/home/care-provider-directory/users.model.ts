export class Users {
    
        public firstName: string;
        public lastName: string;
        public username: string;
        public email: string;
        public created_at: string;
        public updated_at: string;
        public isPatient: boolean;
    
        constructor(firstName: string, lastName: string, username: string, email: string, created_at: string,
                    updated_at: string, isPatient:boolean) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.username = username;
            this.email = email;
            this.created_at = created_at;
            this.updated_at = updated_at;
            this.isPatient = isPatient;
        }
    }
    