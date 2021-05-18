import React,{ Component } from "react";
import Header from "../../common/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import "@fortawesome/fontawesome-free-solid";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-free-regular";
import "./Details.css";

const styles = (theme) => ({
    textRatingCost: {
      "text-overflow": "clip",
      width: "145px",
      color: "grey",
    },
    restaurantName: {
      padding: "8px 0px 8px 0px",
      "font-size": "30px",
    },
    restaurantCategory: {
      padding: "8px 0px 8px 0px",
    },
    avgCost: {
      "padding-left": "5px",
    },
    itemPrice: {
      "padding-left": "5px",
    },
    addButton: {
      "margin-left": "25px",
    },
    menuItemName: {
      "margin-left": "20px",
    },
  
    shoppingCart: {
      color: "black",
      "background-color": "white",
      width: "60px",
      height: "50px",
      "margin-left": "-20px",
    },
    cartHeader: {
      "padding-bottom": "0px",
      "margin-left": "10px",
      "margin-right": "10px",
    },
    cartItemButton: {
      padding: "10px",
      "border-radius": "0",
      color: "#fdd835",
      "&:hover": {
        "background-color": "#ffee58",
      },
    },
    cardContent: {
      "padding-top": "0px",
      "margin-left": "10px",
      "margin-right": "10px",
    },
    totalAmount: {
      "font-weight": "bold",
    },
    checkOutButton: {
      "font-weight": "400",
    },
  });

class Details extends Component{
    constructor(props) {
        super(props);
        this.state = {
            restaurantDetails: [],
            categories: [],
            cartItems: [],
            totalAmount: 0,
            snackBarOpen: false,
            snackBarMessage: "",
            badgeVisible: false,
          };
    }

    componentDidMount() {
        let data = null;
        let that = this;
        let xhrRestaurantDetails = new XMLHttpRequest();
    
        xhrRestaurantDetails.addEventListener("readystatechange", function() {
          if (
            xhrRestaurantDetails.readyState === 4 &&
            xhrRestaurantDetails.status === 200
          ) {
            let response = JSON.parse(xhrRestaurantDetails.responseText);
            let categoriesName = [];
            //Creating array of category.
            response.categories.forEach((category) => {
              categoriesName.push(category.category_name);
            });
            //Creating Restaurant object containing relevant details.
            let restaurantDetails = {
              id: response.id,
              name: response.restaurant_name,
              photoURL: response.photo_URL,
              avgCost: response.average_price,
              rating: response.customer_rating,
              noOfCustomerRated: response.number_customers_rated,
              locality: response.address.locality,
              categoriesName: categoriesName.toString(),
            };
            let categories = response.categories;
            that.setState({
              ...that.state,
              restaurantDetails: restaurantDetails,
              categories: categories,
            });
          }
        });
    
        xhrRestaurantDetails.open(
          "GET",
          this.props.baseUrl + "restaurant/" + this.props.match.params.id
        );
        xhrRestaurantDetails.send(data);
    }
    
  changeVisibility = () => {
    this.setState({
      ...this.state,
      badgeVisible: !this.state.badgeVisible,
    });
  };


    render() {
        const { classes } = this.props;
        return(
            <div>
              
                <Header
                  baseUrl={this.props.baseUrl}
                  searchOptions="false"
                  changeBadgeVisibility={this.changeVisibility}
                />
                <div className="restaurant-details-container">
                  <div>
                    <img
                      src={this.state.restaurantDetails.photoURL}
                      alt="Restaurant"
                      height="215px"
                      width="275px"
                    />
                  </div>
                  <div className="restaurant-details">
                    <div className="restaurant-name">
                      <Typography
                        variant="h5"
                        component="h5"
                        className={classes.restaurantName}
                      >
                        {this.state.restaurantDetails.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        component="p"
                        className={classes.restaurantLocation}
                      >
                        {this.state.restaurantDetails.locality}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        component="p"
                        className={classes.restaurantCategory}
                      >
                        {this.state.restaurantDetails.categoriesName}
                      </Typography>
                    </div>
                    <div className="restaurant-rating-cost-container">
                      <div className="restaurant-rating-container">
                        <div className="restaurant-rating">
                          <FontAwesomeIcon icon="star" size="sm" color="black" />
                          <Typography variant="subtitle1" component="p">
                            {this.state.restaurantDetails.rating}
                          </Typography>
                        </div>
                        <Typography
                          variant="caption"
                          component="p"
                          className={classes.textRatingCost}
                        >
                          AVERAGE RATING BY{" "}
                          {
                            <span className="restaurant-NoOfCustomerRated">
                              {this.state.restaurantDetails.noOfCustomerRated}
                            </span>
                          }{" "}
                          CUSTOMERS
                        </Typography>
                      </div>
                      <div className="restaurant-avg-cost-container">
                        <div className="restaurant-avg-cost">
                          <FontAwesomeIcon icon="rupee-sign" />
                          <Typography
                            variant="subtitle1"
                            component="p"
                            className={classes.avgCost}
                          >
                            {this.state.restaurantDetails.avgCost}
                          </Typography>
                        </div>
                        <Typography
                          variant="caption"
                          component="p"
                          className={classes.textRatingCost}
                        >
                          AVERAGE COST FOR TWO PEOPLE
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Details);