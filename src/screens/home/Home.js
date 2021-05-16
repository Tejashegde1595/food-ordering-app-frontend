import React, {Component} from "react";
import Header from "../../common/header/Header";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div>
            <Header
                searchOptions="true"
            />
            My Home Page</div>;
    }
}

export default Profile;
