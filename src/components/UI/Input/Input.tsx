
interface InputProps{
    type: string
}
export default function Input({type}: InputProps):React.ReactElement{
    return(
        <input type={type} />
    )
}