export class order {

    static orderList = [];
    static instanceid = 0;
    constructor() {

        order.orderList.push(this);
        order.instanceid++;
        this.id = order.instanceid;
    }
    id;
    name;
    address;
    billingaddress;
    paymentMethod;
    carddetails;
    shipping;
    orderdate;
    cart = [];
    total = [];
    items = 0;

}
export default function Orders() {


    return (
    
        <>


        </>
    
    ) 
}