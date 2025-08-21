export class OptionsCategory{

   
       
   static instanceid = 0;
   static getId() {

     let id =  OptionsCategory.instanceid++;
        return (id);
    }

}
export default function CategoryOption(props) {

    return (
        <option value={props.name} defaultChecked={props.selected}>{props.name}</option> 
    );

}