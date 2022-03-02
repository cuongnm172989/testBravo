import { element } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TransferLib } from 'src/app/shared/transferLib.service.';

export interface GroupData {
  Date: any;
  SumAmount: any;
  isHeader: boolean;
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
  
  data: (GroupData | EachData)[];
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
      
      this.groupDataByDate();

      
      // console.log("dât", this.dataSource2, this.dataSource)

    });
  }

  ngAfterViewInit() {
    console.log("pagi, sort", this.paginator, this.sort)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.groupDataByDate();
  }

  groupDataByDate(): void{
    this.data = [];
    var sum : number;
    var date= '';
    this.dataSource.filteredData.forEach((element,index) =>{
      if ( date != element.DocDate && date!= '' ){
        this.data.unshift({Date: date, SumAmount: sum, isHeader:true})
        date = element.DocDate;
        sum=0;
        
      }
      else if ( date== '') {
        date = element.DocDate;
        sum = 0;
      }

      this.data.unshift(element);
      // console.log("index",index, this.dataSource.filteredData.length);
      sum += element.Amount;

      if ( index == this.dataSource.filteredData.length-1 ){
        this.data.unshift({Date: date, SumAmount: sum, isHeader:true})
      }
    });
    // this.data.push({Date: "10/3/2022", SumAmount: 1230000, isHeader: true});
    // this.data.unshift({Date: "10/3/2022", SumAmount: 1230000, isHeader: true});
    // console.log("dataSource", this.dataSource, this.data);
  }  
  isHeader(index: number, item: any) {
    return item.isHeader;
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
