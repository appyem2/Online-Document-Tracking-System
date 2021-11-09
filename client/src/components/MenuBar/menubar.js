import React from "react";

class MenuBar extends React.Component {
        render() {
                return(
                        <div className="col-3" id="left-menu-bar">
                                <div className="row text-center">
                                        <img src="assets/images/iiest-logo.png" alt="IIEST-Logo"></img>
                                        <h6>Online Document Tracking System</h6>
                                </div>
                                <div className="row text-center">
                                     <div className="col-12">
                                        <p>Pending</p>
                                        <p>Forwarded</p>
                                        <p>Drafts</p>
                                        <p>Authored</p>
                                        <p>Resolved</p>
                                        <p>All Documents</p>
                                     </div>   
                                </div>
                        </div>

                );
        }
}

export default MenuBar;