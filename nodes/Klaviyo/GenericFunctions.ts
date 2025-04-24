import type {
	IExecuteSingleFunctions,
	IN8nHttpFullResponse,
	INodeExecutionData,
} from 'n8n-workflow';

export async function parsePageCursors(
	this: IExecuteSingleFunctions,
	items: INodeExecutionData[],
	_response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {

  const parseUrlParameters = (url: string): Record<string, string> => (url.split('?')[1] || '').split('&').filter(Boolean).reduce((obj: Record<string, string>, param: string): Record<string, string> => {
    const parts: string[] = param.split('='),
          key: string = parts[0],
          value: string = parts.length > 1 ? parts.slice(1).join('=') : '';
    obj[decodeURIComponent(key)] = decodeURIComponent(value);
    return obj;
  }, {});

	items.forEach((item) => {
    interface cursorObj extends Object {
      self?: string,
      next?: string,
      prev?: string,
    }

    if (typeof item.json === 'object' && item.json !== null && item.json.links && typeof item.json.links === 'object' && item.json.links !== null) {
      let links = item.json.links;

      if ('self' in links || 'next' in links || 'prev' in links) {
        let cursor: cursorObj = {};

        if ('self' in item.json.links && typeof item.json.links.self === 'string') {
          let self = parseUrlParameters(item.json.links.self)['page[cursor]'];
          if (self) cursor.self = self;
        }
        if ('next' in item.json.links && typeof item.json.links.next === 'string') {
          let next = parseUrlParameters(item.json.links.next)['page[cursor]'];
          if (next) cursor.next = next;
        }
        if ('prev' in item.json.links && typeof item.json.links.prev === 'string') {
          let prev = parseUrlParameters(item.json.links.prev)['page[cursor]'];
          if (prev) cursor.prev = prev;
        }

        if (Object.keys(cursor).length) item.json.cursor = cursor;
      }

    }
  });
	return items;
}