/* import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts.map((alert) => (
    <Alert key={alert.id} message={alert.msg} type="warning" showIcon closable />
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert); */
import { Alert } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alertd = ({ alerts }) =>
  alerts.map((alert) => (
    <Alert
      key={alert.id}
      message={alert.msg}
      type={alert.alertType}
      showIcon
      closable
    />


  ));

Alertd.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alertd);