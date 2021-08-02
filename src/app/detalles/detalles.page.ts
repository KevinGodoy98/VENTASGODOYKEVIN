import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { carrito } from '../modelo/carrito';
import { CarritoService } from '../services/carrito.service';
import { ProductosService } from '../services/producto.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {

  producto: any;
  carrito:carrito = new carrito();
  constructor(private router:Router,  private route: ActivatedRoute,private productosService: ProductosService,private menuController: MenuController,private toastCtr: ToastController, private carritoService: CarritoService) {
    route.queryParams.subscribe(params=>{
      console.log('Son los parametros de llegada',params);
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.producto=this.router.getCurrentNavigation().extras.queryParams.producto;
        console.log('Dettale del producto :',this.producto);
      }
    });
  }
  productos: any;

  //productosBackup: any;

    ngOnInit() {
     //this.productos = this.productosService.getProductos();
     //console.log(this.productos);
    }
    agregarproducto(){
      console.log(this.producto);
      this.carrito.uid=this.producto['uid'];
      this.carrito.nombre=this.producto['nombre']
      this.carrito.precio=this.producto['precio']
      this.carrito.imagen=this.producto['imagen']
      this.carrito.desripcion=this.producto['descripcion']
      this.carrito.cantidad=1

      console.log('Carrito', this.carrito);
      this.carritoService.agregarProducto(this.carrito);
      this.presentToast();

      this.router.navigate(['carrito'])
    }
  
    async presentToast(){
      const toast = await this.toastCtr.create({
        message:'Producto Agregado al Carrito de Compras',
        mode:'ios',
        duration:1000,
        position:'top'
      });
      toast.present();
    }
}