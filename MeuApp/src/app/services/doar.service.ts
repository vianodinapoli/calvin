import { Doar } from './../interfaces/doar';
import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, docData, doc, collectionData, addDoc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


export interface Dados{
  residence: string;
  bloodytype: string;
}
@Injectable({
  providedIn: 'root'
})
export class DoarService {
  constructor(
    private firestore: Firestore
    ) { }

    // lerDoar(){
    //   // const user = this.auth.currentUser;
    //   // console.log('User', user.uid);
    //   // const doarRef = doc(this.firestore, 'Doar/${user.uid}');
    //   const doarRef = collection(this.firestore, 'Doar');
    //   console.log('doc', doarRef);

    //   // return docData(doarRef);
    //   // return collection(doarRef);
    //   return collectionData(doarRef, {idField: 'id'});
    //   // return

    // }

    lerDoarById(id): Observable<Dados>{
      const doarRef = doc(this.firestore, `Doar/${id}`);
      return docData(doarRef, {idField: 'id'}) as Observable<Dados>;
    }

    addDoar(id: string, doaradd){
      const docRefAdd = collection(this.firestore, 'Doar');
      return setDoc(doc(docRefAdd, id), doaradd);
    }

    updateDoar(id: string, doar: Doar){}

    deleteDoar(id: string){}


}
