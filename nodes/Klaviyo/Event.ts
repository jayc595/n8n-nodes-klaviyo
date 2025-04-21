import { INodeProperties } from 'n8n-workflow';

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
		],
		default: 'getAll',
	},
];

const getAllEventFields: INodeProperties[] = [

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
		hint: 'Optional. Select which fields are returned.',
		options: [
			{
        // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
				name: 'datetime',
				value: 'datetime'
			},
			{
        // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
				name: 'event_properties',
				value: 'event_properties'
			},
			{
        // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
				name: 'timestamp',
				value: 'timestamp'
			},
			{
        // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
				name: 'uuid',
				value: 'uuid'
			},
		],
		default: [],
		routing: {
			request: {
				qs: {
					'fields[event]': '={{ $value.join(",") }}',
				},
			},
		},
	},
];

export const EventFields: INodeProperties[] = [
	...getEventFields,
]