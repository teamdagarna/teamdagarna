import { Pipe, PipeTransform } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

@Pipe({
  name: 'storage'
})
export class StoragePipe implements PipeTransform {

  constructor(public storage: AngularFireStorage){}

  transform(path: any): any {
      let url = this.storage.ref(path).getDownloadURL();
      return url;
  }

}
