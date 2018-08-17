import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-i18next';
import { Media } from 'reactstrap';
import { Avatar } from '../../../assets';

class UserItem extends Component {

  render() {
    return (<I18n>{(t, { i18n }) => (
      <div>
        <Media>
           <img width="48" height="48" className="mr-3" src={this.props.user.profileUrl || Avatar} alt="profile"/>
           <Media body>
             <div style={{margin: 0}}>
               {` ${this.props.user.firstName} ${this.props.user.lastName}`}
             </div>
             <div style={{margin: 0}}>
               {this.props.user.email}
             </div>
           </Media>
         </Media>
      </div>
    )}</I18n>);
  }
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
