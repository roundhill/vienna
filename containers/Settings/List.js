import React, { Component } from 'react'
import { ScrollView, View, Image, RefreshControl, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { values, isEmpty } from 'lodash'
import { fetchSettings, changeSetting, updateSettings } from '../../actions'
import PropTypes from '../../PropTypes'
import ListItem from '../../components/Users/ListItem'
import SchemaFormField from '../../components/General/SchemaFormField'

export default class List extends Component {

	componentWillMount() {
		if ( isEmpty( this.props.settings.settings ) ) {
			//this.props.dispatch( fetchSettings() )
		}
	}
	onRefresh() {
		console.log( 'onRefresh' )
		this.props.dispatch( fetchSettings() )
	}
	onChangeSettingValue( setting, value ) {
		console.log( 'onChangeSeetingsValue' )
		this.props.dispatch( changeSetting( setting, value ) )
	}
	onUpdateSettings() {
		console.log( 'onupdateSettings' )
		this.props.dispatch( updateSettings( this.props.settings.settings ) )
	}
	render() {
		var settings = this.props.settings.settings

		var settingsNamesMap = {
			title: 'Site Title',
			description: 'Site Description',
			url: 'Site URL',
			email: 'Contact Email',
			timezone: 'Timezone',
			date_format: 'Date Format',
			time_format: 'Time Format',
			start_of_week: 'Start of Week',
			language: 'Site Language',
			use_smilies: 'Smiley Support',
			default_category: 'Default Category',
			default_post_format: 'Default Post Format',
			posts_per_page: 'Posts Per Page',
		}

		return (
			<ScrollView
				refreshControl={<RefreshControl
					refreshing={this.props.users.list.loading}
					style={{backgroundColor: 'transparent'}}
					onRefresh={this.onRefresh.bind(this)}
					tintColor="#666666"
					title={this.props.users.list.loading ? 'Loading Settings...' : 'Pull to Refresh...'}
					titleColor="#000000"
				/>}
				>
				<View style={styles.list}>
					{Object.entries( settings ).map( properties => {
						const value = properties[1]
						const setting = properties[0]
						const schema = this.props.settings.schema.properties[ setting ]
						return <View style={styles.listItem} key={setting}>
							<SchemaFormField
								name={settingsNamesMap[ setting ] ? settingsNamesMap[ setting ] : setting}
								schema={schema}
								value={value}
								onChange={value => this.onChangeSettingValue( setting, value )}
								onSave={() => this.onUpdateSettings()}
							/>
						</View>
					})}
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	list: {
		paddingTop: 15,
	}
})