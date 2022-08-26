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
export class RbloodyService {

  constructor(private firestore: Firestore) { }


  lerDadosById(id): Observable<Dados>{
    const doarRef = doc(this.firestore, `rBloody/${id}`);
    return docData(doarRef, {idField: 'id'}) as Observable<Dados>;
  }

  addDados(id: string, doaradd){
    const docRefAdd = collection(this.firestore, 'rBloody');
    return setDoc(doc(docRefAdd, id), doaradd);
  }
}
