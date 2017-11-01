export class Patient {

    public email: string;
    public name: string;
    public birth: string;
    public phone: string;
    public gender: string;

    constructor(email: string, name: string, birth: string, phone: string, gender: string) {
        this.email = email;
        this.name = name;
        this.birth = birth;
        this.phone = phone;
        this.gender = gender;
    }
}
