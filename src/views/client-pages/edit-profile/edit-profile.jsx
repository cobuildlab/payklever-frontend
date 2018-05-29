import React, { Component } from 'react';
import {
  I18n
} from 'react-i18next';
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import { authStore } from '../../../stores';
import { Link } from 'react-router-dom';
import { Loading, SubNav } from '../../components';
import {
  Container,
  Col,
  Row,
  Button,
  Label
} from 'reactstrap';
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from 'availity-reactstrap-validation';
import * as editProfileActions from './edit-profile.actions';
import { editProfileAvForm } from './edit-profile.validators';
import { EditProfileForm } from './edit-profile.classes';

class EditProfile extends Component {

  constructor() {
    super();
    this.state = {
      user: authStore.getUser(),
      loading: false,
      loadingI18n: '',
      firstName: authStore.getUser().firstName || '',
      lastName: authStore.getUser().lastName || '',
      password: '',
      repeatPassword: ''
    };
  }

  componentDidMount() {
    this.editProfileSubscription = authStore
      .subscribe('editProfile', (user) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('EDIT_PROFILE.profileUpdated'));
        this.setUser(user);
      });

    this.setUserSubscription = authStore
      .subscribe('setUser', (user) => {
        if (user) this.props.history.push('/client/profile/accounts');
      });

    this.authStoreError = authStore.subscribe('AuthStoreError', (err) => {
      this.isLoading(false);
      toast.dismiss();
      toast.error(err.message || i18next.t('FETCH.error'));
    });
  }

  componentWillUnmount() {
    this.editProfileSubscription.unsubscribe();
    this.setUserSubscription.unsubscribe();
    this.authStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>

      <SubNav backRoute="/client/profile/accounts" subNavTitle={t('EDIT_PROFILE.editProfile')}></SubNav>

      <Loading isLoading={this.state.loading} loadingMessage={ t(this.state.loadingI18n) }></Loading>

      <Container className="mt-4">
        <Row>
          <Col md={{
              size: 6,
              offset: 3
            }}>
        <AvForm onValidSubmit={this.editProfile} noValidate>
          <AvGroup>
            <Label for="firstName">{ t('SIGNUP.firstName') }</Label>
            <AvInput type="text" name="firstName" id="firstName" placeholder={ t('SIGNUP.firstName') } value={this.state.firstName} onChange={(evt) => this.setState({firstName: evt.target.value})} validate={editProfileAvForm.firstName}/>
            <AvFeedback>{t('SIGNUP.invalidFirstName')}</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label for="lastName">{ t('SIGNUP.lastName') }</Label>
            <AvInput type="text" name="lastName" id="lastName" placeholder={ t('SIGNUP.lastName') } value={this.state.lastName} onChange={(evt) => this.setState({lastName: evt.target.value})} validate={editProfileAvForm.lastName}/>
            <AvFeedback>{ t('SIGNUP.invalidLastName') }</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label for="password">{ t('SIGNUP.password') }</Label>
            <AvInput type="password" name="password" id="password" placeholder={ t('SIGNUP.password') } value={this.state.password} onChange={(evt) => this.setState({password: evt.target.value})} validate={editProfileAvForm.password}/>
            <AvFeedback>{ t('SIGNUP.invalidPassword') }</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label for="repeatPassword">{ t('SIGNUP.repeatPassword') }</Label>
            <AvInput type="password" name="repeatPassword" id="repeatPassword" placeholder={ t('SIGNUP.repeatPassword') } value={this.state.repeatPassword}  onChange={(evt) => this.setState({repeatPassword: evt.target.value})} validate={editProfileAvForm.repeatPassword} required={this.state.password ? true : false}/>
            <AvFeedback>{ t('SIGNUP.passwordNotMatch') }</AvFeedback>
          </AvGroup>

            <div className="text-center mb-4">
              <Link to="/client/profile/accounts">
                <Button className="mr-3 mt-4" color="danger" type="button">
                { t('EDIT_PROFILE.cancel') }
                </Button>
              </Link>
              <Button type="submit" className=" mt-4" color="primary">
              { t('EDIT_PROFILE.editProfile') }
              </Button>
            </div>

        </AvForm>
        </Col>
      </Row>
    </Container>
  </div>)}</I18n>)
  }

  editProfile = () => {
    this.isLoading(true, 'EDIT_PROFILE.updatingProfile');

    const userId = parseInt(this.state.user.id, 10);
    const editProfileForm = new EditProfileForm(
      this.state.firstName,
      this.state.lastName,
      this.state.password || undefined,
    );

    editProfileActions.editProfile(editProfileForm, userId);
  }

  /*
  update the store's user
   */
  setUser(newUser) {
    setTimeout(() => {
      const user = this.state.user;
      user.firstName = newUser.firstName;
      user.lastName = newUser.lastName;
      editProfileActions.setUser(user);
    });
  }

  isLoading = (isLoading, loadingI18n = this.state.loadingI18n) => {
    this.setState({
      loadingI18n,
      loading: isLoading
    });
  }
}

export default EditProfile;
