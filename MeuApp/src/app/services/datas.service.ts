import { Doar } from './../interfaces/doar';
import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, docData, doc, collectionData, addDoc, setDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


export interface Dados{
  residence: string;
  bloodytype: string;
}
@Injectable({
  providedIn: 'root'
})
export class DatasService {
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

    leragendados(id): Observable<Dados>{
      const doarRef = doc(this.firestore, `agendados/${id}`);
      return docData(doarRef, {idField: 'id'}) as Observable<Dados>;
    }

    confirmar(id: string, doaradd){
      const docRefAdd = collection(this.firestore, 'Doar');
      return setDoc(doc(docRefAdd, id), doaradd);
    }


}
