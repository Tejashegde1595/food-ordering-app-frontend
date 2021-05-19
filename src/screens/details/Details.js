import React,{ Component } from "react";
import Header from "../../common/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent  from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import "@fortawesome/fontawesome-free-solid";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-free-regular";
import "./Details.css";
import Divider from "@material-ui/core/Divider";
import AddIcon from "@material-ui/icons/Add";

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

  minusButtonClickHandler = (item) => {
  }

  cartAddButtonClickHandler = (item) => {
  }

  checkOutButtonClickHandler = () => {
  }

  addButtonClickHandler = (item) => {
  }

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
                {/** Menu and Cart card */}
                {/* Menu and Cart Card Container */}
                <div className="menu-details-cart-container">
                <div className="menu-details">
                    {this.state.categories.map((
                    category //Iterating for each category in the categories array to display each category
                    ) => (
                    <div key={category.id}>
                        <Typography
                        variant="overline"
                        component="p"
                        className={classes.categoryName}
                        >
                        {category.category_name}
                        </Typography>
                        <Divider />
                        {category.item_list.map((
                        item //Iterating over each item to display each items in the category.
                        ) => (
                        <div className="menu-item-container" key={item.id}>
                            <FontAwesomeIcon
                            icon="circle"
                            size="sm"
                            color={
                                item.item_type === "NON_VEG" ? "#BE4A47" : "#5A9A5B"
                            }
                            />
                            <Typography
                            variant="subtitle1"
                            component="p"
                            className={classes.menuItemName}
                            >
                            {item.item_name[0].toUpperCase() +
                                item.item_name.slice(1)}
                            </Typography>
                            <div className="item-price">
                            <FontAwesomeIcon icon="rupee-sign" />
                            <Typography
                                variant="subtitle1"
                                component="p"
                                className={classes.itemPrice}
                            >
                                {item.price.toFixed(2)}
                            </Typography>
                            </div>
                            <IconButton
                            className={classes.addButton}
                            aria-label="add"
                            onClick={() => this.addButtonClickHandler(item)}
                            >
                            <AddIcon />
                            </IconButton>
                        </div>
                        ))}
                    </div>
                    ))}
                </div>
                {/* Cart Card */}
                <div className="my-cart">
                    <Card className={classes.myCart}>
                    <CardHeader
                        avatar={
                        <Avatar
                            aria-label="shopping-cart"
                            className={classes.shoppingCart}
                        >
                            <Badge
                            badgeContent={this.state.cartItems.length}
                            color="primary"
                            showZero={true}
                            invisible={this.state.badgeVisible}
                            className={classes.badge}
                            >
                            <ShoppingCartIcon />
                            </Badge>
                        </Avatar>
                        }
                        title="My Cart"
                        titleTypographyProps={{
                        variant: "h6",
                        }}
                        className={classes.cartHeader}
                    />
                    <CardContent className={classes.cardContent}>
                        {this.state.cartItems.map((
                        cartItem //Iterating over each item in cartItem to show in the cart.
                        ) => (
                        <div className="cart-menu-item-container" key={cartItem.id}>
                            <FontAwesomeIcon
                            icon="stop-circle"
                            style={{
                                color:
                                cartItem.itemType === "NON_VEG"
                                    ? "#BE4A47"
                                    : "#5A9A5B",
                            }}
                            />
                            <Typography
                            variant="subtitle1"
                            component="p"
                            className={classes.menuItemName}
                            id="cart-menu-item-name"
                            >
                            {cartItem.name[0].toUpperCase() + cartItem.name.slice(1)}
                            </Typography>
                            <div className="quantity-container">
                            <IconButton
                                className={classes.cartItemButton}
                                id="minus-button"
                                aria-label="remove"
                                onClick={() => this.minusButtonClickHandler(cartItem)}
                            >
                                <FontAwesomeIcon icon="minus" size="xs" color="black" />
                            </IconButton>
                            <Typography
                                variant="subtitle1"
                                component="p"
                                className={classes.itemQuantity}
                            >
                                {cartItem.quantity}
                            </Typography>
                            <IconButton
                                className={classes.cartItemButton}
                                aria-label="add"
                                onClick={() => this.cartAddButtonClickHandler(cartItem)}
                            >
                                <FontAwesomeIcon icon="plus" size="xs" color="black" />
                            </IconButton>
                            </div>
                            <div className="item-price">
                            <FontAwesomeIcon
                                icon="rupee-sign"
                                style={{ color: "grey" }}
                            />
                            <Typography
                                variant="subtitle1"
                                component="p"
                                className={classes.itemPrice}
                                id="cart-item-price"
                            >
                                {cartItem.totalAmount.toFixed(2)}
                            </Typography>
                            </div>
                        </div>
                        ))}
                        <div className="total-amount-container">
                        <Typography
                            variant="subtitle2"
                            component="p"
                            className={classes.totalAmount}
                        >
                            TOTAL AMOUNT
                        </Typography>
                        <div className="total-price">
                            <FontAwesomeIcon icon="rupee-sign" />
                            <Typography
                            variant="subtitle1"
                            component="p"
                            className={classes.itemPrice}
                            id="cart-total-price"
                            >
                            {this.state.totalAmount.toFixed(2)}
                            </Typography>
                        </div>
                        </div>
                        <Button
                        variant="contained"
                        color="primary"
                        fullWidth={true}
                        className={classes.checkOutButton}
                        onClick={this.checkOutButtonClickHandler}
                        >
                        CHECKOUT
                        </Button>
                    </CardContent>
                    </Card>
                </div>
                </div>
                {/** Item cards **/}
              

            </div>
        )
    }
}

export default withStyles(styles)(Details);