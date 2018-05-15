import React, {Component} from 'react';
import NavigationBar from "../navbar/NavigationBar";
import {connect} from "react-redux";
import {addArticle} from "../../api/index";
import {AddArticleException} from "../../exception/index";

class AddArticle extends Component {
    constructor(props){
        super(props);

        this.state={
            title:'',
            description:''
        };

        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
           [event.target.name]:event.target.value
        });
    }

    handleSubmit(event){
        event.preventDefault();

        let data={
            title : this.state.title,
            description : this.state.description
        };

        addArticle(data,this.props.jwttoken)
            .then((response)=>{
                if(response.status !== 200){
                    throw new AddArticleException();
                }
                else{
                    this.props.history.push({
                        pathname: "/home"
                    });
                }
            })
            .catch((error)=>{
                if(error instanceof AddArticleException){
                    console.log("Error while adding article");
                }
            });
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
        jwttoken:state.token
    };
}

export default connect(mapStateToProps,null)(AddArticle);
