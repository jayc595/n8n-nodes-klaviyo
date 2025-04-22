import { INodeProperties } from "n8n-workflow";

export const ProfileOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['profile'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many profiles',
				routing: {
					request: {
						method: 'GET',
						url: '/profiles',
					},
				},
			},
			{
				name: 'Get One',
				value: 'getOne',
				action: 'Get one profile',
				routing: {
					request: {
						method: 'GET',
						url: '/profiles',
						qs: {
							'page[size]': '1'
						}
					},
				},
			},
		],
		default: 'getAll',
	},
];

const getAllProfileFields: INodeProperties[] = [

];

const getOneProfileFields: INodeProperties[] = [
	{
		displayName: 'ID',
		name: 'profileId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['profile'],
				operation: ['getOne']
			},
		},
		routing: {
			request: {
				qs: {
					filter: '={{ $value ? `equals(id,"${$value}")` : undefined }}'
				},
			},
		},
	},
	{
		displayName: 'Email Address',
		name: 'profileEmail',
		type: 'string',
		placeholder: 'name@email.com',
		hint: 'Will override ID if specified',
		displayOptions: {
			show: {
				resource: ['profile'],
				operation: ['getOne'],
			},
		},
		default: '',
		routing: {
			request: {
				qs: {
					filter: '={{ $value ? `equals(email,"${$value}")` : undefined }}'
				},
			},
		},
	}
];

