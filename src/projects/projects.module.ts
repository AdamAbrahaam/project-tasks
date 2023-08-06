import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectsRepository } from './projects.repository';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  controllers: [ProjectsController],
  imports: [TasksModule],
  providers: [ProjectsService, ProjectsRepository],
  exports: [ProjectsService],
})
export class ProjectsModule {}
