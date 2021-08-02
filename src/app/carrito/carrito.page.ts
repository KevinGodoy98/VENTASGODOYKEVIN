import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ToastController } from '@ionic/angular';
import { carrito } from '../modelo/carrito';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  public productos: any=[];
  public arreglo: any=[];
  public index;

 

  constructor(private router:Router,private toastCtr: ToastController,private carritoService:CarritoService,private callNumber: CallNumber

    ) { }

  ngOnInit() {
    this.cargarProductos();
  }
  llamar(){
    this.callNumber.callNumber("0981899911", true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
    }
  
  cargarProductos(){
    this.productos = JSON.parse(localStorage.getItem('listaProductos'));
    for (let index = 0; index < this.productos.length; index++) {
    }
    console.log(this.productos);
    console.log(this.productos.length);
  }

  aumentarProducto(producto: carrito){
    console.log(producto);
    producto.cantidad=producto.cantidad+1;
  } 

  eliminar(producto : any){
    console.log("Producto a eliminar",producto)
    let data;
    for (let index = 0; index < this.productos.length; index++) {
      console.log(this.productos[index]['nombre'])
      if(this.productos[index]['nombre']==producto['nombre']){
        data=index
        console.log(data)

      }
    }
    var indice=this.productos.indexOf(0);
    console.log(indice)
    this.productos.splice(data,1)
    localStorage.setItem('listaProductos',JSON.stringify(this.productos))
    setTimeout(() => {
      window.location.reload();
     }, 1500);

    this.router.navigate(['/home'])
  }
  disminuirProducto(producto: carrito){
    console.log(producto);
    if(producto.cantidad==1){
      this.presentToast();
      producto.cantidad=1;
    }else {
      producto.cantidad=producto.cantidad-1;
    }
  }
  async presentToast(){
    const toast = await this.toastCtr.create({
      message:'No puede disminuir el producto',
      mode:'ios',
      duration:1000,
      position:'top'
    });
    toast.present();
  }
}
