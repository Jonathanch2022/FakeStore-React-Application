import Header from "../components/Header"
import TitleHeader from "../components/TitleHeader"
import "../css/profile.css"
import CollapsContainer from "../components/CollapasableContainer"
export default function UserProfile() {

    const handleSubmit = (e) => {

        e.preventDefault();
        console.log("Form Submitted!");
    }
    return (<>

        <Header />
        <TitleHeader title="Welcome User" />
        <div class="formdiv">
            <form id="form1" onSubmit={handleSubmit} class="form2">
            <label for="userFirstName">Full Name:</label>
            <input type="text" name="userFirstName"></input>
            <label for="userEmail">Email:</label>
            <input type="email" name="userEmail"></input>
            <label for="address">Address:</label>
            <input type="text" name="address"></input>
            <label for="city">City:</label>
            <input type="text" name="city"></input>
            <label for="state">State:</label>
            <input type="text" name="State"></input>
            <label for="zip">Zip:</label>
            <input type="text" name="zip"></input>
            <label for="country">Country:</label>
            <input type="text" name="country"></input>
            <button type="submit">Save</button>

            </form>
            <TitleHeader title="Order History" />
            <div class="orderHistory">
                <CollapsContainer title="testing" />
            </div>

        </div>

    </>);

}