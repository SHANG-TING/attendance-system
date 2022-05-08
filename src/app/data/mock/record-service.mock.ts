import { of } from 'rxjs';

export const RecordServiceMock = {
  getRange: (startTime?: string, endTime?: string) =>
    of({ startTime: '2020-10-26 8:25:33', endTime: '2020-10-26 17:26:01', remark: 'TEST' }),
  create: (remark: string) => of(null)
};
