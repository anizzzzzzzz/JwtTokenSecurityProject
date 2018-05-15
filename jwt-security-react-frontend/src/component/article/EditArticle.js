import React, {Component} from 'react';
import NavigationBar from "../navbar/NavigationBar";
import {connect} from "react-redux";
import {updateArticle} from "../../api/index";
import {EditArticleException} from "../../exception/index";
import {bindActionCreators} from "redux";
import {selectArticle} from "../../action/index";

class EditArticle extends Component {
    constructor(props){
        super(props);

        this.state={
            id:0,
            title:'',
            description:''
        };

        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.setState({
            id:this.props.article.id,
            title:this.props.article.title,
            description:this.props.article.description
        });
    }

    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    handleSubmit(event){
        event.preventDefault();

        let data={
            id: this.state.id,
            title: this.state.title,
            description:this.state.description
        };

        console.log("data",data);
        updateArticle(data,this.props.jwttoken)
            .then((response)=>{
                if(response.status !== 200){
                    throw new EditArticleException();
                }
                else{
                    this.clearArticleStateInStore();
                    this.props.history.push({
                        pathname: "/home"
                    });
                }
            })
            .catch((e)=>{
                if(e instanceof EditArticleException){
                    console.log("Error while updating article");
                }
            });
    }

    clearArticleStateInStore(){
        let data={
            id:0,
            title:'',
            description:''
        };

        this.props.selectArticle(data);
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <div className="container" style={{marginTop:'80px'}}>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label >Title : </label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={this.handleChange}
                                id="title"
                                value={this.state.title}
                                placeholder="Enter Title"
                                name="title"/>
                        </div>
                        <div className="form-group">
                            <label>Description : </label>
                            <textarea
                                className="form-control"
                                rows="12"
                                onChange={this.handleChange}
                                name="description"
                                value={this.state.description}
                                placeholder="Enter Description"
                                id="description"/>
                        </div>
                        <button type="submit" className="btn btn-default">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      jwttoken:state.token,
      article:state.selectedArticle
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        selectArticle:selectArticle
    },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(EditArticle);
