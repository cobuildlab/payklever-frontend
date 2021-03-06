import React, { Component } from 'react';
import {
  Link,
} from "react-router-dom";
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import { promotionStore } from '../../../stores';
import * as promotionsActions from './promotions.actions';
import {
  I18n
} from 'react-i18next';
import {
  Container,
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Loading, PaginationComponent } from '../../components';

class Promotions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      promotions: {},
      statusList: [{
        value: '',
        text: i18next.t(`PROMOTIONS.all`),
      }, {
        value: 'ac',
        text: i18next.t(`PROMOTION_STATUS.ac`),
      }, {
        value: 'ia',
        text: i18next.t(`PROMOTION_STATUS.ia`),
      }, {
        value: 'fi',
        text: i18next.t(`PROMOTION_STATUS.fi`),
      }],
      statusFilter: '',
    };
  }

  componentDidMount() {
    this.getPromotionsSubscription = promotionStore
      .subscribe('getPromotions', (promotions) => {
        this.setState({ promotions });
        this.isLoading(false);
      });

    this.promotionStoreError = promotionStore
      .subscribe('PromotionStoreError', (err) => {
        this.isLoading(false);
        toast.dismiss();
        toast.error(err.message || i18next.t('FETCH.error'));
      });

    this.reloadPromotions(0);
  }

  componentWillUnmount() {
    this.getPromotionsSubscription.unsubscribe();
    this.promotionStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>

      <Loading isLoading={this.state.loading} loadingMessage={ t('PROMOTIONS.loadingPromotions') }></Loading>

      <Container className="p-0">

        <div className="text-center">
          <Link to="/admin/create-coupon-promo">
            <Button className="mr-3 mt-5" color="primary">
            { t('PROMOTIONS.createCouponPromotion') }
            </Button>
          </Link>
          <Link to="/admin/create-special-promo">
            <Button className="mt-5" color="primary">
            { t('PROMOTIONS.createSpecialPromotion') }
            </Button>
          </Link>
        </div>

        <Form className="mt-5" inline>
          <FormGroup>
            <Label className="mr-1">
              {t(`PROMOTIONS.statusFilter`)}{': '}
            </Label>
            <Input onChange={(evt) => this.onStatusChange(evt.target.value)} value={this.state.statusFilter} type="select" name="status">
              {this.state.statusList.map((status, index) =>
                <option key={index} value={status.value}>
                  {status.text}
                </option>
              )}
            </Input>
          </FormGroup>
        </Form>

        <Table hover className="mt-2">
        <thead>
          <tr>
            <th className="App-header-table-admin">{ t('PROMOTIONS.userEmail') }</th>
            <th className="App-header-table-admin">{ t('PROMOTIONS.name') }</th>
            <th className="App-header-table-admin">{ t('PROMOTIONS.type') }</th>
            <th className="App-header-table-admin">{ t('PROMOTIONS.amount') }</th>
            <th className="App-header-table-admin">{ t('PROMOTIONS.status') }</th>
          </tr>
        </thead>
        <tbody>
          <TransitionGroup component={null}>
           { (this.state.promotions.rows && this.state.promotions.rows.length) ? this.state.promotions.rows.map((promotion) =>
             <CSSTransition key={promotion.id} timeout={500} classNames="fade-in-change">
               <tr className="App-cursor-pointer" onClick={() => this.goToPromotionDetails(promotion.id)}>
                 <td>
                   {(promotion.User && promotion.User.email) ?
                    <span>{promotion.User.email}</span>
                    : null }
                 </td>
                 <td>{promotion.name}</td>
                 <td>{t(`PROMOTION_TYPES.${promotion.type}`)}</td>
                 <td>{promotion.amount}</td>
                 <td>{t(`PROMOTION_STATUS.${promotion.status}`)}</td>
               </tr>
             </CSSTransition>)
           : null }
          </TransitionGroup>
        </tbody>
      </Table>

      <PaginationComponent pages={this.state.promotions.pages} page={this.state.promotions.page} onPageChange={this.reloadPromotions}></PaginationComponent>

      </Container>
    </div>)}</I18n>);
  }

  onStatusChange = (status = '') => {
    this.reloadPromotions(0, status);
  }

  reloadPromotions = (page, statusFilter = this.state.statusFilter) => {
    this.setState({ statusFilter });
    this.isLoading(true);
    promotionsActions.getPromotions(page, statusFilter);
  }

  goToPromotionDetails = (promotionId) => {
    this.props.history.push(`/admin/promotion-details/${promotionId}`);
  }

  isLoading = (isLoading) => {
    this.setState({ loading: isLoading });
  }
}



export default Promotions;
