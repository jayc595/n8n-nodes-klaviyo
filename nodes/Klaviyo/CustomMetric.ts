import { INodeProperties } from 'n8n-workflow';
import { getMetricAttrFields } from './MetricFields';
import { getCustomMetricAttrFields } from './CustomMetricFields';

export const CustomMetricOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['customMetric'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many custom metrics',
				routing: {
					request: {
						method: 'GET',
						url: '/custom-metrics',
					}
				}
			},
      {
        name: 'Get One',
        value: 'getOne',
        action: 'Get one custom metric',
				routing: {
					request: {
						method: 'GET',
						url: '=/custom-metrics/{{$parameter.customMetricId}}',
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
const getOneMetricFields: INodeProperties[] = [
	{
		displayName: 'Custom Metric ID',
		name: 'customMetricId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['customMetric'],
				operation: ['getOne'],
			},
		},
		default: '',
		required: true,
	}
]

const getMetricFields: INodeProperties[] = [
	...getOneMetricFields,
	{
		displayName: 'Custom Metric Fields',
		name: 'customMetricFields',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['customMetric'],
				operation: ['getAll', 'getOne'],
			},
		},
		options: getCustomMetricAttrFields,
		required: true,
		default: [],
		routing: {
			request: {
				qs: {
					'fields[custom-metric]': '={{ $value.length > 0 ? $value.join(",") : undefined }}',
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
				name: 'metrics',
				value: 'metrics',
			},
		],
		default: [],
		displayOptions: {
			show: {
				resource: ['customMetric'],
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
				resource: ['customMetric'],
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
];

export const CustomMetricFields: INodeProperties[] = [
	...getMetricFields,
]