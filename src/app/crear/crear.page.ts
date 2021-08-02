import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../modelo/producto';
import { ProductosService } from '../services/producto.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  productos: any;
  producto: Producto = new Producto();
  constructor(private router:Router, private productosService: ProductosService) { }

  ngOnInit() {
  }
  add(){
    console.log(this.producto);
    this.productosService.save(this.producto);
    /*setTimeout(() => {
      window.location.reload();
     }, 1500);*/

     this.router.navigate(['/home']);
  }


}
