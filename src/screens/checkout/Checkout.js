import React, { Component } from "react";
import "./Checkout.css";
import Header from "../../common/header/Header";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import { withStyles, Tabs, Tab, IconButton } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const styles = (theme) => ({
  stepper: {
    "padding-top": "0px",
    "@media (max-width:600px)": {
      padding: "0px",
    },
  },

  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },

  addressCheckButton: {
    float: "right",
  },
});

const TabContainer = function(props) {
  return (
    <Typography className={props.className} component="div">
      {props.children}
    </Typography>
  );
};
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      steps: ["Delivery", "Payment"],
      value: 0,
      addresses: [],
      noOfColumn: 3,
      accessToken: sessionStorage.getItem("access-token"),
      selectedAddress: "",
      flatBuildingName: "",
      flatBuildingNameRequired: "dispNone",
      locality: "",
      localityRequired: "dispNone",
      city: "",
      cityRequired: "dispNone",
      selectedState: "",
      stateRequired: "dispNone",
      pincode: "",
      pincodeRequired: "dispNone",
      pincodeHelpText: "dispNone",
      states: [],
    };
  }

  componentDidMount() {
    this.getAllAddress();

    let statesData = null;
    let xhrStates = new XMLHttpRequest();
    let that = this;
    xhrStates.addEventListener("readystatechange", function() {
      if (xhrStates.readyState === 4 && xhrStates.status === 200) {
        let states = JSON.parse(xhrStates.responseText).states;
        that.setState({
          ...that.state,
          states: states,
        });
      }
    });
    xhrStates.open("GET", this.props.baseUrl + "states");
    xhrStates.send(statesData);
  }

  getAllAddress = () => {
    let data = null;
    let that = this;
    let xhrAddress = new XMLHttpRequest();

    xhrAddress.addEventListener("readystatechange", function() {
      if (xhrAddress.readyState === 4 && xhrAddress.status === 200) {
        let responseAddresses = JSON.parse(xhrAddress.responseText).addresses;
        let addresses = [];
        responseAddresses.forEach((responseAddress) => {
          let address = {
            id: responseAddress.id,
            city: responseAddress.city,
            flatBuildingName: responseAddress.flat_building_name,
            locality: responseAddress.locality,
            pincode: responseAddress.pincode,
            state: responseAddress.state,
            selected: false,
          };
          addresses.push(address);
        });
        that.setState({
          ...that.state,
          addresses: addresses,
        });
      }
    });

    xhrAddress.open("GET", this.props.baseUrl + "address/customer");
    xhrAddress.setRequestHeader(
      "authorization",
      "Bearer " + this.state.accessToken
    );
    xhrAddress.send(data);
  };

  tabsChangeHandler = (event, value) => {
    this.setState({
      value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Header baseUrl={this.props.baseUrl} showHeaderSearchBox={false} />
        <div className="checkout-container">
          <div className="stepper-container">
            <Stepper
              activeStep={this.state.activeStep}
              orientation="vertical"
              className={classes.stepper}
            >
              {this.state.steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel key={label}></StepLabel>
                  <StepContent>
                    {index === 0 ? (
                      <div className="address-container">
                        <Tabs
                          className="address-tabs"
                          value={this.state.value}
                          onChange={this.tabsChangeHandler}
                        >
                          <Tab label="EXISTING ADDRESS" />
                          <Tab label="NEW ADDRESS" />
                        </Tabs>
                        {this.state.value === 0 && (
                          <TabContainer>
                            {this.state.addresses.length !== 0 ? (
                              <GridList
                                className={classes.gridList}
                                cols={this.state.noOfColumn}
                                spacing={2}
                                cellHeight="auto"
                              >
                                {this.state.addresses.map((address) => (
                                  <GridListTile
                                    className={classes.gridListTile}
                                    key={address.id}
                                    style={{
                                      borderColor: address.selected
                                        ? "rgb(224,37,96)"
                                        : "white",
                                    }}
                                  >
                                    <div className="grid-list-tile-container">
                                      <Typography variant="body1" component="p">
                                        {address.flatBuildingName}
                                      </Typography>
                                      <Typography variant="body1" component="p">
                                        {address.locality}
                                      </Typography>
                                      <Typography variant="body1" component="p">
                                        {address.city}
                                      </Typography>
                                      <Typography variant="body1" component="p">
                                        {address.state.state_name}
                                      </Typography>
                                      <Typography variant="body1" component="p">
                                        {address.pincode}
                                      </Typography>
                                      <IconButton
                                        className={classes.addressCheckButton}
                                      >
                                        <CheckCircleIcon
                                          style={{
                                            color: address.selected
                                              ? "green"
                                              : "grey",
                                          }}
                                        />
                                      </IconButton>
                                    </div>
                                  </GridListTile>
                                ))}
                              </GridList>
                            ) : (
                              <Typography variant="body1" component="p">
                                There are no saved addresses! You can save an
                                address using the 'New Address' tab or using
                                your ‘Profile’ menu option.
                              </Typography>
                            )}
                          </TabContainer>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Checkout);
