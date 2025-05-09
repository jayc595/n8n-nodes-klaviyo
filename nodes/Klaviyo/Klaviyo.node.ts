import {
	INodeType,
	INodeTypeDescription,
	NodeConnectionType
} from 'n8n-workflow';
import { EventOperations, EventFields } from './Event';
import { MetricOperations, MetricFields } from './Metric';
import { ProfileOperations, ProfileFields } from './Profile';

export class Klaviyo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Klaviyo',
		name: 'klaviyo',
		icon: 'file:klaviyo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Klaviyo API',
		defaults: {
			name: 'Klaviyo',
		},
		// eslint-disable-next-line n8n-nodes-base/node-class-description-inputs-wrong-regular-node
		inputs: [NodeConnectionType.Main],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'klaviyoApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://a.klaviyo.com/api',
			headers: {
				Accept: 'application/vnd.api+json',
				'Content-Type': 'application/vnd.api+json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Event',
						value: 'event',
					},
					{
						name: 'Metric',
						value: 'metric',
					},
					{
						name: 'Profile',
						value: 'profile',
					},
				],
				default: 'event',
			},
			...EventOperations,
			...EventFields,
			...MetricOperations,
			...MetricFields,
			...ProfileOperations,
			...ProfileFields,
		],
	};
}