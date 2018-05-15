import React, {Component} from 'react';
import {deleteArticle, showTasks} from "../../api/index";
import {connect} from "react-redux";
import {DeleteArticleException, ShowTasksException} from "../../exception/index";
import NavigationBar from "../navbar/NavigationBar";
import {bindActionCreators} from "redux";
import {selectArticle} from "../../action/index";

class ShowArticles extends Component {
    constructor(props){
        super(props);

        this.state={
            tasks:[],
            id:0,
            title:'',
            description:''
        };

        this.handleClick=this.handleClick.bind(this);
        this.handleEdit=this.handleEdit.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
    }

    componentDidMount(){
        showTasks(this.props.jwttoken)
            .then((response)=>{
                if(response.status !== 200){
                    throw new ShowTasksException();
                }
                else{
                    return response.json();
                }
            })
            .then((result)=>{
                this.setState({
                    tasks:result
                });
            })
            .catch((e)=>{
                if(e instanceof ShowTasksException){
                    console.log("Error while displaying article");
                }
            });
    }

    createList(){
        return this.state.tasks.map((task)=>{
            return(
                <a
                    className="list-group-item list-group-item-action"
                    data-toggle="list"
                    role="tab"
                    onClick={()=>this.handleClick(task)}
                    key={task.id}>
                    {task.title}
                </a>
            )
        });
    }

    handleClick(task){
        this.setState({
            id:task.id,
            title : task.title,
            description : task.description
        });
    }

    handleEdit(event){
        event.preventDefault();

        let data={
            id:this.state.id,
            title:this.state.title,
            description:this.state.description
        };
        this.props.selectArticle(data);
        this.props.history.push({
            pathname: "/edit-article"
        });
    }

    handleDelete(event){
        event.preventDefault();

        deleteArticle(this.state.id,this.props.jwttoken)
            .then((response)=>{
                if(response.status !== 200){
                    throw new DeleteArticleException();
                }
            })
            .catch((e)=>{
                if(e instanceof DeleteArticleException){
                    console.log("Error while deleting article");
                }
            });
        window.location.reload();
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <div className="container" style={{marginTop:'80px'}}>
                    <div className="row">
                        <div className="col-xs-4 col-md-4 col-sm-4">
                            <div className="list-group" id="list-tab" role="tablist">
                                {this.createList()}
                            </div>
                        </div>
                        <div className="col-xs-8 col-md-8 col-sm-8">
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-panel show" role="tabpanel">
                                    <div className="row">
                                        <div>
                                            <center><h4>{this.state.title}</h4></center>
                                        </div>
                                        <div style={{float:'right'}}>
                                            {this.state.title !==''?(
                                                <div>
                                                    <button
                                                        type="button"
                                                        className="btn btn-default"
                                                        onClick={this.handleEdit}
                                                        style={{marginRight:'10px'}}>
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-default"
                                                        onClick={this.handleDelete}
                                                        style={{marginRight:'10px'}}>
                                                        Delete
                                                    </button>
                                                </div>
                                            ): null}

                                        </div>
                                    </div>
                                    <br/>
                                    <div>{this.state.description}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{
        jwttoken:state.token
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        selectArticle:selectArticle
    },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ShowArticles);
