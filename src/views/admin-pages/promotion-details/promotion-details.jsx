import React, { Component } from 'react';
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import { SubNav, Loading, Promotion } from '../../components';
import {
  I18n
} from 'react-i18next';
import {
  Container,
} from 'reactstrap';
import { promotionStore } from '../../../stores';
import * as promotionDetailsActions from './promotion-details.actions';

class PromotionDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loadingI18n: '',
      promotionId: props.match.params.promotionId || '',
      promotion: {},
    };
  }

  componentDidMount() {
    this.getPromotionSubscription = promotionStore
      .subscribe('getPromotion', (promotion) => {
        this.setState({ promotion });
        this.isLoading(false);
      });

    this.promotionStoreError = promotionStore
      .subscribe('PromotionStoreError', (err) => {
        this.isLoading(false);
        toast.dismiss();
        toast.error(err.message || i18next.t('FETCH.error'));
      });

    setTimeout(() => {
      this.isLoading(true, 'PROMOTION_DETAILS.loadingPromotion');
      promotionDetailsActions.getPromotion(this.state.promotionId);
    });
  }

  componentWillUnmount() {
    this.getPromotionSubscription.unsubscribe();
    this.promotionStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>
      <SubNav backRoute="/admin/campaign-manager/promotions" subNavTitle={t('PROMOTION_DETAILS.promotionDetails')}></SubNav>

      <Loading isLoading={this.state.loading} loadingMessage={ t(this.state.loadingI18n) }></Loading>

      <Container>

        <Promotion promotion={this.state.promotion}></Promotion>

      </Container>
    </div>)}</I18n>);
  }

  isLoading = (isLoading, loadingI18n = this.state.loadingI18n) => {
    this.setState({
      loadingI18n,
      loading: isLoading
    });
  }
}
export default PromotionDetails;
