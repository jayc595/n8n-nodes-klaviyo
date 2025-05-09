import { INodeProperties } from 'n8n-workflow';
import { parsePageCursors } from './GenericFunctions';
import { getFlowAttrFields } from './FlowFields';
import { getMetricAttrFields } from './MetricFields';

export const MetricOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['metric'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many metrics',
				routing: {
					request: {
						method: 'GET',
						url: '/metrics',
					}
				}
			},
      {
        name: 'Get One',
        value: 'getOne',
        action: 'Get one metric',
				routing: {
					request: {
						method: 'GET',
						url: '=/metrics/{{$parameter.metricId}}',
					}
				}
      },
		],
		default: 'getAll'
	},
];


/* --------------------------------------------------------
		GET
----------------------------------------------------------- */
const getAllMetricFields: INodeProperties[] = [
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
				resource: ['metric'],
				operation: ['getAll'],
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
				resource: ['metric'],
				operation: ['getAll'],
			},
		},
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				displayName: 'Filter',
				name: 'filter',
				values: [
					{
						displayName: 'Integration',
						name: 'integration',
						type: 'options',
						options: [
							{
								name: 'Category',
								value: 'integration.category',
							},
							{
								name: 'Name',
								value: 'integration.name',
							},
						],
						default: 'integration.name',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
					},
				],
			},
		],
		routing: {
			request: {
				qs: {
					filter: '={{ [\
						...($value.filter ?? []).map(({ integration, value }) => `equals(${integration},"${value}")`),\
					].join(",") }}',
				}
			}
		}
	},
]

const getOneMetricFields: INodeProperties[] = [
	{
		displayName: 'Metric ID',
		name: 'metricId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['metric'],
				operation: ['getOne'],
			},
		},
		default: '',
		required: true,
	}
]

const getMetricFields: INodeProperties[] = [
	...getAllMetricFields,
	...getOneMetricFields,
	{
		displayName: 'Metric Fields',
		name: 'metricFields',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['metric'],
				operation: ['getAll', 'getOne'],
			},
		},
		options: getMetricAttrFields,
		required: true,
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
		displayName: 'Additional Resources',
		name: 'include',
		type: 'multiOptions',
		options: [
			{
				// eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
				name: 'flow-triggers',
				value: 'flow-triggers',
			},
		],
		default: [],
		displayOptions: {
			show: {
				resource: ['metric'],
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
		displayName: 'Flow Fields',
		name: 'flowFields',
		type: 'multiOptions',
		hint: 'Requires "flow-trigger" in the Additional Resources field',
		displayOptions: {
			show: {
				resource: ['metric'],
				operation: ['getAll', 'getOne'],
			},
		},
		options: getFlowAttrFields,
		default: [],
		routing: {
			request: {
				qs: {
					'fields[flow]': '={{ $value.length > 0 ? $value.join(",") : undefined }}',
				},
			},
		},
	},
];

export const MetricFields: INodeProperties[] = [
	...getMetricFields,
]