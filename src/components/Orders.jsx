import "../css/orders.css"
import TitleHeader from "./TitleHeader";
export class order {

    static orderHistory = [];
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
    cardtype;
    shipping;
    orderdate;
    cardcvv;
    cardexpiration;
    cardnumber;

    cart = [];
    total = 0;
    items = 0;

    static loadOrderHistory() {

      let storedOrders = localStorage.getItem("order-history");
        if (storedOrders) {

            let loadeOrder = JSON.parse(storedOrders);
            this.orderHistory =  loadeOrder.map((orderData) => {

                let ord = new order();
                ord.name = orderData.name;
                ord.address = orderData.address;
                ord.billingaddress = orderData.billingaddress;
                ord.paymentMethod = orderData.paymentMethod;
                ord.cardtype = orderData.cardtype;
                ord.shipping = orderData.shipping;
                ord.orderdate = orderData.orderdate;
                ord.cart = orderData.cart;
                ord.total = orderData.total;
                ord.items = orderData.items;
                ord.cardcvv = orderData.cardcvv;
                ord.cardexpiration = orderData.cardexpiration;
                ord.cardnumber = orderData.cardnumber;

                return (ord);
            })
            return (this.orderHistory);
        }
    }
    static createOrder(data) {


        let newOrder = new order();

        newOrder.name = data.name;
        newOrder.address = data.address;
        newOrder.billingaddress = data.billingaddress;
        newOrder.paymentMethod = data.paymentMethod;
        newOrder.cardtype = data.cardtype;
        newOrder.shipping = data.shipping;
        newOrder.orderdate = new Date().toLocaleDateString();
        newOrder.cart = data.cart;
        newOrder.total = data.total;
        newOrder.items = data.items;
        newOrder.cardcvv = data.cardcvv;
        newOrder.cardexpiration = data.cardexpiration;
        newOrder.cardnumber = data.cardnumber;
        order.orderHistory.push(newOrder);
        localStorage.setItem("order-history", JSON.stringify(order.orderHistory));
        return (newOrder);
    
    }

}
export default function Orders(props) {


    return (
    
        <>
            <div className="order-History">

                <TitleHeader title="Order History" />
                <input id="firstName" type="text" placeholder="First Name" value={ props.firstName}></input>
                <input id="lastName" type="text" placeholder="Last Name" value={props.lastName }></input>
                <input id="address" type="text" placeholder="Address" value={props.address }></input>
                <input id="city" type="text" placeholder="City" value={props.city }></input>
                <input id="state" type="text" placeholder="State" value={ props.state}></input>
                <input id="zip" type="text" placeholder="Zip Code" value={props.zipcode }></input>
                <input id="country" type="text" placeholder="Country" value={props.country }></input>
                <input id="email" type="email" placeholder="Email" value={props.email }></input>
                <input id="phone" type="text" placeholder="Phone Number" value={props.phone }></input>
                <input id="paymentMethod" className="cartSelect" value={props.paymentMethod } placeholder="Payment Method"></input>
                <input id="cardNumber" type="text" placeholder="Card Number" value={props.cardNumber }></input>
                <input id="expirationDate" type="text" placeholder="Expiry Date (MM/YY)" value={props.expirationDate }></input>
                <input id="cvv" type="text" placeholder="CVV" value={props.cvv}></input>
                <TitleHeader title="Order Details" />
                {
                    props.orderHistory || []
                }

            </div>

        </>
    
    ) 
}