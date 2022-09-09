import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, docData, doc, collectionData, addDoc, setDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Dados{
  id: string;
  fullname: string;
  residence: string;
  bloodytype: string;
  contact: string;
}

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private firestore: Firestore) { }

  lerPerfilById(id): Observable<Dados>{
    const doarRef = doc(this.firestore, `perfil/${id}`);
    return docData(doarRef, {idField: 'id'}) as Observable<Dados>;
  }

  addPerfil(id: string, doaradd){
    const docRefAdd = collection(this.firestore, 'perfil');
    return setDoc(doc(docRefAdd, id), doaradd);
  }

  deleteNote(dados: Dados) {
    const dadosDocRef = doc(this.firestore, `perfil/${dados.id}`);
    return deleteDoc(dadosDocRef);
  }

  updatePerfil(dados) {
    const dadosDocRef = doc(this.firestore, `perfil/${dados}`);
    return updateDoc(dadosDocRef, { title: dados.fullname, text: dados.contact, string: dados.bloodytype });
  }
}
