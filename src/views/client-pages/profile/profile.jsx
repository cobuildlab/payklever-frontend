import React, { Component } from 'react';
import { SubNav, Loading } from '../../components';
import {
  authStore,
} from '../../../stores';
import { Accounts, PaymentMethods, Invoices } from '../';
import {
  Route,
  Link,
  Redirect,
  Switch,
} from "react-router-dom";
import {
  I18n
} from 'react-i18next';
import {
  Container,
  Col,
  Row,
  Nav,
  NavLink,
  NavItem,
  Media,
} from 'reactstrap';
import { Avatar } from '../../../assets';
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import * as profileActions from './profile.actions';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loadingI18n: '',
      user: authStore.getUser(),
      imagePath: '',
    };
  }

  componentDidMount() {
    this.editPhotoSubscription = authStore
      .subscribe('editPhoto', (user) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('PROFILE.photoUploaded'));
        this.setUser(user.profileUrl);
      });

    this.setUserSubscription = authStore
      .subscribe('setUser', (user) => {
        if (user) this.setState({ user });
      });

    this.authStoreError = authStore.subscribe('AuthStoreError', (err) => {
      this.isLoading(false);
      this.setState({ imagePath: '' });
      toast.dismiss();
      toast.error(err.message || i18next.t('FETCH.error'));
    });
  }

  componentWillUnmount() {
    this.editPhotoSubscription.unsubscribe();
    this.setUserSubscription.unsubscribe();
    this.authStoreError.unsubscribe();
  }

  render() {
    if (this.props.match.isExact) {
      return <Redirect to="/client/profile/accounts" />
    }

    return (<I18n>{(t, { i18n }) => (
      <div>
        <SubNav backRoute="/client/campaigns" subNavTitle={t('PROFILE.profile')}
        navItemTitle={t('PROFILE.editProfile')} navItemFunc={this.goToEditProfile}></SubNav>

        <Loading isLoading={this.state.loading} loadingMessage={ t(this.state.loadingI18n) }></Loading>

       <Container className="mt-4">
         <Row>
           <Col md={{ size: 12,}}>
             {this.state.user && (
               <Container>
                 <Media>
                    <Media left>
                      <form id="photoForm">
                        <label title={ t('PROFILE.changePhoto') } className="img-profile App-cursor-pointer" style={{ backgroundImage: `url(${ this.state.imagePath || this.state.user.profileUrl || Avatar })`}}>
                          <input type="file" name="photo" onChange={(e) => this.handleFile(e)} accept="image/jpeg, image/png"  className="invisible"/>
                        </label>
                      </form>
                      <Media  className="mr-3" alt="Profile" />
                      </Media>
                    <Media className="mt-3" body>
                      <Media heading style={{margin: 0}}>
                        <span>
                          { `${t('PROFILE.nameAndSurname')}:` }
                        </span>
                      </Media>
                      <span>
                        {` ${this.state.user.firstName} ${this.state.user.lastName}`}
                      </span>
                      <Media heading style={{margin: 0}}>
                        <span>
                          { `${t('PROFILE.email')}:` }
                        </span>
                      </Media>
                      <span>{this.state.user.email}</span>
                    </Media>
                  </Media>
               </Container>
             )}
           </Col>
         </Row>
         <Nav tabs className="nav mt-4">
          <NavItem className="App-tabs-33">
            <NavLink tag={Link} to="/client/profile/accounts" active={(this.props.location.pathname === '/client/profile/accounts')}>
              { t('PROFILE.accounts') }
            </NavLink>
          </NavItem>
          <NavItem className="App-tabs-33">
            <NavLink tag={Link} to="/client/profile/payment-methods" active={(this.props.location.pathname === '/client/profile/payment-methods')}>
              { t('PROFILE.paymentMethods') }
            </NavLink>
          </NavItem>
          <NavItem className="App-tabs-33">
            <NavLink tag={Link} to="/client/profile/invoices" active={(this.props.location.pathname === '/client/profile/invoices')}>
              { t('PROFILE.invoices') }
            </NavLink>
          </NavItem>
        </Nav>

        <Switch>
          <Route exact path="/client/profile/accounts" component={Accounts}/>
          <Route exact path="/client/profile/payment-methods" component={PaymentMethods}/>
          <Route exact path="/client/profile/invoices" component={Invoices}/>
          <Redirect to='/client/profile/accounts'/>
        </Switch>

       </Container>
      </div>
    )}</I18n>);
  }

  goToEditProfile = () => {
    this.props.history.push(`/client/edit-profile`);
  }

  handleFile = (event) => {
    if (!event.target.files.length) return;

    const file = event.target.files[0];
    const image = new Image();
    const form = document.getElementById("photoForm");
    const formData = new FormData(form);
    event.target.value = '';
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      this.setState({
        imagePath: image.src,
      });

      this.uploadPhoto(formData);
    };
  }

  /*
  update the store's user
   */
  setUser(profileUrl) {
    setTimeout(() => {
      const user = this.state.user;
      user.profileUrl = profileUrl;
      profileActions.setUser(user);
    });
  }

  uploadPhoto(formData) {
    this.isLoading(true, 'PROFILE.uploadingPhoto');
    const userId = parseInt(this.state.user.id, 10);
    profileActions.editPhoto(formData, userId);
  }

  isLoading = (isLoading, loadingI18n = this.state.loadingI18n) => {
    this.setState({
      loadingI18n,
      loading: isLoading
    });
  }
}

export default Profile;
