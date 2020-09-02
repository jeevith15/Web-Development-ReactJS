import React , { Component} from "react";
import {Card, CardImg, CardImgOverlay,CardText,CardBody,CardTitle} from 'reactstrap';
import { DISHES } from "../shared/dishes";

class DishDetail extends Component{

    constructor(props){
        super(props);
        
        this.state={
            
        };
    }

    renderDish(dish){
        if(dish != null){           
            return(
                    <div className="col-12 col-md-5 m-1">
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
        else{
            return(
                <div></div>
            );
        }
    }

    renderComments(commentsArr){

        const commentslist= commentsArr.map(commentsArr =>{
            return (
                <li key={commentsArr.id} >
                    <p>{commentsArr.comment} </p>
                        <p>-- {commentsArr.author} ,  
                        {new Intl.DateTimeFormat('en-US', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'

                    }).format(new Date(commentsArr.date))}</p>
                </li>
            );

        })

        return(
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {commentslist}
                </ul>
                </div>  
        );
    };


    render() {
        const dish=this.props.dish;
        if (dish == null) {
            return (<div></div>)
        }
        const dishID = this.renderDish(dish);
        const comments= this.renderComments(dish.comments);
        return(
                <div className="row">
                    {dishID}
                    {comments}
                </div>
        );
    };
}

export default DishDetail;