type controllers = 'projects' | 'tasks' | 'tags';
type endpoints = 'create' | 'findAll' | 'findOne' | 'update' | 'remove';

interface EndpointDocumentationOptions {
  description?: string;
  summary?: string;
}

type EndpointDocumentation = {
  [Endpoint in endpoints]: EndpointDocumentationOptions;
};

export type ControllersDocumentation = {
  [Controller in controllers]: EndpointDocumentation;
};
