import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { DeliveryOption } from 'src/app/shared/models/deliveryOptions';
import { CheckoutComponent } from '../checkout.component';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss'],
})
export class ShipmentComponent {
  deliveryOptions: DeliveryOption[] = [
    {
      id: 1,
      name: 'SEDEX',
      deliveryTime: '2 dias úteis',
      description: 'Entrega rápida',
      price: 30,
    },
    {
      id: 2,
      name: 'PAC',
      deliveryTime: '5 dias úteis',
      description: 'Entrega econômica',
      price: 20,
    },
    {
      id: 3,
      name: 'Transportadora A',
      deliveryTime: '4 dias úteis',
      description: 'Entrega confiável',
      price: 25,
    },
    {
      id: 4,
      name: 'Retirada na Loja',
      deliveryTime: '1 dia útil',
      description: 'Retire na loja mais próxima',
      price: 0,
    },
  ];

  selectedOption: number | undefined;
  shipmentForm: FormGroup;

  constructor(
    private basketService: BasketService,
    private formBuilder: FormBuilder,
    private router: Router,
    private checkoutComponent: CheckoutComponent
  ) {
    this.shipmentForm = this.formBuilder.group({
      selectedOption: [this.selectedOption, Validators.required],
    });

    // Inicializa a opção selecionada
    this.selectedOption = this.deliveryOptions[0].id;
    this.updateShipmentPrice();
  }

  updateShipmentPrice() {
    const selectedDeliveryOption = this.deliveryOptions.find(
      (option) => option.id === this.selectedOption
    );
    if (selectedDeliveryOption) {
      this.basketService.updateShippingPrice(selectedDeliveryOption.price);
    }
  }

  goToNextStep() {
    this.updateShipmentPrice();
    // Navega para a página de revisão
    this.router.navigate(['/checkout/review']);
    // Define a etapa atual para revisão
    this.checkoutComponent.setCurrentStep('review');
  }
}
