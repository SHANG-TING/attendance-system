import { environment } from '@env/environment';
import { AccountService, JobService, RecordService } from '../services';
import { AccountServiceMock } from './account-service.mock';
import { JobServiceMock } from './job-service.mock';
import { RecordServiceMock } from './record-service.mock';

export const MOCK_SERVICES = (() => {
  if (!environment.enableMock) {
    return [];
  }

  return [
    {
      provide: AccountService,
      useValue: AccountServiceMock
    },
    {
      provide: JobService,
      useValue: JobServiceMock
    },
    {
      provide: RecordService,
      useValue: RecordServiceMock
    }
  ];
})();
