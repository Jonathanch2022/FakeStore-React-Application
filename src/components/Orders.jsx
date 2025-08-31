import "../css/orders.css"
import TitleHeader from "./TitleHeader";
export class order {

    static orderHistory = [];
    static instanceid = 0;
    constructor() {

        
        order.instanceid++;
        this.id = order.instanceid;
    }
    id;
    name;
    address;
    cardtype;
    orderdate;
    cardcvv;
    cardexpiration;
    cardnumber;
    city;
    state;
    zipcode;
    phonenumber;
    email;
    cart;
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
                ord.cardtype = orderData.cardtype;
                ord.orderdate = orderData.orderdate;
                ord.cart = orderData.cart;
                ord.total = orderData.total;
                ord.items = orderData.items;
                ord.cardcvv = orderData.cardcvv;
                ord.cardexpiration = orderData.cardexpiration;
                ord.cardnumber = orderData.cardnumber;
                ord.id = orderData.id;
                ord.city = orderData.city;
                ord.state = orderData.state;
                ord.zipcode = orderData.zipcode;
                ord.phonenumber = orderData.phonenumber;
                ord.email = orderData.email;



                return (ord);
            })
            return (this.orderHistory);
        }
    }
    static createOrder(data) {


        let newOrder = new order();
        console.log(data);
        newOrder.name = data.firstName.value + " " + data.lastName.value;
        newOrder.address = data.address.value;
        newOrder.cardtype = data.paymentMethod.value;
        newOrder.orderdate = new Date().toLocaleDateString();
        newOrder.cart = data.cart.value;
        newOrder.total = data.total.value;
        newOrder.items = data.items.value;
        newOrder.cardcvv = data.cvv.value;
        newOrder.cardexpiration = data.expirationDate.value;
        newOrder.cardnumber = data.cardNumber.value;
        newOrder.city = data.city.value;
        newOrder.state = data.state.value;
        newOrder.zipcode = data.zip.value;
        newOrder.phonenumber = data.phone.value;
        newOrder.email = data.email.value;
        order.orderHistory.push(newOrder);

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