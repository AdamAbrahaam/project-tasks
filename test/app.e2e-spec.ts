import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import {
  createTaskResponseMockDto,
  createProjectMockDto,
  getProjectResponseMockDto,
} from './mock/projects';
import { TaskState } from '@prisma/client';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDB();

    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Tags', () => {
    describe('Create tag', () => {
      it('should create tag', () => {
        const name = 'TODO';

        return pactum
          .spec()
          .post('/tags')
          .withBody({ name })
          .expectStatus(201)
          .expectBodyContains(name);
      });
    });

    describe('Get tag', () => {
      it('should get tag', () => {
        return pactum
          .spec()
          .get('/tags/{id}')
          .withPathParams('id', 1)
          .expectStatus(200);
      });
    });

    describe('Delete tag', () => {
      it('should delete tag', async () => {
        await pactum.spec().post('/tags').withBody({ name: 'TAG 2' });

        return pactum
          .spec()
          .delete('/tags/{id}')
          .withPathParams('id', 2)
          .expectStatus(200);
      });
    });

    describe('Update tag', () => {
      it('should update tag', async () => {
        return pactum
          .spec()
          .patch('/tags/{id}')
          .withPathParams('id', 1)
          .withBody({ name: 'To Do' })
          .expectStatus(200);
      });
    });

    describe('Filter tags', () => {
      it('by name', async () => {
        return pactum
          .spec()
          .get('/tags')
          .withQueryParams('name', 'To Do')
          .expectStatus(200)
          .expect((ctx) => {
            expect(ctx.res.body.data[0].id).toEqual(1);
          });
      });
    });
  });

  describe('Projects', () => {
    describe('Create project', () => {
      it('should create project', () => {
        return pactum
          .spec()
          .post('/projects')
          .withBody(createProjectMockDto)
          .expectStatus(201)
          .expectBodyContains(createProjectMockDto.name)
          .expectBodyContains(createProjectMockDto.description);
      });

      it('should create project without description', () => {
        delete createProjectMockDto.description;

        return pactum
          .spec()
          .post('/projects')
          .withBody(createProjectMockDto)
          .expectStatus(201)
          .expectBodyContains(createProjectMockDto.name)
          .expect((ctx) => {
            expect(ctx.res.body.description).toBeNull();
          });
      });
    });

    describe('Delete project', () => {
      beforeAll(async () => {
        await pactum.spec().post('/projects').withBody(createProjectMockDto);
      });

      it('should delete project', () => {
        return pactum
          .spec()
          .delete('/projects/{id}')
          .withPathParams('id', 3)
          .expectStatus(200);
      });
    });

    describe('Get project', () => {
      it('should get project', () => {
        return pactum
          .spec()
          .get('/projects/{id}')
          .withPathParams('id', 1)
          .expectStatus(200)
          .expectJsonMatchStrict(getProjectResponseMockDto);
      });
    });

    describe('Create tasks for project', () => {
      it('should create tasks for projects', async () => {
        await pactum
          .spec()
          .post('/projects/{id}/tasks')
          .withPathParams('id', 1)
          .withBody({ description: createTaskResponseMockDto.description })
          .expectStatus(201)
          .expectJsonMatchStrict(createTaskResponseMockDto);

        await pactum
          .spec()
          .post('/projects/{id}/tasks')
          .withPathParams('id', 2)
          .withBody({ description: createTaskResponseMockDto.description })
          .expectStatus(201);

        return pactum
          .spec()
          .post('/projects/{id}/tasks')
          .withPathParams('id', 1)
          .withBody({ description: 'New task 2' })
          .expectStatus(201);
      });

      it('should have 2 projects', () => {
        return pactum
          .spec()
          .get('/projects/{id}')
          .withPathParams('id', 1)
          .expectStatus(200)
          .expect((ctx) => {
            expect(ctx.res.body.tasks).toHaveLength(2);
          });
      });
    });

    describe('Filter tasks for project', () => {
      it('by description', () => {
        return pactum
          .spec()
          .get('/projects/{id}/tasks')
          .withPathParams('id', 1)
          .withQueryParams('description', 'hire')
          .expectStatus(200)
          .expect((ctx) => {
            expect(ctx.res.body.data).toHaveLength(1);
          });
      });

      it('by state', () => {
        return pactum
          .spec()
          .get('/projects/{id}/tasks')
          .withPathParams('id', 1)
          .withQueryParams('taskState', TaskState.NEW)
          .expectStatus(200)
          .expect((ctx) => {
            expect(ctx.res.body.data).toHaveLength(2);
          });
      });
    });

    describe('Filter projects', () => {
      const projectsLength = 5;

      beforeAll(async () => {
        for (let index = 1; index < projectsLength; index++) {
          await pactum
            .spec()
            .post('/projects')
            .withBody({
              name: `Project ${index}`,
              description: `Description for project ${index}`,
            });
        }
      });

      it('should get all project', () => {
        return pactum
          .spec()
          .get('/projects')
          .expectStatus(200)
          .expect((ctx) => {
            expect(ctx.res.body.data).toHaveLength(projectsLength);
          });
      });

      it('by name', () => {
        return pactum
          .spec()
          .get('/projects')
          .withQueryParams('name', 'test')
          .expectStatus(200)
          .expect((ctx) => {
            expect(ctx.res.body.data).toHaveLength(2);
          });
      });

      it('by description', () => {
        return pactum
          .spec()
          .get('/projects')
          .withQueryParams('description', 'testing')
          .expectStatus(200)
          .expect((ctx) => {
            expect(ctx.res.body.data).toHaveLength(1);
          });
      });

      it('by task ID', () => {
        return pactum
          .spec()
          .get('/projects')
          .withQueryParams('taskId', 1)
          .expectStatus(200)
          .expect((ctx) => {
            expect(ctx.res.body.data[0].id).toEqual(1);
          });
      });

      it('by task state', () => {
        return pactum
          .spec()
          .get('/projects')
          .withQueryParams('taskState', TaskState.NEW)
          .expectStatus(200)
          .expect((ctx) => {
            expect(ctx.res.body.data).toHaveLength(2);
          });
      });
    });

    describe('Update project', () => {
      it('should update project', async () => {
        const newDescription = 'New project description';
        await pactum
          .spec()
          .patch('/projects/{id}')
          .withPathParams('id', 1)
          .withBody({ description: newDescription })
          .expectStatus(200)
          .expectBodyContains(newDescription);

        return pactum
          .spec()
          .get('/projects/{id}')
          .withPathParams('id', 1)
          .expect((ctx) => {
            expect(ctx.res.body.description).toEqual(newDescription);
          });
      });
    });
  });
});
