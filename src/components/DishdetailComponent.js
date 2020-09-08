import React, { Component }  from "react";
import {Card, CardImg, CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem, Button, Modal,ModalHeader,ModalBody,Row, Label} from 'reactstrap';
import { Link} from "react-router-dom";
import { Control, LocalForm, Errors } from 'react-redux-form';



    function RenderDish({dish}){
        if(dish != null){           
            return(
                    <div className="col-12 col-md-5 m-1 ">
                        <Card>
                            <CardImg width="100%" src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>  
            );
        }
    }

    function RenderComments({comments}){

        const commentslist= comments.map((comment) =>{
            return (
                
                <li key={comment.id} >
                    <p>{comment.comment} </p>
                        <p>-- {comment.author} ,  
                        {new Intl.DateTimeFormat('en-US', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    }).format(new Date(comment.date))}</p>
                </li>  
               
                
            );
        });

        return(
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {commentslist}
                </ul>
                <CommentForm/>
                </div>  
        );
    }


    const DishDetail=(props)=> {
        const dish=props.dish;
        if (dish == null) {
            return (<div></div>)
        }
        const dishID = <RenderDish dish={props.dish}/>
        const comments= <RenderComments comments={props.comments}/>        
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link> </BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name} </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                    <div className="row">
                        {dishID}                  
                        {comments}
                        
                    </div>
                   
            </div>
            
        );
    };


    class CommentForm extends Component {

        constructor(props){
            super(props);

            this.state= {
                isModalOpen:false
            }

            this.toggleModal =this.toggleModal.bind(this);
            this.handleSubmit= this.handleSubmit.bind(this);
        }
        
        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

        handleSubmit(values){
            this.toggleModal();
            console.log("Current state: " +JSON.stringify(values))
            alert("Submitted: " +JSON.stringify(values))
           
        }

        render(){
            const required=(val) => val &&val.length;
            const maxLength =(len) =>(val) => !(val) || (val.length<=len);
            const minLength = (len) => (val) => val && (val.length >= len);
            return(
            <div>
            <Button  onClick={this.toggleModal}  ><span className="fa fa-comment"></span> Submit Comment</Button>
                <div className="row row-content"> 
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                    <div className="col-12 col-md-12">
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}  >
                            <Row className="form-group " >
                                <Label htmlFor=".rating" >Rating</Label>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                            <option>5</option>
                                            <option>4</option>
                                            <option>3</option>
                                            <option>2</option>
                                            <option>1</option>
                                        </Control.select>
                            </Row>
                            <Row className="form-group " >
                                <Label htmlFor=".name" >Your Name</Label>
                                    <Control.text model=".name" name="name"
                                        className="form-control" placeholder="Your Name" 
                                        validators={{required,minLength:minLength(2), maxLength:maxLength(15)}}>
                                        </Control.text>
                                        <Errors className="text-danger" model=".name" show="touched"
                                        messages={{
                                            required:"Required",
                                            minLength: "Must be greater than 2 characters",
                                            maxLength:"Must be less than 15 characters"
                                        }}
                                        
                                        />
                            </Row>
                            <Row className="form-group " >
                                <Label htmlFor=".comment" >Comment</Label>
                                    <Control.textarea model=".comment" name="comment" rows="6"
                                        className="form-control" >
                                        </Control.textarea>
                            </Row>
                            <Row className="form-group " >
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                            </Row>
                        </LocalForm>
                        </div>
                    </ModalBody>
                    </Modal>
                    
                </div>
            </div>
            );}
    }


export default DishDetail;