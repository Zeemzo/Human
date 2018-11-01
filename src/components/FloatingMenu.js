import * as React from "react";
import withAuthorization from "./withAuthorization";
import {Link} from 'react-router-dom'
import * as routes from "../constants/routes";
import SignOutButton from "./SignOut";
import { auth } from "../firebase";

class FloatingMenuItem extends React.Component {

    handleClick() {
        this.props.action();
    }

    render() {
        let buttonStyle = {
            backgroundImage: `url(${this.props.icon})`
        }

        let label;

        if (this.props.label) {
            label = <label>{this.props.label}</label>;
        }

        return <div 
            onClick={this.handleClick.bind(this)}
            className="floating-menu-item">
            {label}
            <div id={"imagepress"} className="floating-menu-icon"><i className="material-icons" >{this.props.icon}</i></div>
        </div>;
    }
}



class FloatingMenu extends React.Component {
    constructor() {
        super();

        this.state = {
            toggled: false
        }
    }

    toggleMenu() {
        this.setState({ toggled: !this.state.toggled });
    }


    render() {
        let buttons = [];
        let className = "floating-menu";
        let icon = "+";

        buttons.push(<FloatingMenuItem  label="" icon={icon} action={this.toggleMenu.bind(this)} key="m" />);

        return <div className="container">
            <div  className={className}>
                {buttons}
            </div>
        </div>;
    }
}
const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(FloatingMenu);
