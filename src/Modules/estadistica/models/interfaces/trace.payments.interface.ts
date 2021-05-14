export interface PaymentTrace
{
	payment_high	 ?:number 	//el pago mas alto
	payment_low		 ?:number  	//el pago mas bajo
	payment_count	 ?:number 	//cantidad de cobros hechos ese dia
	cobrador_id_high ?:string 	//cobrador del cobro mas alto
	cobrador_id_low	 ?:string  	//cobrador del cobro mas bajo
	pcliente_id_high ?:string   //cliente dueño del pago mas alto
	pcliente_id_low	 ?:string   //cliente dueño del pago mas bajo
	enrutador_id	 ?:string   //enrutador encargado
}