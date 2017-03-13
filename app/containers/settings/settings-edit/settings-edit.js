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
const styles = (darkLayout) => StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: stylesColors[darkLayout].primaryBg,
  },
});

class SettingsEdit extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
  }

  static navigationOptions = {
    header: ({ state }) => {
      return {
        title: 'Settings'
      }
    }
  }

  handleSubmit(data) {
    this.props.updateSettings(data)
  }

  render() {
    const { settings, darkLayout } = this.props;

    return (
      <View style={styles(darkLayout).view}>
        <SettingsForm
          settings={settings}
          darkLayout={darkLayout}
          onSubmit={this.handleSubmit.bind(this)}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings,
    darkLayout: state.settings.darkLayout,
  }
}

const mapDispatchToProps = {
  updateSettings,
  resetSettings,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsEdit)
