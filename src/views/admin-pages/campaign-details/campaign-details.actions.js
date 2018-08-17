import Flux from '@4geeksacademy/react-flux-dash';
import { getData, putData, downloadData } from '../../../fetch';
import FileSaver from 'file-saver';

const getCampaign = (campaignId) => {
  getData(`/campaign/${campaignId}/`)
    .then((campaign) => {
      Flux.dispatchEvent('getCampaign', campaign);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

const getCampaignStatistics = (campaignId, days) => {
  getData(`/statistics/campaign/${campaignId}?days=${days}`)
    .then((campaign) => {
      Flux.dispatchEvent('getCampaignStatistics', campaign);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

const getCampaignMetrics = (campaignId) => {
  getData(`/statistics/campaign-metrics/${campaignId}`)
    .then((campaign) => {
      Flux.dispatchEvent('getCampaignMetrics', campaign);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

const approveCampaign = (campaignId) => {
  putData(`/campaign/${campaignId}/approve/`)
    .then((data) => {
      Flux.dispatchEvent('approveCampaign', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

const rejectCampaign = (campaignId, msg) => {
  putData(`/campaign/${campaignId}/reject/`, { msg })
    .then((data) => {
      Flux.dispatchEvent('rejectCampaign', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

const suspendCampaign = (campaignId, msg) => {
  putData(`/campaign/${campaignId}/suspend/`, { msg })
    .then((data) => {
      Flux.dispatchEvent('suspendCampaign', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

const downloadSms = (campaignId, campaignName) => {
  downloadData(`/statistics/campaign/${campaignId}/sms/download`)
    .then((blob) => {
      FileSaver.saveAs(blob, `${campaignName}-sms.csv`);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

const downloadViews = (campaignId, campaignName) => {
  downloadData(`/statistics/campaign/${campaignId}/views/download`)
    .then((blob) => {
      FileSaver.saveAs(blob, `${campaignName}-views.csv`);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

const downloadInvoices = (campaignId, campaignName) => {
  downloadData(`/statistics/campaign/${campaignId}/invoices/download`)
    .then((blob) => {
      FileSaver.saveAs(blob, `${campaignName}-invoices.csv`);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

const downloadPayments = (campaignId, campaignName) => {
  downloadData(`/statistics/campaign/${campaignId}/payments/download`)
    .then((blob) => {
      FileSaver.saveAs(blob, `${campaignName}-payments.csv`);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

export {
  getCampaign,
  getCampaignStatistics,
  getCampaignMetrics,
  approveCampaign,
  rejectCampaign,
  suspendCampaign,
  downloadSms,
  downloadViews,
  downloadInvoices,
  downloadPayments,
};
