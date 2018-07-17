import React, { Component } from 'react';
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import { SubNav, Loading, Promotion, ModalConfirm } from '../../components';
import {
  I18n
} from 'react-i18next';
import {
  Container, Button,
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
      resumePromotionIsOpen: false,
      pausePromotionIsOpen: false,
    };
  }

  componentDidMount() {
    this.getPromotionSubscription = promotionStore
      .subscribe('getPromotion', (promotion) => {
        this.setState({ promotion });
        this.isLoading(false);
      });

      this.resumePromotionSubscription = promotionStore
        .subscribe('resumePromotion', (promotion) => {
          this.isLoading(false);
          toast.dismiss();
          toast.success(i18next.t('PROMOTION_DETAILS.promotionResumed'));
          this.props.history.push(`/admin/campaign-manager/promotions`);
        });

      this.pausePromotionSubscription = promotionStore
        .subscribe('pausePromotion', (promotion) => {
          this.isLoading(false);
          toast.dismiss();
          toast.success(i18next.t('PROMOTION_DETAILS.promotionPaused'));
          this.props.history.push(`/admin/campaign-manager/promotions`);
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
    this.resumePromotionSubscription.unsubscribe();
    this.pausePromotionSubscription.unsubscribe();
    this.promotionStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>
      <SubNav backRoute="/admin/campaign-manager/promotions" subNavTitle={t('PROMOTION_DETAILS.promotionDetails')}></SubNav>

      <Loading isLoading={this.state.loading} loadingMessage={ t(this.state.loadingI18n) }></Loading>

      <ModalConfirm isOpen={this.state.resumePromotionIsOpen} modalHeader={t('PROMOTION_DETAILS.resumeHeader')} modalBody={t('PROMOTION_DETAILS.resumeBody', { promotionName: this.state.promotion.name || ' ' } )}
      acceptI18n="PROMOTION_DETAILS.resumePromotion" confirm={this.resumePromotion} />

      <ModalConfirm isOpen={this.state.pausePromotionIsOpen} modalHeader={t('PROMOTION_DETAILS.pauseHeader')} modalBody={t('PROMOTION_DETAILS.pauseBody', { promotionName: this.state.promotion.name || ' ' })}
      acceptI18n="PROMOTION_DETAILS.pausePromotion" confirm={this.pausePromotion} />

      <Container>

        <Promotion promotion={this.state.promotion}></Promotion>

        {(this.state.promotion.status === 'ia') ?
          <Button onClick={() => {this.resumePromotion(false)}} className="mx-auto d-block mt-5 mb-5" color="success" type="button">
            { t('PROMOTION_DETAILS.resumePromotion') }
          </Button>
        : null }

        {(this.state.promotion.status === 'ac') ?
          <Button onClick={() => {this.pausePromotion(false)}} className="mx-auto d-block mt-5 mb-5" color="danger" type="button">
            { t('PROMOTION_DETAILS.pausePromotion') }
          </Button>
        : null }

      </Container>
    </div>)}</I18n>);
  }

  /**
   * toggles the resumePromotion modal and resume the promotion if you pass confirm = true
   * @param  {Boolean} [confirm=false] pass true from the ModalConfirm
   * component only to resume the promotion
   */
  resumePromotion = (confirm = false) => {
    this.setState({ resumePromotionIsOpen: !this.state.resumePromotionIsOpen });

    if (confirm === true) {
      this.isLoading(true, 'PROMOTION_DETAILS.resumingPromotion');
      promotionDetailsActions.resumePromotion(this.state.promotion.id);
    }
  }

  /**
   * toggles the pausePromotion modal and pause the promotion if you pass confirm = true
   * @param  {Boolean} [confirm=false] pass true from the ModalConfirm
   * component only to pause the promotion
   */
  pausePromotion = (confirm = false) => {

    this.setState({ pausePromotionIsOpen: !this.state.pausePromotionIsOpen });

    if (confirm === true) {
      this.isLoading(true, 'PROMOTION_DETAILS.pausingPromotion');
      promotionDetailsActions.pausePromotion(this.state.promotion.id);
    }
  }

  isLoading = (isLoading, loadingI18n = this.state.loadingI18n) => {
    this.setState({
      loadingI18n,
      loading: isLoading
    });
  }
}
export default PromotionDetails;
