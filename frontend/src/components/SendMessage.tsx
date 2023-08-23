import {useRef} from 'react'

const SendMessage = ({socket}:any) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        if(inputRef.current?.value)
        {

            socket.emit("send-msg","placeholder-userId",localStorage.getItem("room"),inputRef.current!.value)
        }
    }
  return (
    <form onSubmit={handleSubmit} className='form-group d-flex justify-content-center'>
        <input className='form-check px-4 py-2' type="text" ref={inputRef} />
        <button className='btn btn-danger ms-2' type="submit">Send</button>
    </form>
  )
}

export default SendMessage