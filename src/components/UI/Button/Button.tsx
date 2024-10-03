interface ButtonProps{
    label:string
}
export default function Button({label}: ButtonProps):React.ReactElement{
    return(
        <button>{label}</button>
    )
}