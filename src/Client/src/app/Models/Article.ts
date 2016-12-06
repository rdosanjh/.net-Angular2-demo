import {IUser} from './user'

export interface IArticle{
    id: string;
    title: string;
    content: string;
    author: IUser;
    dateCreated: Date;
    dateLastModifed: Date;
    articleLikes: any[];
}