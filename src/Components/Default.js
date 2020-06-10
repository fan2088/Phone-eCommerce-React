import React, { Component } from 'react'

export default class Default extends Component {
    render() {
        return (
            <div name="container">
                <div className="row">
                    <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
                        <h1 className="display-3">404</h1>
                        <h1 className="display-3">Error</h1>
                        <h1 className="display-3">{this.props.location.pathname} Page Not Found</h1>
                    </div>
                </div>
                
            </div>
        )
    }
}
