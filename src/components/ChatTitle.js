import * as React from 'react';
import withAuthorization from './withAuthorization';

class Title extends React.Component {
    constructor(props) {
        super(props)
this.state={user:this.props.user

}
    }
    render() {
        return (
            <div className="app">
                
            </div>
        )
    }
}

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Title);
    // export default Feed;
