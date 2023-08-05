type controllers = 'projects' | 'tasks' | 'tags';
type endpoints =
  | 'create'
  | 'createTask'
  | 'findAllTasks'
  | 'findAll'
  | 'findOne'
  | 'update'
  | 'remove';

interface EndpointDocumentationOptions {
  description?: string;
  summary?: string;
}

type EndpointDocumentation = Partial<
  Record<endpoints, EndpointDocumentationOptions>
>;

export type ControllersDocumentation = Record<
  controllers,
  EndpointDocumentation
>;
