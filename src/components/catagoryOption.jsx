export default function CategoryOption(props) {

    return (
        <option value={props.name} defaultChecked={props.selected}>{props.name}</option> 
    );

}