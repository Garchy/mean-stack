import { Message } from "../messages/message.model"

export class Profile {
    constructor(
            public firstName: string,
            public lastName: string,
            public username: string,
            public email: string,
            public birthday: string,
            public genre: string,
            public messages: Message[]
        ){}
}