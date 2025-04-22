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
			{
				name: 'Update',
				value: 'update',
				action: 'Update a profile',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/profiles/{{ $parameter.updateProfileId }}'
					},
				},
			},
		],
		default: 'getAll',
	},
];

const postAttributeFields = [
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
];

const updateProfileFields: INodeProperties[] = [
	{
		displayName: 'Profile ID',
		name: 'updateProfileId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['profile'],
				operation: ['update']
			},
		},
		required: true
	},
	{
		displayName: 'Attributes',
		name: 'updateAttributes',
		placeholder: 'Add Attribute',
		type: 'fixedCollection',
		default: {},
		displayOptions: {
			show: {
				resource: ['profile'],
				operation: ['update']
			},
		},
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				displayName: 'Attributes',
				name: 'attribute',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'options',
						options: postAttributeFields,
						default: 'email',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
					},
				],
			},
			{
				displayName: 'Properties',
				name: 'property',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
					}
				]
			}
		],
		routing: {
			request: {
				body: {
					data: {
						type: 'profile',
						id: '={{ $parameter["updateProfileId"] }}',
						attributes: '={{ {\
							...Object.fromEntries(($value.attribute || []).map(({ key, value }) => [key, value])),\
							properties: {\
								...Object.fromEntries(($value.property || []).map(({ key, value }) => [key, value]))\
							}\
						} }}',
					},
				},
			},
		},
	},
];

const postProfileFields: INodeProperties[] = [
	...updateProfileFields,
]

/* --------------------------------------------------------
		GET
----------------------------------------------------------- */
const getAttributeFields = [
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
];

const getAllProfileFields: INodeProperties[] = [
	// No specific options for getAll
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
				options: getAttributeFields,
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
	...postProfileFields,
  ...getProfileFields
];