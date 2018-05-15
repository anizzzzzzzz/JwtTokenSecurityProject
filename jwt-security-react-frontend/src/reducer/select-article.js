import {SELECT_ARTICLE} from "../constant/action-type";

export const article=(state=null, action)=>{
    switch (action.type){
        case SELECT_ARTICLE:
            return action.payload;
        default:
            return state;
    }
};
