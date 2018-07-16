import React, { Component } from 'react';
import { SubNav, Loading } from '../../components';
import { CreateCouponPromoForm } from './create-coupon-promo.classes';
import * as createCouponPromoActions from './create-coupon-promo.actions';
import { createCouponPromoAvForm } from './create-coupon-promo.validators';
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
} from 'reactstrap';
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from 'availity-reactstrap-validation';
import { Link } from "react-router-dom";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

class CreateCouponPromo extends Component {
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
      type: '',
      types: ['sc', 'ac'],
      userId: [],
      users: [],
    }
  }

  componentDidMount() {
    this.createCouponPromoSubscription = promotionStore
      .subscribe('createCouponPromo', (promotion) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('CREATE_PROMOTION.promotionCreated'));
        this.props.history.push('/admin/promotions');
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
    this.createCouponPromoSubscription.unsubscribe();
    this.searchUsersSubscription.unsubscribe();
    this.promotionStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>
      <SubNav backRoute="/admin/promotions" subNavTitle={t('CREATE_PROMOTION.createPromotion')}></SubNav>

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
              <AvInput type="text" name="name" id="name" placeholder={ t('CREATE_PROMOTION.promotionName') } value={this.state.name} onChange={(evt) => this.setState({name: evt.target.value})} validate={createCouponPromoAvForm.name}/>
              <AvFeedback>{ t('CREATE_PROMOTION.invalidName') }</AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label for="description">
                { t('CREATE_PROMOTION.description') }
              </Label>
              <AvInput type="text" name="description" id="description" placeholder={ t('CREATE_PROMOTION.description') } value={this.state.description} onChange={(evt) => this.setState({description: evt.target.value})} validate={createCouponPromoAvForm.description}/>
              <AvFeedback>{ t('CREATE_PROMOTION.invalidDescription') }</AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label for="startDate">{ t('CREATE_PROMOTION.startDate') }</Label>
              <AvInput value={this.state.startDate} onChange={(evt) => this.setState({startDate: evt.target.value})} type="date" name="startDate" id="startDate" placeholder={ t('CREATE_PROMOTION.startDate') } validate={createCouponPromoAvForm.startDate}/>
              <AvFeedback>
                { t('CREATE_PROMOTION.invalidStartDate') }
              </AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label for="endDate">{ t('CREATE_PROMOTION.endDate') }</Label>
              <AvInput value={this.state.endDate} onChange={(evt) => this.setState({endDate: evt.target.value})} type="date" name="endDate" id="endDate" placeholder={ t('CREATE_PROMOTION.endDate') } validate={createCouponPromoAvForm.endDate}/>
              <AvFeedback>
                { t('CREATE_PROMOTION.invalidEndDate') }
              </AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label for="amount">{ t('CREATE_PROMOTION.amount') }</Label>
              <AvInput type="text" name="amount" id="amount" placeholder={ t('CREATE_PROMOTION.amount') } value={this.state.amount} onChange={(evt) => this.setState({amount: evt.target.value})} validate={createCouponPromoAvForm.amount}/>
              <AvFeedback>{ t('CREATE_PROMOTION.invalidAmount') }</AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label for="type">{ t('CREATE_PROMOTION.type') }</Label>
              <AvInput onChange={(evt) => this.setState({type: evt.target.value})} value={this.state.type} type="select" name="type" label={ t('CREATE_PROMOTION.type') } validate={createCouponPromoAvForm.type}>
                {!this.state.type && <option value="" disabled>
                  { t('CREATE_PROMOTION.selectType') }
                </option>}
                {this.state.types.map((type, index) =>
                  <option key={index} value={type}>{t(`PROMOTION_TYPES.${type}`)}</option>
                )}
              </AvInput>
              <AvFeedback>{ t('CREATE_PROMOTION.invalidType') }</AvFeedback>
            </AvGroup>

            <AvGroup>
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
                  <span key={option.id}>
                    {`${option.firstName} ${option.lastName} (${option.email})`}
                  </span>
                )}
              />
            </AvGroup>

          <div className="text-center mb-4">
            <Link to="/admin/promotions">
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

    const createCouponPromoForm = new CreateCouponPromoForm(
      this.state.name || undefined,
      this.state.description || undefined,
      this.state.startDate || undefined,
      this.state.endDate || undefined,
      this.state.amount || undefined,
      this.state.type || undefined,
      JSON.stringify(this.state.userId.map((user) => Number(user.id))),
    );

    createCouponPromoActions.createCouponPromo(createCouponPromoForm);
  }

  isLoading = (isLoading, loadingI18n = this.state.loadingI18n) => {
    this.setState({
      loadingI18n,
      loading: isLoading
    });
  }

  _handleSearch = (query) => {
    this.setState({ isLoadingUsers: true });

    createCouponPromoActions.searchUsers(query);
  }
}

export default CreateCouponPromo;
