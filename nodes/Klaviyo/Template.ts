import { INodeProperties } from 'n8n-workflow';
import { parsePageCursors } from './GenericFunctions';
import {
  getTemplateAttrFields,
  templateSortValues
} from './TemplateFields';


export const TemplateOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['template'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a template',
				routing: {
					request: {
						method: 'POST',
						url: '/templates',
						body: {
							data: {
								type: 'template',
								attributes: {},
							},
						},
					},
				},
			},
      {
        name: 'Delete',
        value: 'delete',
        action: 'Delete a template',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/templates/{{$parameter.templateId}}',
          },
        },
      },
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many templates',
				routing: {
					request: {
						url: '/templates',
					},
				},
			},
      {
        name: 'Get One',
        value: 'getOne',
        action: 'Get one template',
				routing: {
					request: {
						method: 'GET',
						url: '=/templates/{{$parameter.templateId}}',
					}
				}
      },
			{
				name: 'Update',
				value: 'update',
				action: 'Update a template',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/templates/{{$parameter.templateId}}',
						body: {
							data: {
								type: 'template',
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
const createTemplateFields: INodeProperties[] = [
  {
    displayName: 'Template Name',
    name: 'createTemplateName',
    type: 'string',
    default: 'New Template',
    required: true,
    routing: {
      request: {
        body: {
          data: {
            attributes: {
              name: '={{ $value }}',
            },
          },
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['template'],
        operation: ['create']
      },
    },
  },
  {
    displayName: 'Template Type',
    name: 'createTemplateType',
    type: 'options',
    options: [
      {
        name: 'Code',
        value: 'CODE',
      },
      {
        name: 'Drag & Drop',
        value: 'USER_DRAGGABLE'
      },
    ],
    default: 'CODE',
    routing: {
      request: {
        body: {
          data: {
            attributes: {
              editor_type: '={{ $value }}'
            }
          }
        }
      }
    },
    displayOptions: {
      show: {
        resource: ['template'],
        operation: ['create']
      },
    },
  },
  {
    displayName: 'HTML Content',
    name: 'createTemplateHtml',
    type: 'string',
    typeOptions: {
      editor: 'htmlEditor',
    },
    default: '',
    displayOptions: {
      show: {
        resource: ['template'],
        operation: ['create']
      },
    },
  },
  {
    displayName: 'Text Content',
    name: 'createTemplateText',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['template'],
        operation: ['create']
      },
    },
  },
  {
    displayName: 'AMP Content',
    name: 'createTemplateAmp',
    type: 'string',
    typeOptions: {
      editor: 'htmlEditor',
    },
    default: '',
    displayOptions: {
      show: {
        resource: ['template'],
        operation: ['create']
      },
    },
  },
];

const updateTemplateFields: INodeProperties[] = [
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['update'],
			},
		},
		default: '',
		required: true,
    routing: {
      request: {
        body: {
          data: {
            id: '={{ $value }}'
          },
        },
      },
    },
	},
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-update-fields
    displayName: 'Template Content',
    name: 'updateTemplateContent',
    placeholder: 'Add Content',
    type: 'collection',
    default: {},
    required: true,
    displayOptions: {
      show: {
        resource: ['template'],
        operation: ['update']
      },
    },
    options: [
      {
        displayName: 'HTML Content',
        description: 'User-made Drag & Drop templates cannot be updated using this field and API',
        name: 'html',
        type: 'string',
        typeOptions: {
          editor: 'htmlEditor',
        },
        default: '',
      },
      {
        displayName: 'Text Content',
        name: 'text',
        type: 'string',
        default: '',
      },
      {
        displayName: 'AMP Content',
        name: 'amp',
        type: 'string',
        typeOptions: {
          editor: 'htmlEditor',
        },
        default: '',
      },
    ],
    routing: {
      request: {
        body: {
          data: {
            attributes: '={{ $value }}',
          },
        },
      },
    },
  },
];

const deleteTemplateFields: INodeProperties[] = [
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['delete'],
			},
		},
		default: '',
		required: true,
	},
]

const postTemplateFields: INodeProperties[] = [
  ...createTemplateFields,
  ...updateTemplateFields,
  ...deleteTemplateFields,
];

/* --------------------------------------------------------
    GET
----------------------------------------------------------- */
const getAllTemplateFields: INodeProperties[] = [
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
        resource: ['template'],
        operation: ['getAll'],
      },
    },
  },
  {
    displayName: 'Sort',
    name: 'templateSort',
    type: 'options',
    default: 'created',
    options: templateSortValues,
    displayOptions: {
      show: {
        resource: ['template'],
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
        resource: ['template'],
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
                // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased, n8n-nodes-base/node-param-display-name-miscased-id
                name: 'id',
                value: 'id',
              },
              {
                // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
                name: 'name',
                value: 'name',
              },
            ],
            default: 'id',
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
            displayName: 'Field',
            name: 'field',
            type: 'options',
            // eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
            options: [
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
            ],
            default: 'created',
          },
          {
            displayName: 'Operator',
            name: 'operator',
            type: 'options',
            options: [
              {
                // eslint-disable-next-line n8n-nodes-base/node-param-display-name-miscased
                name: 'equals',
                value: 'equals',
              },
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
            ...($value.date ?? []).map(({ field, operator, value }) => `${operator}(${field},${value}Z)`)\
          ].join(",") }}',
        }
      }
    }
  },
]

const getOneTemplateFields: INodeProperties[] = [
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['getOne'],
			},
		},
		default: '',
		required: true,
	}
]

const getTemplateFields: INodeProperties[] = [
  ...getAllTemplateFields,
  ...getOneTemplateFields,
  {
    displayName: 'Template Fields',
    name: 'templateFields',
    type: 'multiOptions',
    displayOptions: {
      show: {
        resource: ['template'],
        operation: ['getAll', 'getOne'],
      },
    },
    options: getTemplateAttrFields,
    default: [],
    routing: {
      request: {
        qs: {
          'fields[template]': '={{ $value.length > 0 ? $value.join(",") : undefined }}',
        },
      },
    },
  },
];

export const TemplateFields: INodeProperties[] = [
  ...postTemplateFields,
  ...getTemplateFields,
]