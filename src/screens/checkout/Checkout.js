import React, { Component } from "react";
import "./Checkout.css";
import Header from "../../common/header/Header";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import { withStyles, Tabs, Tab } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const styles = (theme) => ({
  stepper: {
    "padding-top": "0px",
    "@media (max-width:600px)": {
      padding: "0px",
    },
  },
});

const TabContainer = function(props) {
  return (
    <Typography className={props.className} component="dev">
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
    };
  }

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
                          <TabContainer></TabContainer>
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
