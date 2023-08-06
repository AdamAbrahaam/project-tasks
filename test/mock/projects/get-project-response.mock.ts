import { like } from 'pactum-matchers';

export const getProjectResponseMockDto = {
  id: like(1),
  name: 'Test project',
  description: 'Project for testing',
  createdAt: like('2023-08-06T12:04:16.991Z'),
  updatedAt: like('2023-08-06T12:04:16.991Z'),
  tasks: [],
};
