import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

export interface EachData {
  Account: string;
  Amount: number;
  BizDocId: string;
  BizDocId_LC: any;
  BizDocId_PO: any;
  BizDocId_SO: string;
  CostCentreCode: string;
  CreditAccount: string;
  CreditAmount: number;
  CrspAccount: string;
  CurrencyCode: string;
  CustomFieldCode1: string
  CustomFieldCode2: string
  CustomFieldCode3: string
  CustomerId: number
  CustomerId0: number
  CustomerName: string
  DebitAccount: string
  DebitAmount: number
  Description: string
  DocBookingNo: string
  DocCode: string
  DocDate: string
  DocGroup: string
  DocNo: string
  EmployeeCode: string
  EmployeeId: number
  EntryNo: string
  ExchangeRate: number
  Id: number
  JobCode: string
  Nhom: string
  OriginalAmount: number
  OriginalCreditAmount: number
  OriginalDebitAmount: number
  Person: string
  RowId: string
  Stt: string
  TaxCode: string
  Ten_Nhom: string
  TerritoryCode: string
  TransCode: string
  WorkProcessCode: any
  _FormatStyleKey: any
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];
@Component({
  selector: 'app-table-customer',
  templateUrl: './table-customer.component.html',
  styleUrls: ['./table-customer.component.scss']
})
export class TableCustomerComponent implements AfterViewInit {
  

  jsonDataResult: any;
  listInfo = [];

  displayedColumns2: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource2 : MatTableDataSource<UserData>;

  displayedColumns: string[] = ['id', 'amount', 'person', 'account'];
  dataSource: MatTableDataSource<EachData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {
    
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    console.log("user:", users);
    // Assign the data to the data source for the table to render
    this.dataSource2 = new MatTableDataSource(users);
    this.http.get('assets/data.json').subscribe((res) => {
      this.jsonDataResult = res;

      this.jsonDataResult.Table1.forEach(element => {
        // console.log("test",increaseRate(element.increaseAvgSalary));
        this.listInfo = this.listInfo.filter(each => each.Id !== element.Id);
        this.listInfo.push(element);
      });
      
      console.log('--- result :: ',  this.jsonDataResult);

      // this.dataSource = new MatTableDataSource(this.listInfo);
      console.log("dât", this.dataSource2)

    });
  }

  ngAfterViewInit() {
    console.log("pagi, sort", this.paginator, this.sort)
    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  

}

function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}
