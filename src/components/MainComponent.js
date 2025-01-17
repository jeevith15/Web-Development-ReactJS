import React, { Component } from 'react';
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
import About from "./AboutusComponent";
import DishDetail from "./DishdetailComponent";
import Header from './HeaderComponent';
import Footer from "./FooterComponent";
import { Switch, Route, Redirect,withRouter} from "react-router-dom";
import {connect} from "react-redux";
import { addComment,fetchDishes, fetchComments, fetchPromos, fetchLeaders } from "../redux/ActionCreators";
import {actions} from "react-redux-form";

const mapStatetToProps= state =>{
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId,rating,author, comment) => dispatch(addComment(dishId,rating,author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset("feedback"))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: ()  => {dispatch(fetchLeaders())}
});


class Main extends Component {


  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  
  render() {

    const Homepage= () => {
      return(
        <Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}
              promosLoading={this.props.promotions.isLoading}
              promosErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.leaders.filter((leaders)=>leaders.featured)[0]}
              leadersLoading={this.props.leaders.isLoading}
              leadersErrMess={this.props.leaders.errMess}
        />
      );
    }

    const DishWithID=({match})=>{ 
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id===parseInt(match.params.dishId,10))[0]} 
         isLoading={this.props.dishes.isLoading}
         errMess={this.props.dishes.errMess}
         comments={this.props.comments.comments.filter((comment)=> comment.dishId===parseInt(match.params.dishId,10))}
         commentsErrMess={this.props.comments.errMess}
         addComment= {this.props.addComment} />
      );
    }

    return (
      <div >
          <Header/>
          <Switch>
              <Route path="/home" component={Homepage}/>
              <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
              <Route path='/menu/:dishId' component={DishWithID} />
              <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>} />
              <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />}/>
              <Redirect to="/home"/>
              
          </Switch>
          <Footer/>     
      </div>
    );
  }
}

export default withRouter(connect(mapStatetToProps, mapDispatchToProps)(Main));