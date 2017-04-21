// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native';

// styles
import stylesColors from '../../../constants/colors';

// actions
import { updateSettings, resetSettings } from '../../../actions/settings'

// components
import SettingsForm from '../../../components/settings/settings-form/settings-form'

const per = 20
const styles = (layout) => StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: stylesColors[layout].primaryBg,
  },
});

class SettingsEdit extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
    layout: PropTypes.string.isRequired,
  }

  static navigationOptions = {
    headerTitle: 'Settings'
  }

  handleSubmit(data) {
    this.props.updateSettings(data)
  }

  render() {
    const { settings, layout } = this.props;

    return (
      <View style={styles(layout).view}>
        <SettingsForm
          settings={settings}
          layout={layout}
          onSubmit={this.handleSubmit.bind(this)}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings,
    layout: state.settings.layout,
  }
}

const mapDispatchToProps = {
  updateSettings,
  resetSettings,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsEdit)
