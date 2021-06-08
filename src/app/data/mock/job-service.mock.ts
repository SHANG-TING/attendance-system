import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Job } from '../models';

export const JobServiceMock = {
  getList: (startDate: Date, endDate: Date): Observable<Job[]> =>
    of([
      {
        Worker: '蔡侑廷Billy',
        EQ_ID: 'T257',
        CustomerName: '順達興企業股份有限公司',
        Unit_Name: '總公司',
        Address: '500 彰化市寶廍里寶聖路125號',
        ContactName: '黃添榮',
        Contact_Content: '04-722-9977',
        EQ_Model: 'SEA1000AII',
        Job: '合約年度保養',
        Solution: null,
        PlanDate: '2021/1/6',
        MfeDate: '2009/2/18',
        Remarks: null,
        NoteCustomer: null,
        NoteEngineer: null,
        Serial: '',
        WarrantyDate: null,
        ContractType: null,
        ContractDate: null,
        ShortName: '台光',
        Title: '【台光】王嘉祥Jerry--單次保養+無鹵校正'
      },
      {
        Worker: '蔡侑廷Billy',
        EQ_ID: 'T257',
        CustomerName: '順達興企業股份有限公司',
        Unit_Name: '總公司',
        Address: '500 彰化市寶廍里寶聖路125號',
        ContactName: '黃添榮',
        Contact_Content: '04-722-9977',
        EQ_Model: 'SEA1000AII',
        Job: '合約年度保養',
        Solution: null,
        PlanDate: '2021/1/8',
        MfeDate: '2009/2/18',
        Remarks: null,
        NoteCustomer: null,
        NoteEngineer: null,
        Serial: '',
        WarrantyDate: null,
        ContractType: null,
        ContractDate: null,
        ShortName: '台光',
        Title: '【台光】王嘉祥Jerry--單次保養+無鹵校正'
      },
      {
        Worker: '蔡侑廷Billy',
        EQ_ID: 'T257',
        CustomerName: '順達興企業股份有限公司',
        Unit_Name: '總公司',
        Address: '500 彰化市寶廍里寶聖路125號',
        ContactName: '黃添榮',
        Contact_Content: '04-722-9977#333',
        EQ_Model: 'SEA1000AII',
        Job: '合約年度保養',
        Solution: null,
        PlanDate: '2021/1/8',
        MfeDate: '2009/2/18',
        Remarks: null,
        NoteCustomer: null,
        NoteEngineer: null,
        Serial: '',
        WarrantyDate: null,
        ContractType: null,
        ContractDate: null,
        ShortName: '台光',
        Title: '【台光】王嘉祥Jerry--單次保養+無鹵校正'
      }
    ]).pipe(delay(300))
};
