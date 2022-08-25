import { Doar } from './../interfaces/doar';
import { Auth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, docData, doc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DoarService {

  // private doarCollection = this.

  constructor(
    // private auth: Auth,
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

    lerDoarById(id){
      const doarRef = doc(this.firestore, `Doar/${id}`);
      return docData(doarRef, {idField: 'id'});

    }

    addDoar(doar: Doar){}

    updateDoar(id: string, doar: Doar){}

    deleteDoar(id: string){}


}