const getProfileFields: INodeProperties[] = [
  ...getAllProfileFields,
  ...getOneProfileFields,
	{
		displayName: 'Query Parameters',
		name: 'queryParameters',
		type: 'collection',
		placeholder: 'Add parameter',
		options: [
			{
				displayName: 'Profile Fields',
				name: 'profileFields',
				type: 'multiOptions',
				hint: 'Select which fields are returned.',
				// eslint-disable-next-line n8n-nodes-base/node-param-multi-options-type-unsorted-items
				options: [
					{
						// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
						name: 'email',
						value: 'email',
					},
					{
						// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
						name: 'phone_number',
						value: 'phone_number',
					},
					{
						// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
						name: 'external_id',
						value: 'external_id',
					},
					{
						// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
						name: 'first_name',
						value: 'first_name',
					},
					{
						// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
						name: 'last_name',
						value: 'last_name',
					},
					{
						// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
						name: 'organization',
						value: 'organization',
					},
					{
						// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
						name: 'locale',
						value: 'locale',
					},
					{
						// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
						name: 'title',
						value: 'title',
					},
					{
						// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
						name: 'image',
						value: 'image',
					},
					{
						// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
						name: 'created',
						value: 'created',
					},
					{
						// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
						name: 'updated',
						value: 'updated',
					},
					{
						// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
						name: 'last_event_date',
						value: 'last_event_date',
					},
					{
						// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
						name: 'location',
						value: 'location',
					},
					{
						name: 'location.address1',
						value: 'location.address1',
					},
					{
						name: 'location.address2',
						value: 'location.address2',
					},
					{
						name: 'location.city',
						value: 'location.city',
					},
					{
						name: 'location.country',
						value: 'location.country',
					},
					{
						name: 'location.latitude',
						value: 'location.latitude',
					},
					{
						name: 'location.longitude',
						value: 'location.longitude',
					},
					{
						name: 'location.region',
						value: 'location.region',
					},
					{
						name: 'location.zip',
						value: 'location.zip',
					},
					{
						name: 'location.timezone',
						value: 'location.timezone',
					},
					{
						name: 'location.ip',
						value: 'location.ip',
					},
					{
						// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
						name: 'properties',
						value: 'properties',
					},
					{
						// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
						name: 'subscriptions',
						value: 'subscriptions',
					},
					{
						name: 'subscriptions.email',
						value: 'subscriptions.email',
					},
					{
						name: 'subscriptions.email.marketing',
						value: 'subscriptions.email.marketing',
					},
					{
						name: 'subscriptions.email.marketing.can_receive_email_marketing',
						value: 'subscriptions.email.marketing.can_receive_email_marketing',
					},
					{
						name: 'subscriptions.email.marketing.consent',
						value: 'subscriptions.email.marketing.consent',
					},
					{
						name: 'subscriptions.email.marketing.consent_timestamp',
						value: 'subscriptions.email.marketing.consent_timestamp',
					},
					{
						name: 'subscriptions.email.marketing.last_updated',
						value: 'subscriptions.email.marketing.last_updated',
					},
					{
						name: 'subscriptions.email.marketing.method',
						value: 'subscriptions.email.marketing.method',
					},
					{
						name: 'subscriptions.email.marketing.method_detail',
						value: 'subscriptions.email.marketing.method_detail',
					},
					{
						name: 'subscriptions.email.marketing.custom_method_detail',
						value: 'subscriptions.email.marketing.custom_method_detail',
					},
					{
						name: 'subscriptions.email.marketing.double_optin',
						value: 'subscriptions.email.marketing.double_optin',
					},
					{
						name: 'subscriptions.email.marketing.suppression',
						value: 'subscriptions.email.marketing.suppression',
					},
					{
						name: 'subscriptions.email.marketing.list_suppressions',
						value: 'subscriptions.email.marketing.list_suppressions',
					},
					{
						name: 'subscriptions.sms',
						value: 'subscriptions.sms',
					},
					{
						name: 'subscriptions.sms.marketing',
						value: 'subscriptions.sms.marketing',
					},
					{
						name: 'subscriptions.sms.marketing.can_receive_sms_marketing',
						value: 'subscriptions.sms.marketing.can_receive_sms_marketing',
					},
					{
						name: 'subscriptions.sms.marketing.consent',
						value: 'subscriptions.sms.marketing.consent',
					},
					{
						name: 'subscriptions.sms.marketing.consent_timestamp',
						value: 'subscriptions.sms.marketing.consent_timestamp',
					},
					{
						name: 'subscriptions.sms.marketing.method',
						value: 'subscriptions.sms.marketing.method',
					},
					{
						name: 'subscriptions.sms.marketing.method_detail',
						value: 'subscriptions.sms.marketing.method_detail',
					},
					{
						name: 'subscriptions.sms.marketing.last_updated',
						value: 'subscriptions.sms.marketing.last_updated',
					},
					{
						name: 'subscriptions.sms.transactional',
						value: 'subscriptions.sms.transactional',
					},
					{
						name: 'subscriptions.sms.transactional.can_receive_sms_transactional',
						value: 'subscriptions.sms.transactional.can_receive_sms_transactional',
					},
					{
						name: 'subscriptions.sms.transactional.consent',
						value: 'subscriptions.sms.transactional.consent',
					},
					{
						name: 'subscriptions.sms.transactional.consent_timestamp',
						value: 'subscriptions.sms.transactional.consent_timestamp',
					},
					{
						name: 'subscriptions.sms.transactional.method',
						value: 'subscriptions.sms.transactional.method',
					},
					{
						name: 'subscriptions.sms.transactional.method_detail',
						value: 'subscriptions.sms.transactional.method_detail',
					},
					{
						name: 'subscriptions.sms.transactional.last_updated',
						value: 'subscriptions.sms.transactional.last_updated',
					},
					{
						name: 'subscriptions.mobile_push',
						value: 'subscriptions.mobile_push',
					},
					{
						name: 'subscriptions.mobile_push.marketing',
						value: 'subscriptions.mobile_push.marketing',
					},
					{
						name: 'subscriptions.mobile_push.marketing.can_receive_push_marketing',
						value: 'subscriptions.mobile_push.marketing.can_receive_push_marketing',
					},
					{
						name: 'subscriptions.mobile_push.marketing.consent',
						value: 'subscriptions.mobile_push.marketing.consent',
					},
					{
						name: 'subscriptions.mobile_push.marketing.consent_timestamp',
						value: 'subscriptions.mobile_push.marketing.consent_timestamp',
					},
					{
						// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
						name: 'predictive_analytics',
						value: 'predictive_analytics',
					},
					{
						name: 'predictive_analytics.historic_clv',
						value: 'predictive_analytics.historic_clv',
					},
					{
						name: 'predictive_analytics.predicted_clv',
						value: 'predictive_analytics.predicted_clv',
					},
					{
						name: 'predictive_analytics.total_clv',
						value: 'predictive_analytics.total_clv',
					},
					{
						name: 'predictive_analytics.historic_number_of_orders',
						value: 'predictive_analytics.historic_number_of_orders',
					},
					{
						name: 'predictive_analytics.predicted_number_of_orders',
						value: 'predictive_analytics.predicted_number_of_orders',
					},
					{
						name: 'predictive_analytics.average_days_between_orders',
						value: 'predictive_analytics.average_days_between_orders',
					},
					{
						name: 'predictive_analytics.average_order_value',
						value: 'predictive_analytics.average_order_value',
					},
					{
						name: 'predictive_analytics.churn_probability',
						value: 'predictive_analytics.churn_probability',
					},
					{
						name: 'predictive_analytics.expected_date_of_next_order',
						value: 'predictive_analytics.expected_date_of_next_order',
					}
				],
				routing: {
					request: {
						qs: {
							'fields[profile]': '={{ $value.length > 0 ? $value.join(",") : undefined }}',
						},
					},
				},
				default: [],
			},
		],
		default: {},
		displayOptions: {
			show: {
				resource: ['profile'],
				operation: ['getAll', 'getOne'],
			},
		},
	},
];

export const ProfileFields: INodeProperties[] = [
  ...getProfileFields
];