import React, { Component } from 'react';

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class Box extends Component {

    render() {
        
        let classes = this.props.isHidden ? "hidden" : this.props.isMaximized ? "w-full shadow resize-y bg-orange maximized " + this.props.className : "w-4/5 mx-6 my-2 shadow-lg resize-y bg-orange ";
        let icon = this.props.isMaximized ? "fa fa-window-restore" : "fa fa-window-maximize"

        return(
            <div className={classes}>
                <div className="w-full h-8 p-2 flex items-center justify-between shadow bg-orange-dark">
                    <span className="text-orange-darkest"><h2>{capitalize(this.props.name)}</h2></span>
                    <span className="" onClick={() => this.props.onToggle(this.props.name)}><i className={icon}></i></span>
                </div>
                {this.props.children}
            </div>
        );
    }

}

Box.defaultProps = {
    name: '',
    state: {
        isMaximized: false,
        isHidden: false
    },
    onToggle: null
}

export default Box;