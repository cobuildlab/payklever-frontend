import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { I18n } from 'react-i18next';

class ModalConfirm extends Component {
  render() {
    return (<I18n>{(t, { i18n }) => (
      <div>
        <Modal isOpen={this.props.isOpen} toggle={() => this.props.confirm} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            { this.props.modalHeader }
          </ModalHeader>
          <ModalBody>
            { this.props.modalBody }
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => this.props.confirm(false)}>
              { t(this.props.cancelI18n) || t('APP.cancel') }
            </Button>
            {' '}
            <Button color="primary" onClick={() => this.props.confirm(true)}>
              { t(this.props.acceptI18n) || t('APP.accept') }
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )}</I18n>);
  }
}

ModalConfirm.propTypes = {
  confirm: PropTypes.func.isRequired,
  modalHeader: PropTypes.string.isRequired,
  modalBody: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  rejectI18n: PropTypes.string,
  acceptI18n: PropTypes.string,
};

export default ModalConfirm;
