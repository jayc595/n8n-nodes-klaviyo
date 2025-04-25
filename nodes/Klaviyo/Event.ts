import { INodeProperties } from 'n8n-workflow';
import { parsePageCursors } from './GenericFunctions';
import {
	postEventAttrFields,
	getEventAttrFields,
	eventSortValues
} from './EventFields';
import { getMetricAttrFields } from './MetricFields';
import {
	postProfileAttrFields,
	getProfileAttrFields
} from "./ProfileFields";

export const EventOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['event'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many events',
				routing: {
					request: {
						method: 'GET',
						url: '/events',
					}
				}
			},
      {
        name: 'Get One',
        value: 'getOne',
        action: 'Get one event',
				routing: {
					request: {
						method: 'GET',
						url: '=/events/{{$parameter.eventId}}',
					}
				}
      },
			{
				name: 'Create',
				value: 'create',
				action: 'Create an event',
				routing: {
					request: {
						method: 'POST',
						url: '/events',
						body: {
							data: {
								type: 'event',
								attributes: {},
							},
						},
					},
				},
			},
		],
		default: 'getAll'
	},
];


/* --------------------------------------------------------
		POST
----------------------------------------------------------- */
const createEventFields: INodeProperties[] = [
	{
		displayName: 'Event Metric',
		name: 'createEventMetric',
		type: 'string',
		default: 'n8n Event',
		required: true,
		routing: {
			request: {
				body: {
					data: {
						attributes: {
							metric: {
								data: {
									type: 'metric',
									attributes: {
										name: '={{ $value }}',
										service: 'n8n',
									},
								},
							},
						},
					},
				},
			},
		},
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Event Attributes',
		name: 'createEventAttributes',
		placeholder: 'Add Attribute',
		type: 'fixedCollection',
		default: {},
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['create']
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
						options: postEventAttrFields,
						default: 'value',
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
			},
		],
		routing: {
			request: {
				body: {
					data: {
						attributes: '={{ {\
							...Object.fromEntries(($value.attribute || []).map(({ key, value }) => [key, value])),\
							properties: {\
								...Object.fromEntries(($value.property || []).map(({ key, value }) => [key, value]))\
							},\
						} }}',
					},
				},
			},
		},
	},
	{
		displayName: 'One or more of the following profile attributes are required: email, phone number, or external ID',
		name: 'notice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['create']
			},
		},
	},
	{
		displayName: 'Profile Attributes',
		name: 'createProfileAttributes',
		placeholder: 'Add Attribute',
		type: 'fixedCollection',
		default: {},
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['create']
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
						options: postProfileAttrFields,
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
			},
		],
		routing: {
			request: {
				body: {
					data: {
						attributes: {
							profile: {
								data: {
									type: 'profile',
									attributes: '={{ {\
										...Object.fromEntries(($value.attribute || []).map(({ key, value }) => [key, value])),\
										properties: {\
											...Object.fromEntries(($value.property || []).map(({ key, value }) => [key, value]))\
										},\
									} }}',
								},
							},
						},
					},
				},
			},
		},
	},
]

const postEventFields: INodeProperties[] = [
	...createEventFields,
]

/* --------------------------------------------------------
		GET
----------------------------------------------------------- */
const getAllEventFields: INodeProperties[] = [
	{
		displayName: 'Page Cursor',
		name: 'pageCursor',
		type: 'string',
		default: '',
		routing: {
			request: {
				qs: {
					'page[cursor]': '={{ $value }}'
				},
			},
			output: {
				postReceive: [parsePageCursors],
			},
		},
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['getAll'],
			},
		},
	},
	{
		displayName: 'Page Size',
		name: 'pageSize',
		type: 'number',
		default: 20,
		typeOptions: {
			maxValue: 200,
			minValue: 1,
			numberPrecision: 1,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['getAll'],
			},
		},
		routing: {
			request: {
				qs: {
					'page[size]': '={{ $value }}',
				},
			},
		},
	},
	{
		displayName: 'Sort',
		name: 'eventSort',
		type: 'options',
		default: '',
		options: eventSortValues,
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['getAll'],
			},
		},
		routing: {
			request: {
				qs: {
					sort: '={{ $value }}',
				},
			},
		},
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'fixedCollection',
		placeholder: 'Add filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['getAll'],
			},
		},
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				displayName: 'Field',
				name: 'field',
				values: [
					{
						displayName: 'Field',
						name: 'field',
						type: 'options',
						// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
						options: [
							{
								// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
								name: 'metric_id',
								value: 'metric_id',
							},
							{
								// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
								name: 'profile_id',
								value: 'profile_id',
							},
						],
						default: 'metric_id',
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
				displayName: 'Date',
				name: 'date',
				values: [
					{
						displayName: 'Operator',
						name: 'operator',
						type: 'options',
						options: [
							{
								name: 'greater-or-equal',
								value: 'greater-or-equal',
							},
							{
								name: 'greater-than',
								value: 'greater-than',
							},
							{
								name: 'less-or-equal',
								value: 'less-or-equal',
							},
							{
								name: 'less-than',
								value: 'less-than',
							}
						],
						default: 'greater-than',
					},
					{
						displayName: 'Date',
						name: 'value',
						type: 'dateTime',
						default: ''
					}
				]
			}
		],
		routing: {
			request: {
				qs: {
					filter: '={{ [\
						...($value.field ?? []).map(({ field, value }) => `equals(${field},"${value}")`),\
						...($value.date ?? []).map(({ operator, value }) => `${operator}(datetime,${value}Z)`)\
					].join(",") }}',
				}
			}
		}
	},
]

const getOneEventFields: INodeProperties[] = [
	{
		displayName: 'Event ID',
		name: 'eventId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['getOne'],
			},
		},
		default: '',
		required: true,
	}
]

const getEventFields: INodeProperties[] = [
	...getAllEventFields,
	...getOneEventFields,
	{
		displayName: 'Event Fields',
		name: 'eventFields',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['getAll', 'getOne'],
			},
		},
		options: getEventAttrFields,
		required: true,
		default: [],
		routing: {
			request: {
				qs: {
					'fields[event]': '={{ $value.length > 0 ? $value.join(",") : undefined }}',
				},
			},
		},
	},
	{
		displayName: 'Additional Resources',
		name: 'include',
		type: 'multiOptions',
		options: [
			{
				// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
				name: 'metric',
				value: 'metric',
			},
			{
				// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
				name: 'profile',
				value: 'profile',
			},
		],
		default: [],
		description: 'The events to be monitored',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['getAll','getOne'],
			},
		},
		routing: {
			request: {
				qs: {
					include: '={{ $value.length > 0 ? $value.join(",") : undefined }}',
				},
			},
		},
	},
	{
		displayName: 'Metric Fields',
		name: 'metricFields',
		type: 'multiOptions',
		hint: 'Requires "metric" in the Additional Resources field',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['getAll', 'getOne'],
			},
		},
		options: getMetricAttrFields,
		default: [],
		routing: {
			request: {
				qs: {
					'fields[metric]': '={{ $value.length > 0 ? $value.join(",") : undefined }}',
				},
			},
		},
	},
	{
		displayName: 'Profile Fields',
		name: 'profileFields',
		type: 'multiOptions',
		hint: 'Requires "profile" in the Additional Resources field',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['getAll', 'getOne'],
			},
		},
		options: getProfileAttrFields,
		default: [],
		routing: {
			request: {
				qs: {
					'fields[profile]': '={{ $value.length > 0 ? $value.join(",") : undefined }}',
				},
			},
		},
	},
];

export const EventFields: INodeProperties[] = [
	...postEventFields,
	...getEventFields,
]