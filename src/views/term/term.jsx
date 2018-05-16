import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { toast } from 'react-toastify';
import './term.css';
import { Link } from 'react-router-dom';
import { Loading } from '../components';
import classnames from 'classnames';
import {
  WhiteLogo,
  GreenLogo,
  PaykleverBg,
} from '../../assets';
import { authStore } from '../../stores';
import {
  Container,
  Col,
  Row,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from 'availity-reactstrap-validation';

class Term extends Component {

  constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        activeTab: '1'
      };
    }

    toggle(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        });
      }
    }

  render() {
    return (
      <I18n>{(t, { i18n }) => (<Container>

      <Loading isLoading={this.state.loading} loadingMessage={ t('LOGIN.loggingIn') }></Loading>

      <Row className="mt-2 mb-5">
        <Col className="mt-5 mb-5 text-center"  md={{size: 12,}}>
          <img src={GreenLogo} className="img-fluid Login-logo" alt="payklever"/>
        </Col>

        <Col md={{size: 12,}}>
        <Nav className="d-flex justify-content-center" tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Privacy Policy
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Terms of Use
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col className="mt-5" md="12">
                <h4>Payklever Advertiser Privacy Policy</h4>
              <small >As of May 1, 2018:</small>
                <p className="mt-2 mb-2 text-justify">Payklever Inc. respects your privacy. Payklever and its affiliates (“Payklever”, the “Company”,
                    “we”, “us” or “our”) have created a hands-free payment method for drivers (“Users”) to conduct
                    transactions from their cars via www.payklever.com (the “Website”), and for businesses to
                    promote their products or services to Users through advertisements (the businesses advertising
                    shall be referred to herein as “Advertisers”). This policy explains the privacy practices of
                    Payklever as they relate to the purchase and display of advertisements from Payklever (the
                    &quot;Advertising Services&quot;), and how Payklever collects and uses your personal information and the
                    rights and options available to you. Any capitalized term not expressly defined herein shall have
                    the same meaning as given in the Terms of Use, or as labeled or identified on the Website.
                </p>
                <p><b> Your use of the Advertisement Services is subject to the Terms of Use and Privacy Policy
                    and indicates your consent to them.</b></p>
                  <p>
                    Changes to the Privacy Policy: Payklever may from time to time change the terms of this Privacy
                    Policy. If Payklever amends this Privacy Policy to comply with legal requirements, the
                    amendments will become effective immediately upon their initial posting, or as required.
                  </p>
                  <p>
                    You agree to be bound by any of the changes made in the terms of this Privacy Policy.
                    Continuing to use the Advertising Services will indicate your acceptance of the amended terms.
                    If you do not agree with any of the amended terms, you must avoid any further use of the
                    Advertising Services.
                  </p>
                  <p>
                    This Privacy Policy is incorporated as part of the Payklever Terms of Use (the “Terms of Use” or the “Terms”).
                  </p>
                  <p>
                    In this Privacy Policy, the term “Personal Information” means any information collected by us or
                    provided by you that, with reasonable efforts, may be used to identify you, which may include
                    full name, date of birth, company name, an address, a phone number, and an email address. In
                    addition to collecting Personal Information, we also will collect information on your current
                    customers, your marketing goals and strategies, and any other marketing data which you provide
                    us. Providing Payklever with false, incorrect, or out-dated information is a violation of the Terms
                    of Use and will impair Payklever’s ability to provide you with the Advertising Services.
                  </p>
                  <p><b>Payment Information</b></p>
                  <p>
                    When you create an, you will be required to provide Payklever with certain details, such as your
                    full name, billing address, the last four digits of your social security, your employer
                    identification or Tax ID number, and on some occasions more. You will be required to provide
                    Payklever with your payment details, including credit card details (credit card number, security
                    code and expiration date). To protect your privacy, your payment details may not be stored on
                    Payklever&#39;s systems but rather on a third-party online payment gateway that assists Payklever in
                    the authentication, authorization, charge and maintenance of your payment details for the use of
                    the Advertising Services. This is with the provision that such gateway is subject to applicable

                    standards and regulations with respect to the holding of personal information and the processing
                    of online payments.
                  </p>
                  <p><b>Uses of information</b></p>
                <p>Payklever may use information collected from or provided by you for the following purposes:</p>
              <ul>
                <li>To provide you with the Advertising Services;</li>
                <li>To improve the experience of Users and other Advertisers;</li>
                <li>To provide you with support and handle requests and complaints;</li>
                <li>To send you updates, notices, announcements, and additional information related to the
                    Advertising Services;</li>
                <li>To send you marketing material. At any time you may choose not to receive such
                    material by _______. In any case, Payklever will not knowingly share your personal
                    information with any advertisers, without your explicit consent and as allowed for under
                    this Privacy Policy;</li>
                <li>To create aggregated and/or anonymous data (where such data does not enable the
                    identification of a specific user);</li>
                <li>To conduct surveys and questionnaires;</li>
                <li>To enforce the Terms of Use;</li>
                <li>To contact you in any way when Payklever believes it to be necessary;</li>
                <li>To comply with any applicable law and assist law enforcement agencies under any
                    applicable law, when Payklever has a good faith belief that Payklever’s cooperation with
                    the law enforcement agencies is legally mandated or meets the applicable legal standards
                    and procedures;</li>
                <li>To prevent fraud, misappropriation, infringements, identity theft and other illegal
                    activities and misuse of the Advertising Services;</li>
                <li>To manage bugs and malfunctions;</li>
                <li>To take any action in any case of dispute, or legal proceeding of any kind between you
                    and Users, or between you and other Advertisers, or third-parties with respect to, or in
                    relation to the Advertising Services or any other services provided under through
                    Payklever;</li>
                <li>For any other purposes provided under this Privacy Policy and the Terms of Use.</li>
              </ul>
              <p>
                Further information may be collected when Payklever exchanges communications with you, for
                example, if you submit a request, contact Payklever’s support team, or report a violation to the
                abuse team.
              </p>
              <p><b>Website Behavior Data</b></p>
              <p>
                Payklever collects information about the use of the Advertising Services and information from
                the device you have used to access Payklever, the frequency and scope of your use of the

                Advertising Services, the duration of your sessions, browser, browser version, browser
                dimensions, device name, operating system type, operating system version, battery usage,
                information that you viewed, content that you use or create, advertisements that you view or
                click on, your communications with Partners and third-parties, the Internet protocol (IP) address
                and the name of the domain that serve you to access the Services, and the geographic location of
                the device that you are using to log-in and use Payklever on.
              </p>
              <p><b>Accessing the Services</b></p>
              <p>
                In order to access certain features of the Advertising Services, you will need to connect a
                payment method (see our Terms of Use regarding storing payment information).
              </p>
              <p>
                Payklever may also establish and require from time to time additional or different means of
                identification and authentication for logging in and accessing the Advertising Services or for
                accessing certain features or designated sections of the Advertising Services.
              </p>
              <p>
                Your log-in details are your responsibility. You are fully accountable for any use or misuse of
                your Account and personal details as a result of conveying your details to someone else. You
                must maintain your log-in details in absolute confidentiality and avoid disclosing them to others.
                It is your responsibility to frequently update your password.
              </p>
              <p><b>Sharing User Information</b></p>
              <p>
                Payklever does not sell, rent or lease your Personal Information to third parties for marketing
                purposes. Payklever will not share your Personal Information with others, without your consent,
                except for the following purposes and to the extent necessary in Payklever’s good-faith
                discretion:
              </p>
              <ul>
                <li>As necessary for the operation of the Advertising Services;</li>
                <li>When you use the Advertising Services, when you take part in content-related activities,
                when it is necessary to facilitate the functionality of the Advertising Services and when it
                is necessary to manage and administer any other service Payklever provides;</li>
                <li>If Payklever reasonably believes that you have breached the Terms of Use, or abused
                your rights to use the Advertising Services, or performed any act or omission that
                Payklever reasonably believes to be violating any applicable law, rules, or regulations.
                Payklever may share your information in these cases, with law enforcement agencies and
                other competent authorities and with any third-party as may be required to handle any
                result of your wrongdoing;</li>
                <li>If Payklever is required, or reasonably believes that it is required by law to share or
                disclose your information;</li>
                <li>In any case of dispute, or legal proceeding of any kind between you and Payklever, or
                between you and other users with respect to, or in relation with the Advertising Services;</li>
                <li>If Payklever organizes the operation of the Advertising Services within a different
                framework, or through another legal structure or entity, or if Payklever is acquired by, or
                merged into or with another entity, provided however, that those entities agree to be
                bound by the provisions of this Privacy Policy, with respective changes taken into
                consideration;</li>

                <li>To store your data on servers;</li>
                <li>To collect, hold and manage your Personal Information through cloud based or hosting
                services or a third-party or a party affiliated or connected to Payklever, as reasonable for
                business purposes;</li>
                <li>Payklever may also share Personal Information with companies or organizations
                connected or affiliated with Payklever, such as, companies Payklever reasonably believes
                will become an Advertiser, subsidiaries, and sister-companies. Personal Information may
                also be shared with Payklever’s other partners and service providers to process it for us,
                based on our instructions and in compliance with this policy and any other appropriate
                confidentiality and security measures.</li>
              </ul>
              <p><b>Personal Information</b></p>
              <p>
                This information is held by Payklever associated with your Account and for such limited period
                of time as is necessary in order for Payklever to be able to use the information for the purposes
                described in this Privacy Policy. At the end of this period of time, Payklever will then anonymize
                and aggregate or delete your location and route information.
              </p>
              <p>
                If you would like us to delete your Account and your personal information, please send an email
                to admin@payklever.com with the subject line “Delete Account” from the email used to register
                your Account.
              </p>
              <p>
                On receiving such a request, Payklever will use reasonable efforts to delete such information.
                However, some information that has been collected and anonymized may not be able to be
                removed from our system.
              </p>
              <p>
                If you find that the information associated with your Account is not accurate, complete or
                updated, then you must make all necessary changes to correct it as soon as you have discovered
                it.
              </p>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col className="mt-5" md="12">
                <h4>Payklever Advertiser Terms of Use</h4>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Col>
      </Row>
    </Container> )}</I18n>)
  }
  isLoading(isLoading) {
    this.setState({ loading: isLoading });
  }
}

export default Term;
