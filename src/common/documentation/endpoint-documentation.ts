import { ControllersDocumentation } from '../interfaces';

export const documentation: ControllersDocumentation = {
  projects: {
    create: {
      summary: 'Create project',
    },
    findOne: {
      summary: 'Find project by ID',
    },
    findAll: {
      summary: 'Filter through projects',
      description: 'Every response is paginated',
    },
    update: {
      summary: 'Update project',
    },
    remove: {
      summary: 'Delete project',
    },
  },
  tasks: {
    create: {
      summary: 'Create task for project',
    },
    findOne: {
      summary: 'Find project task by ID',
    },
    findAll: {
      summary: 'Filter through project tasks',
      description: 'Every response is paginated',
    },
    update: {
      summary: 'Update task',
    },
    remove: {
      summary: 'Delete task',
    },
  },
  tags: {
    create: {
      summary: 'Create tag',
    },
    findOne: {
      summary: 'Find tag by ID',
    },
    findAll: {
      summary: 'Filter through tags',
      description: 'Every response is paginated',
    },
    update: {
      summary: 'Update tag',
    },
    remove: {
      summary: 'Delete tag',
    },
  },
};
