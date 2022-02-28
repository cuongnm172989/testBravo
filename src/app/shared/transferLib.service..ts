import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable({ providedIn: 'root' })
export class TransferLib {
    timeSinceToNow(date: string) {
      const createdTime = new Date(date);
      // @ts-ignore
      const seconds = Math.floor((new Date() - createdTime) / 1000);
      let interval = seconds / 31536000;
      if (interval > 1) {
        return Math.floor(interval) + ' năm trước';
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + ' tháng trước';
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + ' ngày trước';
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + ' giờ';
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + ' phút';
      }
      if (Math.floor(seconds)== -1 || Math.floor(seconds)== 0) {
        return 'Vừa xong';
      }
      return seconds < 0 ? 'Vừa xong' : Math.floor(seconds) + ' giây';
    }
    normalize(time: string){
        // console.log('trans: ', moment(time).utc().format('MM/DD/YYYY'))
        return moment(time).utc().format('MM/DD/YYYY');
    }
    toVND(money: any){
      return new Intl.NumberFormat('en-US').format(money)

    }
    toComma(number: any, afterComma: number){
      return number.toFixed(afterComma)
    }

}