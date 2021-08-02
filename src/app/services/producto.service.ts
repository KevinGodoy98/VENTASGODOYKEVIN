import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Producto } from '../modelo/producto';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(public afs: AngularFirestore) { }
  save(producto: Producto){
    const refContactos = this.afs.collection("Producto");

    if(producto.uid == null){
      producto.uid = this.afs.createId();
      producto.activo = true;
    }

    refContactos.doc(producto.uid).set(Object.assign({}, producto));
  }
  /*borrar(producto: Producto){
    const refProducto = this.afs.collection("Producto");
        contacto.uid = this.afs.createId();
        producto.activo = false;
    refProducto.doc(producto.codigo).set(Object.assign({}, producto));
  }*/
 

  getProductos(): Observable<any[]>{
    return this.afs.collection('Producto',
      ref => ref.where('activo', '==', true)
    ).valueChanges();
  }
 
}
