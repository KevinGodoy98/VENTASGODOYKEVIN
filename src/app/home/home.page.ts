import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ProductosService } from '../services/producto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router:Router, private productosService: ProductosService,private menuController: MenuController) {}

  productos: any;

  //productosBackup: any;

    ngOnInit() {
     this.productos = this.productosService.getProductos();
     console.log(this.productos);
    }
    verproducto(){
      this.router.navigate(['/detalles']);
    }

    agregarProducto(producto:any){
      alert('Producto Agregado');
      console.log('Se procede a  agregar el producto',producto);
    }

    detalleProducto(producto: any){
      console.log('El detalle del producto', producto);
      const params: NavigationExtras={
        queryParams:{
          producto:producto
        }
      };
      this.router.navigate(['detalles'],params);
    }
 
 



}
