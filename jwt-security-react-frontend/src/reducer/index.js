import {combineReducers} from "redux";
import {jwtToken} from "./jwt-token";
import {article} from "./select-article";

const allReducers=combineReducers({
    token:jwtToken,
    selectedArticle:article
});

export default allReducers;