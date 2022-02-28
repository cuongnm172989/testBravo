import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TransferLib } from 'src/app/shared/transferLib.service.';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}


export interface EachData {
  Account: any;
  Amount: any;
  // BizDocId: any;
  // BizDocId_LC: any;
  // BizDocId_PO: any;
  // BizDocId_SO: any;
  // CostCentreCode: any;
  CreditAccount: any;
  CreditAmount: any;
  // CrspAccount: any;
  // CurrencyCode: any;
  // CustomFieldCode1: any;
  // CustomFieldCode2: any;
  // CustomFieldCode3: any;
  // CustomerId: any;
  // CustomerId0: any;
  // CustomerName: any;
  DebitAccount: any;
  DebitAmount: any;
  Description: any;
  // DocBookingNo: any;
  DocCode: any;
  DocDate: any;
  // DocGroup: any;
  DocNo: any;
  // EmployeeCode: any;
  // EmployeeId: any;
  // EntryNo: any;
  ExchangeRate: any;
  // Id: any;
  // JobCode: any;
  // Nhom: any;
  // OriginalAmount: any;
  // OriginalCreditAmount: any;
  // OriginalDebitAmount: any;
  // Person: any;
  // RowId: any;
  // Stt: any;
  // TaxCode: any;
  // Ten_Nhom: any;
  // TerritoryCode: any;
  // TransCode: any;
  // WorkProcessCode: any;
  // _FormatStyleKey: any;
}


@Component({
  selector: 'app-table-customer',
  templateUrl: './table-customer.component.html',
  styleUrls: ['./table-customer.component.scss']
})
export class TableCustomerComponent implements AfterViewInit {
  

  jsonDataResult: any;
  listInfo = [];

  displayedColumns: string[] = ['DocDate', 'DocNo','Description',  'DebitAmount', 'CreditAmount', 'Amount', 'ExchangeRate'];
  dataSource: MatTableDataSource<EachData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private http: HttpClient, public transfer: TransferLib,) {
    
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    // console.log("user:", users);
    // Assign the data to the data source for the table to render
    // this.dataSource2 = new MatTableDataSource(users);

    this.http.get('assets/data.json').subscribe((res) => {
      this.jsonDataResult = res;

      this.jsonDataResult.Table1.forEach(element => {
        // console.log("test",increaseRate(element.increaseAvgSalary));
        this.listInfo = this.listInfo.filter(each => each.Id !== element.Id);
        this.listInfo.push(element);
      });
      
      console.log('--- result :: ',  this.listInfo);

      this.dataSource = new MatTableDataSource(this.listInfo);
      console.log("pagi, sort", this.paginator, this.sort)
      // console.log("dât", this.dataSource2, this.dataSource)

    });
  }

  ngAfterViewInit() {
    console.log("pagi, sort", this.paginator, this.sort)
    // this.dataSource2.paginator = this.paginator;
    // this.dataSource2.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource2.paginator) {
    //   this.dataSource2.paginator.firstPage();
    // }
  }

  

}

// function createNewUser(id: number): UserData {
//   const name =
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
//     ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
//     '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
//   };
// }
