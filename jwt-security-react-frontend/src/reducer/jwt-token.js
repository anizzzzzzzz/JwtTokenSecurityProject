import {JWT_TOKEN} from "../constant/action-type";

export const jwtToken=(state=null, action)=>{
    switch (action.type){
        case JWT_TOKEN:
            return action.payload;
        default:
            return state;
    }
};
