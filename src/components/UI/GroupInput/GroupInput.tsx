import Input from "../Input/Input"
interface GroupInputProps{
    label:string
}
export default function GroupInput({label}: GroupInputProps):React.ReactElement{
    return(
        <div>
            <label htmlFor="">{label}</label>
            <Input 
            />
        </div>
    )
}