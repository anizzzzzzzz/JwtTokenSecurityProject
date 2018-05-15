import {JWT_TOKEN, SELECT_ARTICLE} from "../constant/action-type";

export const token=(token)=>{
    return{
        type:JWT_TOKEN,
        payload:token
    }
};

export const selectArticle = (article)=>{
    return{
        type:SELECT_ARTICLE,
        payload:article
    }
};