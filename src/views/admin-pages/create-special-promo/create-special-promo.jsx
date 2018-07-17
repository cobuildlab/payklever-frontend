import React, { Component } from 'react';
import { SubNav, Loading, UserItem } from '../../components';
import { CreateSpecialPromoForm } from './create-special-promo.classes';
import * as createSpecialPromoActions from './create-special-promo.actions';
import { createSpecialPromoAvForm } from './create-special-promo.validators';
import { promotionStore } from '../../../stores';
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import {
  I18n
} from 'react-i18next';
import {
  Container,
  Col,
  Row,
  Label,
  Button,
  FormGroup,
} from 'reactstrap';
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from 'availity-reactstrap-validation';
import { Link } from "react-router-dom";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

class CreateSpecialPromo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loadingI18n: '',
      isLoadingUsers: false,
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      amount: '',
      userId: [],
      users: [],
    }
  }

  componentDidMount() {
    this.createSpecialPromoSubscription = promotionStore
      .subscribe('createSpecialPromo', (promotion) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('CREATE_PROMOTION.promotionCreated'));
        this.props.history.push('/admin/campaign-manager/promotions');
      });

    this.searchUsersSubscription = promotionStore
      .subscribe('searchUsers', (users) => {
        this.setState({ users, isLoadingUsers: false });
      });

    this.promotionStoreError = promotionStore
      .subscribe('PromotionStoreError', (err) => {
        this.isLoading(false);
        toast.dismiss();
        toast.error(err.message || i18next.t('FETCH.error'));
      });
  }

  componentWillUnmount() {
    this.createSpecialPromoSubscription.unsubscribe();
    this.searchUsersSubscription.unsubscribe();
    this.promotionStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>
      <SubNav backRoute="/admin/campaign-manager/promotions" subNavTitle={t('CREATE_PROMOTION.createSpecialPromotion')}></SubNav>

      <Loading isLoading={this.state.loading} loadingMessage={ t(this.state.loadingI18n) }></Loading>

        <Container className="mt-4">
          <Row>
            <Col md={{
                size: 6,
                offset: 3
              }}>

          <AvForm onValidSubmit={(evt) => this.createPromotion(evt)} noValidate>

            <AvGroup>
              <Label for="name">{ t('CREATE_PROMOTION.promotionName') }</Label>
              <AvInput type="text" name="name" id="name" placeholder={ t('CREATE_PROMOTION.promotionName') } value={this.state.name} onChange={(evt) => this.setState({name: evt.target.value})} validate={createSpecialPromoAvForm.name}/>
              <AvFeedback>{ t('CREATE_PROMOTION.invalidName') }</AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label for="description">
                { t('CREATE_PROMOTION.description') }
              </Label>
              <AvInput style={{height: 'auto'}} type="textarea" name="description" id="description" placeholder={ t('CREATE_PROMOTION.description') } value={this.state.description} onChange={(evt) => this.setState({description: evt.target.value})} validate={createSpecialPromoAvForm.description}/>
              <AvFeedback>{ t('CREATE_PROMOTION.invalidDescription') }</AvFeedback>
            </AvGroup>

            <Row>
              <Col md={{size: 6}}>
                <AvGroup>
                  <Label for="startDate">{ t('CREATE_PROMOTION.startDate') }</Label>
                  <AvInput value={this.state.startDate} onChange={(evt) => this.setState({startDate: evt.target.value})} type="date" name="startDate" id="startDate" placeholder={ t('CREATE_PROMOTION.startDate') } validate={createSpecialPromoAvForm.startDate}/>
                  <AvFeedback>
                    { t('CREATE_PROMOTION.invalidStartDate') }
                  </AvFeedback>
                </AvGroup>
              </Col>

              <Col md={{size: 6}}>
                <AvGroup>
                  <Label for="endDate">{ t('CREATE_PROMOTION.endDate') }</Label>
                  <AvInput value={this.state.endDate} onChange={(evt) => this.setState({endDate: evt.target.value})} type="date" name="endDate" id="endDate" placeholder={ t('CREATE_PROMOTION.endDate') } validate={createSpecialPromoAvForm.endDate}/>
                  <AvFeedback>
                    { t('CREATE_PROMOTION.invalidEndDate') }
                  </AvFeedback>
                </AvGroup>
              </Col>
            </Row>

            <AvGroup>
              <Label for="amount">{ t('CREATE_PROMOTION.amount') }</Label>
              <AvInput type="text" name="amount" id="amount" placeholder={ t('CREATE_PROMOTION.amount') } value={this.state.amount} onChange={(evt) => this.setState({amount: evt.target.value})} validate={createSpecialPromoAvForm.amount}/>
              <AvFeedback>{ t('CREATE_PROMOTION.invalidAmount') }</AvFeedback>
            </AvGroup>

            <FormGroup>
              <Label for="users">{ t('CREATE_PROMOTION.users') }</Label>
              <AsyncTypeahead
                isLoading={this.state.isLoadingUsers}
                multiple={true}
                flip={true}
                minLength={2}
                options={this.state.users}
                onChange={(items) => this.setState({userId: items})}
                onSearch={this._handleSearch}
                labelKey="email"
                filterBy={['firstName', 'lastName', 'email']}
                searchText={t('CREATE_PROMOTION.searchingUsers')}
                promptText={t('CREATE_PROMOTION.searchForUsers')}
                emptyLabel={t('CREATE_PROMOTION.emptyLabel')}
                placeholder={t('CREATE_PROMOTION.searchForUsers')}
                renderMenuItemChildren={(option, props) => (
                  <UserItem user={option}></UserItem>
                )}
              />
            </FormGroup>

          <div className="text-center mb-4">
            <Link to="/admin/campaign-manager/promotions">
              <Button className="mr-3 mt-4" color="danger" type="button">
              { t('CREATE_PROMOTION.cancel') }
              </Button>
            </Link>
            <Button type="submit" className="mt-4" color="primary">
            { t('CREATE_PROMOTION.createPromotion') }
            </Button>
          </div>

          </AvForm>
          </Col>
        </Row>
      </Container>
    </div>)}</I18n>);
  }

  createPromotion(evt) {
    this.isLoading(true, 'CREATE_PROMOTION.creatingPromotion');

    const createSpecialPromoForm = new CreateSpecialPromoForm(
      this.state.name || undefined,
      this.state.description || null,
      this.state.startDate || undefined,
      this.state.endDate || undefined,
      this.state.amount || undefined,
      JSON.stringify(this.state.userId.map((user) => Number(user.id))),
    );

    createSpecialPromoActions.createSpecialPromo(createSpecialPromoForm);
  }

  isLoading = (isLoading, loadingI18n = this.state.loadingI18n) => {
    this.setState({
      loadingI18n,
      loading: isLoading
    });
  }

  _handleSearch = (query) => {
    this.setState({ isLoadingUsers: true });

    createSpecialPromoActions.searchUsers(query);
  }
}

export default CreateSpecialPromo;
