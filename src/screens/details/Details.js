import React,{ Component } from "react";
import Header from "../../common/header/Header";


class Details extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div>
            <Header
                searchOptions="false"
            />
            My Details Page</div>;
    }
}

export default Details;